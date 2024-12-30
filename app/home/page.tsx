import React from 'react'

const home = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            {/* Header */}
            <header className="w-full bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center">
                    <img src="/logo.png" alt="Logo" className="h-10 mr-2" />
                    STARTUPS CALENDAR
                </h1>
                <div className="flex gap-4">
                    <a href="#" className="text-blue-500 hover:underline">Instagram</a>
                    <a href="#" className="text-blue-500 hover:underline">LinkedIn</a>
                </div>
            </header>

            {/* Hero Section */}
            <main className="text-center mt-16">
                <h2 className="text-3xl font-bold mb-4">
                    Descubre los próximos eventos de{" "}
                    <span className="text-blue-600">Startups y Tecnología</span> en 2023
                </h2>
                <div className="flex justify-center gap-4 mt-6">
                    <button className="bg-orange-500 text-white px-6 py-3 rounded shadow hover:bg-orange-600">
                        AGREGA TU EVENTO
                    </button>
                    <button className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600">
                        SUSCRÍBETE
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-auto p-4 bg-gray-200 w-full text-center">
                <p>© 2023 Startups Calendar. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default home