'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import '../app/[locale]/globals.css';

const Hero = () => {
  const t = useTranslations('Hero');
  const locale = useLocale();

  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [position, setPosition] = useState(0); // Posición actual del carrusel
  const containerRef = useRef<HTMLDivElement>(null); // Referencia al contenedor

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/get-events');
        const data = await response.json();
        if (data.success) {
          const images = data.events
            .map((event: any) => event['Logo'])
            .filter(
              (url: string) =>
                url && !url.includes('default-logo.png') // Filtra URLs no válidas
            );
          setCarouselImages(images);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (carouselImages.length === 0 || !containerRef.current) return;

    const container = containerRef.current;
    const totalWidth = container.scrollWidth / 2; // Ancho total del contenido duplicado

    const interval = setInterval(() => {
      setPosition((prev) => {
        const newPos = prev - 1; // Mueve 1px por iteración
        if (Math.abs(newPos) >= totalWidth) {
          return 0; // Reinicia la posición
        }
        return newPos;
      });
    }, 20); // Actualiza cada 20ms para un movimiento suave

    return () => clearInterval(interval);
  }, [carouselImages]);

  return (
    <div className="bg-gray-50 font-normal relative mt-20">
      {/* Carrusel de imágenes de fondo */}
      <div
        ref={containerRef}
        className="absolute inset-x-0 top-0 z-0 overflow-hidden flex justify-center items-center h-40 md:h-56 rounded-lg"
      >
        <div
          className="flex gap-8 md:gap-12 lg:gap-12"
          style={{
            transform: `translateX(${position * 2}px)`, // Movimiento continuo
            width: `${carouselImages.length * 2 * 100}px`, // Ancho total en píxeles
            opacity: 0.3
          }}
        >
          {[...carouselImages, ...carouselImages].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Carousel Image ${index + 1}`}
              className="h-32 w-auto md:h-40 lg:h-40 object-contain rounded-lg opacity-70 hover:opacity-100 transition-opacity duration-300"
            />

          ))}
        </div>
      </div>

      {/* Primera Sección: Logo */}
      <section className="relative z-10 bg-transparent flex flex-col items-center justify-center text-center py-10 lg:py-6">
        <div className="w-full flex justify-center">
          <img
            src="/logo.png"
            alt="Startups Calendar Logo"
            className="w-56 h-auto md:w-96 md:mt-8"
          />
        </div>
      </section>

      {/* Segunda Sección: Subtítulo y Botones */}
      <section className="relative z-20 bg-gray-50 text-center py-5 md:py-24 lg:py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="tracking-extra text-lg md:text-xl lg:leading-none lg:text-5xl font-thin text-gray-700 mb-10 lg:mb-8">
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
              href={`/${locale}/add-event`}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full shadow-md shadow-gray-400 text-center"
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
