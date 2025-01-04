'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const NewsletterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState(''); // Estado para la ciudad
  const [country, setCountry] = useState(''); // Estado para el país
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const form = { fullName, email, company, city, country };

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('¡Gracias por suscribirte!');
        setFullName('');
        setEmail('');
        setCompany('');
        setCity(''); // Resetea el estado de la ciudad
        setCountry(''); // Resetea el estado del país
      } else {
        setMessage(data.message || 'Algo salió mal. Intenta nuevamente.');
      }
    } catch (error) {
      setMessage('Error de conexión. Por favor, intenta más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-[calc(80vh-80px)] flex items-center justify-center">
      <div className="w-full px-4">
        <h2 className="text-2xl font-semibold text-center text-orange-500 mb-8">
          ¡Suscríbete a nuestro Newsletter!
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4"
        >
          <input
            type="text"
            placeholder="Tu nombre completo"
            className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Empresa"
            className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ciudad"
            className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="País"
            className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Suscribirme'}
          </button>
        </form>

        {/* Nota de términos y condiciones */}
        <p className="text-center mt-4 text-gray-500 text-sm">
          *Al enviar tus datos a Startups Calendar aceptas nuestros{' '}
          <Link
            href="app/terms-and-conditions"
            className="text-orange-500 hover:underline">
            Términos y Condiciones
          </Link>
        </p>

        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}
      </div>
    </section>
  );
};

export default NewsletterForm;
