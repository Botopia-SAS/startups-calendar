'use client';
import React from 'react';

const Hero = () => {
    return (
        <div className="bg-gray-50">
            {/* Primera Sección: Logo */}
            <section className="bg-white text-center py-10 md:py-22 lg:py-30">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-center items-center lg:mb-2 ">
                        <img
                            src="/logo.png"
                            alt="Startups Calendar Logo"
                            className="h-24 md:h-16 lg:h-36 lg:m-12"
                        />
                    </div>
                </div>
            </section>
            {/* Segunda Sección: Subtítulo y Botones */}
            <section className="bg-gray-50 text-center py-16 md:py-24 lg:py-20">
                <div className="max-w-6xl mx-auto px-4 ">
                    <h2 className="tracking-extra text-lg md:text-xl lg:leading-tight lg:text-5xl font-thin text-gray-700 mb-10 lg:mb-8">
                        Descubre los próximos eventos de <br />{' '}
                        <span className="font-semibold text-gray-800 tracking-normal">
                            Startups y Tecnología
                        </span>{' '}
                        en <span className="font-semibold text-gray-800 tracking-normal">2025</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 lg:gap-8 lg:mb-4 lg:mt-12">
                        <button className="bg-green-950 hover:bg-blue-600 text-white py-2 px-6 rounded-full shadow">
                            VER CALENDARIO DE EVENTOS
                        </button>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full shadow">
                            AGREGA TU EVENTO
                        </button>
                        <button className="bg-cyan-400 hover:bg-blue-600 text-white py-2 px-6 rounded-full shadow">
                            SUSCRÍBETE
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
