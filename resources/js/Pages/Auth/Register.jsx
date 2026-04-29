import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import HokgLogo from '@/Components/HokgLogo';
import Checkbox from '@/Components/Checkbox';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Register" />

            <div className="flex flex-col h-full justify-center">
                <HokgLogo className="mb-8" />

                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Daftar</h1>
                    <p className="text-gray-600">Buat akun untuk memulai perjalanan belajarmu.</p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full rounded-2xl border-[#FF7A00] py-4 px-6 focus:ring-[#FF7A00] focus:border-[#FF7A00] placeholder:text-gray-400"
                            autoComplete="name"
                            isFocused={true}
                            placeholder="Nama Lengkap"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-2xl border-[#FF7A00] py-4 px-6 focus:ring-[#FF7A00] focus:border-[#FF7A00] placeholder:text-gray-400"
                            autoComplete="username"
                            placeholder="Email"
                            onChange={(e) => setData('email', e.target.value)}
                            required
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
                            autoComplete="new-password"
                            placeholder="Password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full rounded-2xl border-[#FF7A00] py-4 px-6 focus:ring-[#FF7A00] focus:border-[#FF7A00] placeholder:text-gray-400"
                            autoComplete="new-password"
                            placeholder="Konfirmasi Password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center">
                        <Checkbox
                            name="terms"
                            checked={data.terms}
                            className="rounded border-gray-300 text-[#FF7A00] shadow-sm focus:ring-[#FF7A00]"
                            onChange={(e) =>
                                setData('terms', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Saya setuju dengan <Link href="#" className="text-[#FF7A00] hover:underline">Syarat & Ketentuan</Link>
                        </span>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className={`w-full bg-[#FF7A00] text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-[#E66E00] transition-colors ${processing ? 'opacity-50' : ''}`}
                            disabled={processing}
                        >
                            Daftar
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Sudah punya akun?{' '}
                        <Link
                            href={route('login')}
                            className="text-[#FF7A00] font-bold hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
