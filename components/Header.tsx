import React from 'react';
import { User, View } from '../types';

interface HeaderProps {
  currentUser: User;
  currentView: View;
  onViewChange: (view: View) => void;
  onLogout: () => void;
}

const TradebeIcon = () => (
  <img 
    src="/logos/logoTradebeTexto.png" 
    alt="Tradebe" 
    className="h-8 w-auto" 
  />
);

const NavTab: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => {
  const activeClasses = "text-white border-blue-500";
  const inactiveClasses = "text-gray-400 border-transparent hover:text-white hover:border-gray-500";
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
    >
      {label}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentUser, currentView, onViewChange, onLogout }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <TradebeIcon />
            <div className="h-6 w-px bg-gray-600"></div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Sistema de Inventario OT
              </h1>
              <div className="flex items-center space-x-1">
                <p className="text-xs text-gray-400 hidden sm:block">
                  Desarrollado por Automática Integral
                </p>
                <img 
                  src="/logos/ASABLON_LOGO_COMPACTO_TR.png" 
                  alt="Automática Integral" 
                  className="h-3 w-auto opacity-50 hidden sm:block"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center divide-x divide-gray-600">
            <div className="flex items-center space-x-2 pr-4">
              <NavTab label="Dashboard" isActive={currentView === 'dashboard'} onClick={() => onViewChange('dashboard')} />
              {currentUser.role === 'Admin' && (
                <>
                  <NavTab label="Configuración" isActive={currentView === 'settings'} onClick={() => onViewChange('settings')} />
                  <NavTab label="Usuarios" isActive={currentView === 'users'} onClick={() => onViewChange('users')} />
                </>
              )}
            </div>
            <div className="pl-4 flex items-center space-x-3">
                <div className="text-right">
                    <p className="text-sm font-medium text-white capitalize">{currentUser.name}</p>
                    <p className="text-xs text-gray-400">{currentUser.role}</p>
                </div>
                <button 
                    onClick={onLogout}
                    className="px-3 py-1.5 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600"
                    aria-label="Cerrar sesión"
                >
                    Salir
                </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;