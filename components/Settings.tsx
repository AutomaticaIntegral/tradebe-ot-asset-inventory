import React from 'react';
import { LookupItem, LookupType } from '../types';
import LookupTable from './LookupTable';

interface SettingsProps {
  manufacturers: LookupItem[];
  subcategories: LookupItem[];
  zonas: LookupItem[];
  onAddItem: (type: LookupType, value: string) => void;
  onDeleteItem: (type: LookupType, id: string) => void;
}

const Settings: React.FC<SettingsProps> = ({
  manufacturers,
  subcategories,
  zonas,
  onAddItem,
  onDeleteItem
}) => {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">Gestionar Tablas de Consulta</h1>
        <p className="text-gray-400">Agregar, eliminar o editar los valores predefinidos utilizados en el formulario de creación de activos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <LookupTable
          title="Fabricantes"
          items={manufacturers}
          onAdd={(value) => onAddItem('manufacturers', value)}
          onDelete={(id) => onDeleteItem('manufacturers', id)}
        />
        <LookupTable
          title="Categorías"
          items={subcategories}
          onAdd={(value) => onAddItem('subcategories', value)}
          onDelete={(id) => onDeleteItem('subcategories', id)}
        />
        <LookupTable
          title="Áreas (Zonas)"
          items={zonas}
          onAdd={(value) => onAddItem('zonas', value)}
          onDelete={(id) => onDeleteItem('zonas', id)}
        />
      </div>
    </div>
  );
};

export default Settings;