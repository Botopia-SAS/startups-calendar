'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslations,useLocale } from 'next-intl';
import '../app/[locale]/globals.css';

const Hero = () => {
  const t = useTranslations('Hero'); // Obtiene traducciones del namespace 'Hero'

  const locale = useLocale(); // Idioma actual
  return (
    <div className="bg-gray-50 font-extralight">
      {/* Primera Sección: Logo */}
      <section className="bg-white text-center py-10 md:py-22 lg:py-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center lg:mb-2">
            <img
              src="/logo.png"
              alt="Startups Calendar Logo"
              className="h-24 md:h-16 lg:h-36 lg:m-12"
            />
          </div>
        </div>
      </section>

      {/* Segunda Sección: Subtítulo y Botones */}
      <section className="bg-gray-50 text-center py-14 md:py-24 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="tracking-extra text-lg md:text-xl lg:leading-tight lg:text-5xl font-thin text-gray-700 mb-10 lg:mb-8">
            {t('Title')} <br />
            <span className="font-semibold text-gray-800 tracking-normal">
              {t('Subtitle')}
            </span>{' '}
            <span className="font-semibold text-gray-800 tracking-normal">
              {t('Year')}
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 lg:gap-8 lg:mb-2 lg:mt-10 py-4 text-xl">
            <Link
              href={`/${locale}/events`}
              className="bg-green-950 hover:bg-blue-600 text-white py-2 px-6 rounded-full shadow text-center"
            >
              {t('ViewCalendar')}
            </Link>

            {/* Botón de Navegación con Link */}
            <Link
              href={`/${locale}/add-event`}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full shadow text-center"
            >
              {t('AddEvent')}
            </Link>

            <Link
              href={`/${locale}/subscribe`}
              className="bg-cyan-400 hover:bg-cyan-500 text-white py-2 px-6 rounded-full shadow text-center"
            >
              {t('Subscribe')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
