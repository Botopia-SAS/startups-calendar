'use client';

const Header = () => {
  return (
    <header className="bg-white shadow w-full z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Startups Calendar Logo"
              className="h-10 md:h-12"
            />
          </a>

          {/* Navigation Links */}
          <nav className="flex flex-grow justify-end space-x-8 md:space-x-8">
            <a
              href="/noticias"
              className="text-gray-600 hover:text-blue-500 font-medium "
            >
              Nosotros
            </a>
            <a
              href="/blog"
              className="text-gray-600 hover:text-blue-500 font-medium"
            >
              Blog
            </a>
            <a
              href="/aliados"
              className="text-gray-600 hover:text-blue-500 font-medium"
            >
              Aliados
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
