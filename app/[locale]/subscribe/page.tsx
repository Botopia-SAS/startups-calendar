'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

const NewsletterForm = () => {
  const t = useTranslations('Newsletter'); // Obtiene traducciones del namespace 'Hero'

  const locale = useLocale(); // Idioma actual // Idioma actual

  // Asegúrate de que el `locale` esté disponible antes de renderizar
  if (!locale) return null;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [linkedin, setLinkedin] = useState(''); // Estado para LinkedIn
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Validación del campo LinkedIn
    if (linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(linkedin)) {
      setMessage(t('Validation.LinkedinInvalid'));
      setIsSubmitting(false);
      return;
    }

    const form = { fullName, email, company, city, country, linkedin };

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
        setMessage(t('Messages.Success'));
        setFullName('');
        setEmail('');
        setCompany('');
        setCity('');
        setCountry('');
        setLinkedin(''); // Resetea el estado del perfil de LinkedIn
      } else {
        setMessage(data.message || 'Algo salió mal. Intenta nuevamente.');
      }
    } catch (error) {
      setMessage(t('Messages.GenericError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-[calc(80vh-80px)] flex items-center justify-center">
      <div className="w-full px-4">
        <h2 className="text-2xl font-semibold text-center text-orange-500 mb-8">
          {t('Title')}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4"
        >
          <input
            type="text"
            placeholder={t('Placeholders.FullName')}
            className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder={t('Placeholders.Email')}
            className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder={t('Placeholders.Company')}
            className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder={t('Placeholders.City')}
            className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder={t('Placeholders.Country')}
            className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            placeholder={t('Placeholders.Linkedin')}
            className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('Buttons.Submitting') : t('Buttons.Subscribe')}
          </button>
        </form>

        {/* Nota de términos y condiciones */}
        <p className="text-center mt-4 text-gray-500 text-sm">
          {t('Footer.Text')}{' '}
          <Link
            href={`/${locale}/terms-and-conditions`}
            className="text-orange-500 hover:underline">
            {t('Footer.Terms')}
          </Link>
        </p>

        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}
      </div>
    </section>
  );
};

export default NewsletterForm;
