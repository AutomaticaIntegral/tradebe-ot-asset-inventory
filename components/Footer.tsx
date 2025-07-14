import React, { useState } from 'react';
import About from './About';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <footer className="bg-gray-800/50 border-t border-gray-700 mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Cliente */}
            <div className="flex items-center space-x-3">
              <img 
                src="/logos/logoTradebeTexto.png" 
                alt="Tradebe" 
                className="h-6 w-auto opacity-80"
              />
              <span className="text-gray-400 text-sm">
                Sistema de Inventario OT
              </span>
            </div>

            {/* Información central */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © {currentYear} Tradebe. Todos los derechos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Gestión integral de activos de tecnología operacional
              </p>
              <button 
                onClick={() => setIsAboutOpen(true)}
                className="text-gray-500 hover:text-gray-400 text-xs mt-1 underline"
              >
                Acerca de
              </button>
            </div>

            {/* Desarrollador */}
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-gray-400 text-sm">
                  Desarrollado por
                </p>
                <p className="text-gray-300 font-medium text-sm">
                  Automática Integral
                </p>
                <p className="text-gray-500 text-xs">
                  automaticaintegral.com
                </p>
              </div>
              <img 
                src="/logos/ASABLON_LOGO_COMPACTO_TR.png" 
                alt="Automática Integral" 
                className="h-8 w-auto opacity-70 ml-2"
              />
            </div>
          </div>

          {/* Información adicional en pantallas pequeñas */}
          <div className="md:hidden mt-4 pt-4 border-t border-gray-700 text-center">
            <p className="text-gray-500 text-xs">
              Sistema especializado en inventario y gestión de activos industriales
            </p>
          </div>
        </div>
      </footer>
      
      <About isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
};

export default Footer; 