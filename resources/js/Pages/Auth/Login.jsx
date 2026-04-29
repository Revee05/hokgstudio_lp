import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import HokgLogo from '@/Components/HokgLogo';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Log in" />

            <div className="flex flex-col h-full justify-center">
                <HokgLogo className="mb-10 flex justify-center" />

                <div className="mb-8 flex justify-center flex-col items-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Login</h1>
                    <p className="text-gray-600">Masuk untuk melanjutkan perjalanan belajarmu</p>
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-2xl border-[#FF7A00] py-4 px-6 focus:ring-[#FF7A00] focus:border-[#FF7A00] placeholder:text-gray-400"
                            autoComplete="username"
                            isFocused={true}
                            placeholder="Masukkan email"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-2xl border-[#FF7A00] py-4 px-6 focus:ring-[#FF7A00] focus:border-[#FF7A00] placeholder:text-gray-400"
                            autoComplete="current-password"
                            placeholder="Masukkan password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                className="rounded border-gray-300 text-[#FF7A00] shadow-sm focus:ring-[#FF7A00]"
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Ingat Akun
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-gray-600 hover:text-[#FF7A00]"
                            >
                                Lupa Password?
                            </Link>
                        )}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className={`w-full bg-[#FF7A00] text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-[#E66E00] transition-colors ${processing ? 'opacity-50' : ''}`}
                            disabled={processing}
                        >
                            Masuk
                        </button>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-600">
                        Belum punya akun?{' '}
                        <Link
                            href={route('register')}
                            className="text-[#FF7A00] font-bold hover:underline"
                        >
                            Daftar sekarang
                        </Link>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
