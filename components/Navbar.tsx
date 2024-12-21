

const Navbar = () => {
  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="#" className="hover:text-gray-300">Tube Help</a>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6">
          {/* Portfolio Link */}
          <a
            href="https://portfolio-talha-ansaris-projects.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Portfolio
          </a>
          {/* GitHub Icon */}
          <a
            href="https://github.com/talha-ansarii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 0a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1 .1 1.5 1.1 1.5 1.1.9 1.5 2.5 1.1 3.2.8.1-.7.4-1.1.7-1.4-2.6-.3-5.3-1.3-5.3-6a4.7 4.7 0 011.3-3.2c-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.3a11.9 11.9 0 016.2 0c2.4-1.6 3.4-1.3 3.4-1.3.7 1.7.3 3 .1 3.3a4.7 4.7 0 011.3 3.2c0 4.7-2.7 5.7-5.3 6 .4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0012 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          {/* LinkedIn Icon */}
          <a
            href="https://in.linkedin.com/in/talha-ansarii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.4 0H3.6A3.6 3.6 0 000 3.6v16.8A3.6 3.6 0 003.6 24h16.8a3.6 3.6 0 003.6-3.6V3.6A3.6 3.6 0 0020.4 0zM7.2 20.4H3.6V9h3.6v11.4zm-1.8-13a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zM20.4 20.4h-3.6V14c0-1.5-.3-2.5-2.1-2.5-1.8 0-2.1 1.3-2.1 2.5v6.4h-3.6V9h3.6v1.6c.5-.9 2-1.8 3.7-1.8 3.6 0 4.2 2.4 4.2 5.6v6z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
