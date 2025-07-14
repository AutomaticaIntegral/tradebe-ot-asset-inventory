import React, { useState, useEffect } from 'react';
import { User, Role } from '../types';

interface UserModalProps {
  user: User | null;
  onSave: (user: User) => void;
  onClose: () => void;
}

const emptyUser: Omit<User, 'id'> = {
  name: '',
  password: '',
  role: 'Operator',
};

const UserModal: React.FC<UserModalProps> = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState<User>(user || { id: '', ...emptyUser });
  const [originalPassword, setOriginalPassword] = useState<string>('');

  useEffect(() => {
    if (user) {
      setFormData(user);
      setOriginalPassword(user.password || '');
    } else {
      setFormData({ id: '', ...emptyUser });
      setOriginalPassword('');
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar nombre de usuario
    if (!formData.name.trim()) {
      alert('El nombre de usuario es requerido.');
      return;
    }

    // Validar contraseña
    if (!user && !formData.password?.trim()) {
      // Nuevo usuario: contraseña es requerida
      alert('La contraseña es requerida para nuevos usuarios.');
      return;
    }

    // Preparar datos para guardar
    const userToSave: User = {
      ...formData,
      name: formData.name.trim(),
      // Si es edición y la contraseña está vacía, mantener la original
      password: user && !formData.password?.trim() ? originalPassword : (formData.password || '')
    };

    onSave(userToSave);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-md flex flex-col border border-gray-700">
        <header className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {user ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
          </h2>
        </header>
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
              Nombre de Usuario
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Ingrese el nombre de usuario"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password || ''}
              onChange={handleChange}
              required={!user} // Solo requerida para nuevos usuarios
              className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={user ? 'Dejar en blanco para mantener actual' : 'Ingrese la contraseña'}
            />
            {user && (
              <p className="mt-1 text-xs text-gray-400">
                Deje en blanco para mantener la contraseña actual
              </p>
            )}
          </div>
          <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-300">
              Rol
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="Operator">Operador</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Admin">Administrador</option>
            </select>
          </div>
        </form>
        <footer className="px-6 py-4 border-t border-gray-700 mt-auto flex justify-end gap-4">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-600 rounded-md hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            onClick={handleSubmit} 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {user ? 'Actualizar Usuario' : 'Crear Usuario'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default UserModal;