import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
            <Head title="Lupa Kata Sandi" />

            <div className="bg-white w-full max-w-xl rounded-[40px] p-12 md:p-16 shadow-2xl flex flex-col items-center">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Lupa Kata Sandi?</h1>
                    <p className="text-gray-500">Pastikan email yang Anda masukkan benar.</p>
                </div>

                {status && (
                    <div className="mb-4 w-full text-sm font-medium text-green-600 text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="w-full space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full rounded-2xl border-gray-200 bg-gray-50 py-4 px-6 focus:ring-[#FF7A00] focus:border-[#FF7A00] placeholder:text-gray-400 shadow-sm"
                            isFocused={true}
                            placeholder="Enter your email"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className={`w-full bg-[#FF7A00] text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-[#E66E00] transition-colors shadow-lg shadow-orange-200 ${processing ? 'opacity-50' : ''}`}
                            disabled={processing}
                        >
                            Reset Password
                        </button>
                    </div>

                    <div className="text-center">
                        <Link
                            href={route('login')}
                            className="text-[#FF7A00] font-medium hover:underline text-sm"
                        >
                            Kembali ke login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
