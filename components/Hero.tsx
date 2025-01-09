'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import '../app/[locale]/globals.css';

const Hero = () => {
  const t = useTranslations('Hero'); // Obtiene traducciones del namespace 'Hero'

  const locale = useLocale(); // Idioma actual

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);

  // Obtener imágenes desde el endpoint
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/get-events'); // Llama al endpoint
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

  // Cambiar la imagen cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [carouselImages]);

  return (
    <div className="bg-gray-50 font-normal relative">
      {/* Carrusel de imágenes de fondo */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="h-full w-full relative">
          {carouselImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Carousel Image ${index + 1}`}
              className={`absolute h-full w-full object-cover transition-opacity duration-500 ${index === carouselIndex ? 'opacity-100' : 'opacity-0'
                }`}
              style={{
                objectFit: 'cover',
              }}
            />
          ))}
        </div>
      </div>


      {/* Primera Sección: Logo */}
      <section className="relative z-10 bg-transparent text-center py-5 md:py-22 lg:py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center lg:mb-2">
            <img
              src="/logo.png"
              alt="Startups Calendar Logo"
              className="h-24 md:h-16 lg:h-36 lg:m-12 mt-20  lg:mt-20"
            />
          </div>
        </div>
      </section>

      {/* Segunda Sección: Subtítulo y Botones */}
      <section className="relative z-10 bg-gray-50 text-center py-14 md:py-24 lg:py-20 mt-16">
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
