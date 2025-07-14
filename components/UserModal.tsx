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

  useEffect(() => {
    setFormData(user || { id: '', ...emptyUser });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.password) {
      alert('Username and password are required.');
      return;
    }
    onSave(formData);
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
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder={user ? 'Leave blank to keep current' : ''}
              className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-300">Rol</label>
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
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-600 rounded-md hover:bg-gray-500">
            Cancelar
          </button>
          <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Guardar Usuario
          </button>
        </footer>
      </div>
    </div>
  );
};

export default UserModal;