import React, { useState, useEffect } from 'react';
import { Asset } from '../types';

interface AssetModalProps {
  asset: Asset | null;
  onClose: () => void;
  onSave: (asset: Asset) => void;
  manufacturers: string[];
  subcategories: string[];
  zonas: string[];
}

const emptyAsset: Omit<Asset, 'id'> = {
  zona: '',
  fabricante: '',
  subcategoria: '',
  categoria: '',
  deviceType: '',
  ipAddress: '',
  subnet: '',
  gateway: '',
  macAddress: '',
  articleNumber: '',
  serialNumber: '',
  firmware: '',
  profinetName: '',
  notes: '',
  criticidad: 'Baja',
  latitude: 0,
  longitude: 0,
  slot: 0,
  hardware: 0,
};

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
  <div>
    <label htmlFor={props.id} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
    <input
      {...props}
      className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  </div>
);

const SelectField: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, children: React.ReactNode }> = ({ label, children, ...props }) => (
    <div>
      <label htmlFor={props.id} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
      <select
        {...props}
        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {children}
      </select>
    </div>
);

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <fieldset className="border-t border-gray-700 pt-4">
        <legend className="text-base font-semibold text-white -mt-7 px-2 bg-gray-800">{title}</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {children}
        </div>
    </fieldset>
);


const AssetModal: React.FC<AssetModalProps> = ({ asset, onClose, onSave, manufacturers, subcategories, zonas }) => {
  const [formData, setFormData] = useState<Asset>(asset || { id: '', ...emptyAsset });

  useEffect(() => {
    // If an asset is passed, it's for editing. Otherwise, it's a new one.
    const initialData = asset || { 
      id: '', 
      ...emptyAsset,
      zona: zonas[0] || '',
      fabricante: manufacturers[0] || '',
      subcategoria: subcategories[0] || '',
    };
    setFormData(initialData);
  }, [asset, manufacturers, subcategories, zonas]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    setFormData(prev => ({ ...prev, [name]: isNumber ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (asset === null && !formData.id) {
        alert("ID is required for a new asset.");
        return;
    }
    onSave(formData);
  };

  const MediaPreview = ({ imagePath }: { imagePath?: string }) => {
    if (!imagePath) return null;

    const webPath = '/' + imagePath.replace(/\\/g, '/');
    const isVideo = webPath.toLowerCase().endsWith('.mp4');

    return (
        <div className="lg:col-span-3">
            <h4 className="block mb-2 text-sm font-medium text-gray-300">Media Preview</h4>
            {isVideo ? (
                <video controls className="w-full max-w-sm rounded-md border border-gray-600 bg-black">
                    <source src={webPath} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img 
                    src={webPath} 
                    alt="Asset Media Preview" 
                    className="max-w-sm h-auto rounded-md border border-gray-600"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // prevent looping
                        target.src = "https://placehold.co/400x300/1f2937/9ca3af?text=Image+Not+Found";
                    }}
                />
            )}
        </div>
    );
};

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-700">
        <header className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {asset ? 'Editar Activo' : 'Agregar Nuevo Activo'}
          </h2>
        </header>
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          <FormSection title="Información General">
            <InputField label="Device ID" id="id" name="id" value={formData.id} onChange={handleChange} required disabled={!!asset}/>
            <SelectField label="Area / Zona" id="zona" name="zona" value={formData.zona} onChange={handleChange} required>
                {zonas.map(z => <option key={z} value={z}>{z}</option>)}
            </SelectField>
            <InputField label="Subarea" id="address" name="address" value={formData.address || ''} onChange={handleChange} />
            <SelectField label="Manufacturer" id="fabricante" name="fabricante" value={formData.fabricante} onChange={handleChange} required>
                {manufacturers.map(m => <option key={m} value={m}>{m}</option>)}
            </SelectField>
            <SelectField label="Category" id="subcategoria" name="subcategoria" value={formData.subcategoria} onChange={handleChange} required>
                {subcategories.map(s => <option key={s} value={s}>{s}</option>)}
            </SelectField>
            <InputField label="Subcategory Detail" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} />
            <InputField label="Device Type" id="deviceType" name="deviceType" value={formData.deviceType} onChange={handleChange} required />
            <SelectField label="Criticality" id="criticidad" name="criticidad" value={formData.criticidad} onChange={handleChange}>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Seguridad">Seguridad</option>
            </SelectField>
          </FormSection>

          <FormSection title="Detalles de Red">
            <InputField label="Dirección IP" id="ipAddress" name="ipAddress" value={formData.ipAddress} onChange={handleChange} required />
            <InputField label="Subred" id="subnet" name="subnet" value={formData.subnet} onChange={handleChange} />
            <InputField label="Puerta de Enlace" id="gateway" name="gateway" value={formData.gateway} onChange={handleChange} />
            <InputField label="Dirección MAC" id="macAddress" name="macAddress" value={formData.macAddress} onChange={handleChange} />
            <InputField label="Nombre PROFINET" id="profinetName" name="profinetName" value={formData.profinetName} onChange={handleChange} />
          </FormSection>

          <FormSection title="Hardware y Ubicación">
             <InputField label="Article Number" id="articleNumber" name="articleNumber" value={formData.articleNumber || ''} onChange={handleChange} />
             <InputField label="Serial Number" id="serialNumber" name="serialNumber" value={formData.serialNumber} onChange={handleChange} />
             <InputField label="Firmware" id="firmware" name="firmware" value={formData.firmware} onChange={handleChange} />
             <InputField label="Hardware Version" id="hardware" name="hardware" type="number" value={formData.hardware || 0} onChange={handleChange} />
             <InputField label="Slot" id="slot" name="slot" type="number" value={formData.slot || 0} onChange={handleChange} />
             <InputField label="Latitude" id="latitude" name="latitude" type="number" step="any" value={formData.latitude || 0} onChange={handleChange} />
             <InputField label="Longitude" id="longitude" name="longitude" type="number" step="any" value={formData.longitude || 0} onChange={handleChange} />
          </FormSection>

           <FormSection title="Información Adicional">
                <div className="lg:col-span-3">
                    <InputField label="Notas" id="notes" name="notes" value={formData.notes} onChange={handleChange} />
                </div>
                <div className="lg:col-span-3">
                    <InputField label="Ruta de Imagen" id="image" name="image" value={formData.image || ''} onChange={handleChange} />
                </div>
                 <div className="lg:col-span-3">
                    <InputField label="URL de Mapa" id="mapsUrl" name="mapsUrl" value={formData.mapsUrl || ''} onChange={handleChange} />
                </div>
                <MediaPreview imagePath={formData.image} />
           </FormSection>
          
        </form>
        <footer className="px-6 py-4 border-t border-gray-700 mt-auto flex justify-end gap-4 bg-gray-800">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-600 rounded-md hover:bg-gray-500">
            Cancelar
          </button>
          <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Guardar Activo
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AssetModal;