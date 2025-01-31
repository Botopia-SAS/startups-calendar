'use client';
import React, { useState, useEffect } from 'react';

const UserDataModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({ name: '', company: '', country: '', email: '' });

    useEffect(() => {
        const isRegistered = localStorage.getItem('user_registered');
        if (!isRegistered) {
            setShowModal(true);
        }
    }, []);

    const validateForm = (userData: any) => {
        let formErrors = { name: '', company: '', country: '', email: '' };
        let isValid = true;

        if (!userData.name || userData.name.trim().length < 3) {
            formErrors.name = 'El nombre debe tener al menos 3 caracteres.';
            isValid = false;
        }

        if (!userData.company || userData.company.trim().length < 2) {
            formErrors.company = 'La empresa debe tener al menos 2 caracteres.';
            isValid = false;
        }

        if (!userData.country || userData.country.trim().length < 3) {
            formErrors.country = 'El país debe tener al menos 3 caracteres.';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userData.email || !emailRegex.test(userData.email)) {
            formErrors.email = 'Por favor, ingresa un correo válido.';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = {
            name: formData.get('name')?.toString(),
            company: formData.get('company')?.toString(),
            country: formData.get('country')?.toString(),
            email: formData.get('email')?.toString(),
        };

        if (validateForm(userData)) {
            await fetch('/api/save-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            localStorage.setItem('user_registered', 'true');
            setShowModal(false);
        }
    };

    if (!showModal) return null;

    return (
        <div className="fixed p-8 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-8 max-w-md w-11/12 sm:max-w-lg sm:w-full relative">
                {/* Icono decorativo */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="bg-orange-500 rounded-full p-4 shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7m16 0H4"
                            />
                        </svg>
                    </div>
                </div>

                {/* Contenido */}
                <h2 className="text-2xl font-bold text-gray-800 text-center mt-10 mb-4">
                    ¡Bienvenido a Startups Calendar!
                </h2>
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    Nos gustaría enviarte información sobre los eventos más importantes de
                    <span className="font-semibold text-blue-500"> tecnología e inversión en todo el mundo.</span>
                    <br />
                </p>
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    <span className="font-semibold text-orange-500">¡Regístrate para ver el calendario!</span>
                </p>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                        <input
                            type="text"
                            name="company"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500"
                        />
                        {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                        <input
                            type="text"
                            name="country"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500"
                        />
                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>

    );
};

export default UserDataModal;
