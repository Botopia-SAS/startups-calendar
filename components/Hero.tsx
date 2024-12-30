'use client';
import React from 'react';
import Slider from 'react-slick';

const Hero = () => {
    // Configuración del carrusel
    const settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 2, // Cantidad de logos visibles al mismo tiempo
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear", // Movimiento suave y constante
        responsive: [
            {
                breakpoint: 768, // Configuración para tablets y móviles
                settings: {
                    slidesToShow: 3, // Mostrar menos logos en pantallas más pequeñas
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3, // Mostrar un logo a la vez en móviles
                },
            },
        ],
    };

    // Lista de logos de eventos importantes
    const logos = [
        '/events/colombiatechweek.svg',
        '/events/startco.jpg',
        '/events/techcrunch.svg',
        '/events/colombiafintech.svg',
        '/events/websummit.svg',
        '/events/latamfintech.svg',
    ];

    return (
        <section className="bg-gray-100 text-center py-10 md:py-22 lg:py-30">
            <div className="max-w-6xl mx-auto px-4">
                {/* Logo */}
                <div className="flex justify-center items-center mb-6 lg:mb-12">
                    <img
                        src="/logo.png"
                        alt="Startups Calendar Logo"
                        className="h-24 md:h-16 lg:h-40"
                    />
                </div>

                {/* Subtítulo */}
                <p className="text-lg md:text-xl lg:text-5xl text-gray-600 mb-10 lg:mb-16">
                    Descubre los próximos eventos de{' '}
                    <span className="font-semibold text-blue-600">
                        Startups y Tecnología
                    </span>{' '}
                    en <span className="font-semibold text-orange-500">2025</span>
                </p>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 lg:gap-8 mb-10 lg:mb-24">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow">
                        AGREGA TU EVENTO
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow">
                        SUSCRÍBETE
                    </button>
                    <button className="bg-gray-700 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow">
                        CALENDARIO
                    </button>
                </div>

                {/* Carrusel */}
                <div className="mt-10 lg:mt-16 relative">
                    {/* Contenedor con Gradiente */}
                    <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-gray-100 via-transparent to-gray-100"></div>

                    <Slider {...settings}>
                        {logos.map((logo, index) => (
                            <div key={index} className="px-2">
                                <img
                                    src={logo}
                                    alt={`Evento ${index + 1}`}
                                    className="h-20 mx-auto object-contain rounded-full shadow-lg"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Hero;
