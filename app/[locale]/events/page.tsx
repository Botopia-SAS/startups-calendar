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
  const [monthFilter, setMonthFilter] = useState('');
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

  if (loading) {
    return <p className="text-center text-gray-500">Cargando eventos...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Calendario de Eventos</h1>

        {/* Filtros */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

            {/* Filtrar por mes */}
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
            >
              <option value="">Filtrar por mes</option>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>

            {/* Filtrar por precio */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
            >
              <option value="">Filtrar por precio</option>
              <option value="Gratis">Gratis</option>
              <option value="Pagado">Pagado</option>
            </select>


            {/* Botón para quitar filtros */}
            <button
              onClick={clearFilters}
              className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Quitar filtros
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
            </div>

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
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
