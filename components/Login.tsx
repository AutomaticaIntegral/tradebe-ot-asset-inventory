import React, { useState } from 'react';

interface LoginProps {
  onLogin: (name: string, password: string) => void;
  error: string | null;
}

const TradebeLoginIcon = () => (
  <div className="mb-6">
    <img 
      src="/logos/LogoTradebe.png" 
      alt="Tradebe" 
      className="h-16 w-auto mx-auto mb-2" 
    />
  </div>
);

const Login: React.FC<LoginProps> = ({ onLogin, error }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name, password);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-sm mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 text-center">
        <TradebeLoginIcon />
        <h1 className="text-2xl font-bold mb-2">Sistema de Inventario OT</h1>
        <p className="text-gray-400 mb-2">Tradebe</p>
        <p className="text-xs text-gray-500 mb-6">Inicie sesión para continuar</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="sr-only">Usuario</label>
            <input
              id="username"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Usuario"
              required
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label htmlFor="password-input" className="sr-only">Contraseña</label>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-400 px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200"
          >
            Iniciar Sesión
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-center space-x-2">
            <p className="text-xs text-gray-500">
              Desarrollado por <span className="text-gray-400 font-medium">Automática Integral</span>
            </p>
            <img 
              src="/logos/ASABLON_LOGO_COMPACTO_TR.png" 
              alt="Automática Integral" 
              className="h-4 w-auto opacity-60"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;