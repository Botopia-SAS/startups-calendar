'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const Page = () => {

  const t = useTranslations('Events'); // Traducciones del namespace 'Events'
  const router = useRouter();

  interface Event {
    'Nombre del Evento': string;
    'Ubicación': string;
    'Fecha': string;
    'Precio': string;
    'Logo': string;
    'Enlace': string;
    'Descripción': string;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  // Estado del idioma actual
  const pathname = usePathname();
  const locale = pathname ? pathname.split('/')[1] || 'es' : 'es';
  const [currentLanguage, setCurrentLanguage] = useState(locale);

  const formatDate = (isoDate: string, locale: string) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    let month = date.toLocaleString(locale, { month: 'long' }); // Obtiene el nombre del mes en el idioma actual

    // Capitalizar la primera letra del mes
    month = month.charAt(0).toUpperCase() + month.slice(1);

    return `${month} ${day} `;
  };

  const capitalizeEventName = (name: string) => {
    return name
      .toLowerCase() // Asegura que el resto del texto esté en minúsculas
      .replace(/\b\w/g, char => char.toUpperCase()); // Convierte la primera letra de cada palabra en mayúscula
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/get-events');

        console.log(response);
        const data = await response.json();
        if (data.success) {
          setEvents(data.events);
          setFilteredEvents(data.events);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filtro dinámico
  useEffect(() => {
    let filtered = events;

    // Filtrar por nombre
    if (search) {
      filtered = filtered.filter((event) =>
        event['Nombre del Evento'].toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por ubicación
    if (locationFilter) {
      filtered = filtered.filter((event) =>
        event['Ubicación'].toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Filtrar por mes
    if (monthFilter) {
      filtered = filtered.filter((event) => {
        const eventMonth = new Date(event['Fecha']).getMonth() + 1; // Meses en JavaScript empiezan desde 0
        return eventMonth === parseInt(monthFilter, 10);
      });
    }

    // Filtrar por precio
    // Filtro por precio
    if (priceFilter) {
      filtered = filtered.filter((event) => {
        const price = event['Precio'] || '';
        if (priceFilter === 'Gratis' || priceFilter === 'Free') return price === 'Gratis';
        if (priceFilter === 'Pago' || priceFilter === 'Paid') return price !== 'Gratis';
        if (priceFilter === 'Por definir') return price === 'Por definir';
        return false;
      });
    }


    setFilteredEvents(filtered);
  }, [search, locationFilter, monthFilter, priceFilter, events]);

  // Función para quitar todos los filtros
  const clearFilters = () => {
    setSearch('');
    setLocationFilter('');
    setMonthFilter('');
    setPriceFilter('');
    setFilteredEvents(events); // Reiniciar la lista de eventos filtrados
  };

  // Cambiar idioma
  const changeLanguage = (lang: string) => {
    if (lang !== currentLanguage) {
      setCurrentLanguage(lang);
      if (pathname) {
        router.push(`/${lang}${pathname.replace(/^\/[a-z]{2}/, '')}`);
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">{t('Loading')}</p>;
  }


  return (

    <div className=" py-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">{t('Title')}</h1>

      {/* Filtro de meses */}
      <div className="text-xl flex justify-between overflow-x-auto space-x-2 py-12 px-8 gap-4">
        {[
          { value: '1', label: t('Months.January') },
          { value: '2', label: t('Months.February') },
          { value: '3', label: t('Months.March') },
          { value: '4', label: t('Months.April') },
          { value: '5', label: t('Months.May') },
          { value: '6', label: t('Months.June') },
          { value: '7', label: t('Months.July') },
          { value: '8', label: t('Months.August') },
          { value: '9', label: t('Months.September') },
          { value: '10', label: t('Months.October') },
          { value: '11', label: t('Months.November') },
          { value: '12', label: t('Months.December') },
        ].map((month) => (
          <button
            key={month.value}
            onClick={() => setMonthFilter(month.value)}
            className={`px-3 py-2 rounded-full text-m font-medium shadow-md shadow-gray-400 ${monthFilter === month.value
              ? 'bg-green-800 text-white scale-125 transition-all -translate-y-2 shadow-xl shadow-gray-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-110 transition-all'
              }`}
          >
            {month.label}
          </button>
        ))}
      </div>

      <div className="px-6">

        {/* Filtros */}
        <div className="bg-transparent shadow-md rounded-lg p-4 mb-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Buscar por nombre */}
            <input
              type="text"
              placeholder={t('Filters.Search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Filtrar por ubicación */}
            <input
              type="text"
              placeholder={t('Filters.Location')}
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Filtrar por precio */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
            >
              <option value="">{t('Filters.Price')}</option>
              <option value={t('Filters.Free')}>{t('Filters.Free')}</option>
              <option value={t('Filters.Paid')}>{t('Filters.Paid')}</option>
            </select>


            {/* Botón para quitar filtros */}
            <button
              onClick={clearFilters}
              className=" bg-orange-500 border-l-orange-500 text-white rounded-full px-4 py-2 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {t('Filters.Clear')}
            </button>
          </div>
        </div>

        {/* Mostrar mensaje si no hay eventos */}
        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500">No hay eventos que coincidan con los filtros.</p>
        ) : (
          <>
            {/* Contenedor de tabla */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-transparent text-gray-600 uppercase text-base leading-normal">
                    <th className="py-3 px-1 text-left w-2/12"></th>
                    <th className="py-3 px-1 text-left w-3/12">{t('Table.Event')}</th>
                    <th className="py-3 px-1 text-center w-3/12">{t('Table.Location')}</th>
                    <th className="py-3 px-1 text-center w-1/12">{t('Table.Date')}</th>
                    <th className="py-3 px-1 text-center w-2/12">{t('Table.ViewSite')}</th>
                    <th className="py-3 px-1 text-center w-1/12">{t('Table.Cost')}</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {filteredEvents.map((event, index) => (

                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-3 text-left flex items-center justify-center relative">
                        <img
                          src={event['Logo']}
                          alt={event['Nombre del Evento']}
                          className="w-auto h-32 object-fill rounded"
                        />
                      </td>
                      <td className="py-3 px-1 text-left relative">
                        <div className='bg-transparent rounded-full py-2 px-2 mt-4 mb-4 items-center justify-start flex'>
                          <a
                            href={event['Enlace']}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black hover:text-green-700 font-medium flex flex-wrap text-lg"
                          >{event['Nombre del Evento']}
                          </a>
                        </div>
                        </td>
                      <td className="py-3 text-center text-lg">{event['Ubicación']}</td>
                      <td className="py-3 px-2 text-center text-lg">
                        {formatDate(event['Fecha'], currentLanguage)}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => window.open(event['Enlace'], '_blank')}
                          className="bg-orange-500 hover:bg-green-800 text-white font-medium text-lg py-2 px-4 rounded-lg shadow-md shadow-gray-400 transform transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                        >
                          {t('Table.Button')}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-center">
                      {event['Precio'] === 'Gratis' && (
                            <span className="relative text-green-700 text-xl font-bold">
                              {t('Filters.Free')}
                            </span>
                          )}
                          {event['Precio'] !== 'Gratis' && (
                            <span className="relative text-cyan-400 text-xl font-bold">
                              {t('Filters.Paid')}
                            </span>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vista móvil */}
            <div className="grid grid-cols-1 gap-4 md:hidden relative">
              {filteredEvents.map((event, index) => (

                <div key={index} className="bg-transparent shadow-md rounded-lg p-4 flex flex-wrap">
                  <div className="flex items-center mb-4 flex-wrap justify-center">
                    <div className="w-full h-52 flex justify-center items-center overflow-hidden">
                      <img
                        src={event['Logo']}
                        alt={event['Nombre del Evento']}
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                    </div>

                    <div className='bg-orange-500 rounded-full px-4 py-2 shadow-lg shadow-gray-400 mt-4 mb-4 items-center justify-center flex'>
                      <a
                        href={event['Enlace']}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:underline font-bold flex flex-wrap px-4"
                      >{event['Nombre del Evento']}
                      </a>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">

                    <p>
                      <strong>{t('Table.Location')}:</strong> {event['Ubicación']}
                    </p>
                    <p>
                        <strong>{t('Table.Date')}:</strong> {formatDate(event['Fecha'], currentLanguage)}
                    </p>
                    <p className='py-1'>
                      {event['Precio'] === 'Gratis' && (
                        <span className="mt-2 bg-transparent text-green-500 text-base font-bold rounded-full">
                          {t('Filters.Free')}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
