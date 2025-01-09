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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/get-events');
        const data = await response.json();
        console.log(data)
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
    if (priceFilter) {
      if (priceFilter === 'Gratis') {
        filtered = filtered.filter((event) => event['Precio'] === 'Gratis');
      } else if (priceFilter === 'Pagado') {
        filtered = filtered.filter((event) => event['Precio'] !== 'Gratis');
      }
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

    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">{t('Title')}</h1>

        {/* Filtros */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
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

        {/* Filtro de meses */}
        <div className="flex justify-between overflow-x-auto space-x-2 mb-6 bg-white shadow-md rounded-lg p-4">
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
              className={`px-4 py-2 rounded-full text-sm font-medium ${monthFilter === month.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {month.label}
            </button>
          ))}
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
                  <tr className="bg-transparent text-gray-600 uppercase text-sm leading-normal">
                    <th></th>
                    <th className="py-3 px-6 text-left">{t('Table.Event')}</th>
                    <th className="py-3 px-6 text-left">{t('Table.Location')}</th>
                    <th className="py-3 px-6 text-center">{t('Table.Date')}</th>
                    <th className="py-3 px-6 text-center">{t('Table.Price')}</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {filteredEvents.map((event, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-3 text-left flex items-center justify-center">
                        <img
                          src={event['Logo']}
                          alt={event['Nombre del Evento']}
                          className="w-auto h-32 object-fill rounded"
                        />
                      </td>
                      <td className="py-3 px-4 text-left">{event['Nombre del Evento']}</td>
                      <td className="py-3 px-4 text-left">{event['Ubicación']}</td>
                      <td className="py-3 px-4 text-center">{event['Fecha']}</td>
                      <td className="py-3 px-4 text-center">
                        {event['Precio'] === 'Gratis' ? 'Gratis' : `$${event['Precio']}`}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <a
                          href={event['Enlace'] || '#'} // Enlace por defecto si no hay URL
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline font-bold"
                        >
                          {t('Table.ViewSite')}
                        </a>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vista móvil */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredEvents.map((event, index) => (
                <div key={index} className="bg-transparent shadow-md rounded-lg p-4">
                  <div className="flex items-center mb-4 flex-wrap justify-center">
                    <img
                      src={event['Logo']}
                      alt={event['Nombre del Evento']}
                      className="w-auto h-30 object-cover rounded mr-4"
                    />
                    <div className='animate-bounce bottom-4 right-4 bg-orange-500 rounded-full px-3 py-2 shadow-lg mt-4 mb-4 items-center justify-center flex'>
                      <a
                        href={event['Enlace']}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:underline font-bold flex flex-wrap"
                      >{event['Nombre del Evento']}
                      </a>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>{t('Table.Location')}:</strong> {event['Ubicación']}
                    </p>
                    <p>
                      <strong>{t('Table.Date')}:</strong> {event['Fecha']}
                    </p>
                    <p>
                      <strong>{t('Table.Price')}:</strong>{' '}
                      {event['Precio'] === 'Gratis' ? t('Filters.Free') : `$${event['Precio']}`}
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
