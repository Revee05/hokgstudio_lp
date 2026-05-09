<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseBundle;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class EnrollmentController extends Controller
{
    public function enrollCourse(Request $request, Course $course)
    {
        return $this->initiateEnrollment($request, $course, 'Course');
    }

    public function enrollBundle(Request $request, CourseBundle $bundle)
    {
        return $this->initiateEnrollment($request, $bundle, 'Bundle');
    }

    private function initiateEnrollment(Request $request, $payable, $type)
    {
        $user = $request->user();

        // 1. Validation: Already enrolled?
        if ($type === 'Course' && $user->courses()->where('course_id', $payable->id)->exists()) {
            return back()->with('info', 'Anda sudah terdaftar di kelas ini.');
        }
        if ($type === 'Bundle' && $user->bundles()->where('course_bundle_id', $payable->id)->exists()) {
            return back()->with('info', 'Anda sudah terdaftar di paket ini.');
        }

        // 2. Validation: Pending transaction?
        $existingTransaction = Transaction::where('user_id', $user->id)
            ->where('payable_id', $payable->id)
            ->where('payable_type', get_class($payable))
            ->where('status', 'pending')
            ->first();

        if ($existingTransaction) {
            $transaction = $existingTransaction;
            return view('pages.enrollment.checkout', compact('payable', 'transaction', 'type'));
        }

        // 3. Create Xendit Invoice
        $externalId = 'inv-' . Str::random(10);
        $secretKey = config('services.xendit.secret_key');

        $response = Http::withBasicAuth($secretKey, '')
            ->post('https://api.xendit.co/v2/invoices', [
                'external_id' => $externalId,
                'amount' => (int) $payable->price,
                'payer_email' => $user->email,
                'description' => "Pembelian {$type}: {$payable->title}",
                'items' => [
                    [
                        'name' => $payable->title,
                        'quantity' => 1,
                        'price' => (int) $payable->price,
                        'category' => $type,
                    ]
                ],
                'customer' => [
                    'given_names' => $user->name,
                    'email' => $user->email,
                ],
                'success_redirect_url' => route('dashboard'),
                'failure_redirect_url' => route('courses.show', $payable),
                'currency' => 'IDR',
                'reminder_time' => 1,
            ]);

        if ($response->failed()) {
            Log::error('Xendit Invoice Creation Failed', $response->json());
            return back()->with('error', 'Gagal membuat invoice pembayaran. Silakan coba lagi.');
        }

        $invoice = $response->json();

        // 4. Record Transaction
        $transaction = Transaction::create([
            'user_id' => $user->id,
            'payable_id' => $payable->id,
            'payable_type' => get_class($payable),
            'amount' => $payable->price,
            'status' => 'pending',
            'external_id' => $invoice['id'],
            'checkout_url' => $invoice['invoice_url'],
        ]);

        return view('pages.enrollment.checkout', compact('payable', 'transaction', 'type'));
    }

    public function handleWebhook(Request $request)
    {
        $callbackToken = $request->header('x-callback-token');
        // Optional: Verify callback token if configured in Xendit dashboard
        
        $data = $request->all();
        $invoiceId = $data['id'];
        $status = $data['status'];

        $transaction = Transaction::where('external_id', $invoiceId)->first();

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        if ($status === 'PAID' || $status === 'SETTLED') {
            $transaction->update(['status' => 'completed']);
            
            $user = $transaction->user;
            $payable = $transaction->payable;

            if ($transaction->payable_type === Course::class) {
                $user->courses()->syncWithoutDetaching([$payable->id]);
            } elseif ($transaction->payable_type === CourseBundle::class) {
                $user->bundles()->syncWithoutDetaching([$payable->id]);
                // Also enroll in all courses within the bundle
                $courseIds = $payable->courses->pluck('id')->toArray();
                $user->courses()->syncWithoutDetaching($courseIds);
            }

            // Upgrade role if they are a regular user
            if ($user->role === \App\Enums\UserRole::USER) {
                $user->update(['role' => \App\Enums\UserRole::MEMBER]);
            }
        } elseif ($status === 'EXPIRED') {
            $transaction->update(['status' => 'expired']);
        }

        return response()->json(['message' => 'OK']);
    }
}
