'use client';
import React, { useEffect, useState } from 'react';

const Page = () => {
  interface Event {
    'Nombre del Evento': string;
    'Ubicación': string;
    'Fecha': string;
    'Precio': string;
    'Logo': string;
    'Link': string;
    'Descripción': string;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [priceFilter, setPriceFilter] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/get-events');
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

    // Filtrar por rango de fechas
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event['Fecha']);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return eventDate >= startDate && eventDate <= endDate;
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
  }, [search, locationFilter, dateRange, priceFilter, events]);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando eventos...</p>;
  }

  if (filteredEvents.length === 0) {
    return <p className="text-center text-gray-500">No hay eventos que coincidan con los filtros.</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Calendario de Eventos</h1>

        {/* Filtros */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Buscar por nombre */}
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Filtrar por ubicación */}
            <input
              type="text"
              placeholder="Filtrar por lugar"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Filtrar por rango de fechas */}
            <div className="flex space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtrar por precio */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Filtrar por precio</option>
              <option value="Gratis">Gratis</option>
              <option value="Pagado">Pagado</option>
            </select>
          </div>
        </div>

        {/* Contenedor responsivo */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg hidden md:table">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Evento</th>
                <th className="py-3 px-6 text-left">Lugar</th>
                <th className="py-3 px-6 text-center">Fecha</th>
                <th className="py-3 px-6 text-center">Precio (USD)</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredEvents.map((event, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left flex items-center">
                    <img
                      src={event['Logo']}
                      alt={event['Nombre del Evento']}
                      className="w-12 h-12 object-cover rounded mr-4"
                    />
                    <span className="font-medium">{event['Nombre del Evento']}</span>
                  </td>
                  <td className="py-3 px-6 text-left">{event['Ubicación']}</td>
                  <td className="py-3 px-6 text-center">{event['Fecha']}</td>
                  <td className="py-3 px-6 text-center">
                    {event['Precio'] === 'Gratis' ? 'Gratis' : `$${event['Precio']}`}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <a
                      href={event['Link']}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Sitio del evento
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Vista móvil */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredEvents.map((event, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <img
                    src={event['Logo']}
                    alt={event['Nombre del Evento']}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{event['Nombre del Evento']}</h2>
                    <p className="text-gray-600 text-sm">{event['Descripción']}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Lugar:</strong> {event['Ubicación']}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {event['Fecha']}
                  </p>
                  <p>
                    <strong>Precio:</strong>{' '}
                    {event['Precio'] === 'Gratis' ? 'Gratis' : `$${event['Precio']}`}
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href={event['Link']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Sitio del evento
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
