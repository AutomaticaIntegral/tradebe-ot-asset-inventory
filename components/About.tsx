import React from 'react';

interface AboutProps {
  isOpen: boolean;
  onClose: () => void;
}

const About: React.FC<AboutProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-700">
        <header className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            Acerca del Sistema
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>
        
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Cliente */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img 
                src="/logos/LogoTradebe.png" 
                alt="Tradebe" 
                className="h-16 w-auto"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Cliente</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong>Tradebe</strong> es una empresa líder en gestión integral de residuos industriales, 
                especializada en soluciones ambientales sostenibles y tratamiento de residuos peligrosos.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            {/* Desarrollador */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <img 
                  src="/logos/ASABLON_LOGO_COMPACTO_TR.png" 
                  alt="Automática Integral" 
                  className="h-16 w-auto"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Desarrollador</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  <strong>Automática Integral</strong> es una empresa especializada en automatización industrial 
                  y desarrollo de soluciones tecnológicas para la industria 4.0.
                </p>
                <div className="text-gray-400 text-xs space-y-1">
                  <p>Web: automaticaintegral.com</p>
                  <p>Email: info@automaticaintegral.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información del Sistema */}
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-bold text-white mb-3 text-center">Sistema de Inventario OT</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-700/30 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-300 mb-2">Características</h4>
                <ul className="text-gray-400 space-y-1 text-xs">
                  <li>• Gestión de activos OT</li>
                  <li>• Dashboard interactivo</li>
                  <li>• Reportes y análisis</li>
                  <li>• Control de usuarios</li>
                </ul>
              </div>
              <div className="bg-gray-700/30 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-300 mb-2">Tecnologías</h4>
                <ul className="text-gray-400 space-y-1 text-xs">
                  <li>• React 19 + TypeScript</li>
                  <li>• Firebase Backend</li>
                  <li>• Tailwind CSS</li>
                  <li>• Recharts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-4 text-center">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Tradebe. Sistema desarrollado por Automática Integral.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Todos los derechos reservados.
            </p>
          </div>
        </div>
        
        <footer className="px-6 py-3 border-t border-gray-700 mt-auto flex justify-end bg-gray-800">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Cerrar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default About; 