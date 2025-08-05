import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };
    return (_jsxs(GuestLayout, { children: [_jsx(Head, { title: "Register" }), _jsxs("form", { onSubmit: submit, children: [_jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "name", value: "Name" }), _jsx(TextInput, { id: "name", name: "name", value: data.name, className: "mt-1 block w-full", autoComplete: "name", isFocused: true, onChange: (e) => setData('name', e.target.value), required: true }), _jsx(InputError, { message: errors.name, className: "mt-2" })] }), _jsxs("div", { className: "mt-4", children: [_jsx(InputLabel, { htmlFor: "email", value: "Email" }), _jsx(TextInput, { id: "email", type: "email", name: "email", value: data.email, className: "mt-1 block w-full", autoComplete: "username", onChange: (e) => setData('email', e.target.value), required: true }), _jsx(InputError, { message: errors.email, className: "mt-2" })] }), _jsxs("div", { className: "mt-4", children: [_jsx(InputLabel, { htmlFor: "password", value: "Password" }), _jsx(TextInput, { id: "password", type: "password", name: "password", value: data.password, className: "mt-1 block w-full", autoComplete: "new-password", onChange: (e) => setData('password', e.target.value), required: true }), _jsx(InputError, { message: errors.password, className: "mt-2" })] }), _jsxs("div", { className: "mt-4", children: [_jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }), _jsx(TextInput, { id: "password_confirmation", type: "password", name: "password_confirmation", value: data.password_confirmation, className: "mt-1 block w-full", autoComplete: "new-password", onChange: (e) => setData('password_confirmation', e.target.value), required: true }), _jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })] }), _jsxs("div", { className: "mt-4 flex items-center justify-end", children: [_jsx(Link, { href: route('login'), className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2", children: "Already registered?" }), _jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Register" })] })] })] }));
}
