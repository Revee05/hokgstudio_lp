import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, transform, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            profession: user.mentor?.profession || '',
            city: user.mentor?.city || '',
            bio: user.mentor?.bio || '',
            experience: user.mentor?.experience || '',
            certification: user.mentor?.certification || '',
            avatar: null,
        });

    const submit = (e) => {
        e.preventDefault();

        // Menggunakan transform untuk menyisipkan _method patch ke dalam body request
        transform((data) => ({
            ...data,
            _method: 'patch',
        }));

        post(route('profile.update'), {
            forceFormData: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {user.role === 'mentor' && (
                    <div className="flex items-center gap-6 p-4 bg-orange-50/50 rounded-3xl border border-orange-100 mb-8">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-orange-100 border-4 border-white shadow-sm">
                                {user.mentor?.avatar_url ? (
                                    <img src={user.mentor.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-orange-300">
                                        {user.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex-1">
                            <InputLabel htmlFor="avatar" value="Profile Photo" />
                            <input
                                id="avatar"
                                type="file"
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#FF7A00] hover:file:bg-orange-100 transition-all"
                                onChange={(e) => setData('avatar', e.target.files[0])}
                            />
                            <p className="mt-1 text-[10px] text-gray-400">PNG, JPG up to 2MB</p>
                            <InputError className="mt-2" message={errors.avatar} />
                        </div>
                    </div>
                )}
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {user.role === 'mentor' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="profession" value="Profession" />
                                <TextInput
                                    id="profession"
                                    className="mt-1 block w-full"
                                    value={data.profession}
                                    onChange={(e) => setData('profession', e.target.value)}
                                    placeholder="e.g. Visual Artist"
                                />
                                <InputError className="mt-2" message={errors.profession} />
                            </div>

                            <div>
                                <InputLabel htmlFor="city" value="City" />
                                <TextInput
                                    id="city"
                                    className="mt-1 block w-full"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    placeholder="e.g. Semarang"
                                />
                                <InputError className="mt-2" message={errors.city} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="experience" value="Experience" />
                                <TextInput
                                    id="experience"
                                    className="mt-1 block w-full"
                                    value={data.experience}
                                    onChange={(e) => setData('experience', e.target.value)}
                                    placeholder="e.g. > 5 Years"
                                />
                                <InputError className="mt-2" message={errors.experience} />
                            </div>

                            <div>
                                <InputLabel htmlFor="certification" value="Certification" />
                                <TextInput
                                    id="certification"
                                    className="mt-1 block w-full"
                                    value={data.certification}
                                    onChange={(e) => setData('certification', e.target.value)}
                                    placeholder="Certificates or awards"
                                />
                                <InputError className="mt-2" message={errors.certification} />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="bio" value="Bio / About Me" />
                            <textarea
                                id="bio"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                rows="4"
                                placeholder="Tell us about yourself..."
                            ></textarea>
                            <InputError className="mt-2" message={errors.bio} />
                        </div>
                    </>
                )}

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
