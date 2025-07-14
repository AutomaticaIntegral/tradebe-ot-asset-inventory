import React from 'react';
import { Asset } from '../types';

interface AssetDetailModalProps {
  asset: Asset;
  onClose: () => void;
}

const DetailItem: React.FC<{ label: string; value?: string | number | null }> = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 font-medium">{label}</p>
    <p className="text-base text-white break-words">{value || 'N/A'}</p>
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

const MediaPreview: React.FC<{ imagePath?: string }> = ({ imagePath }) => {
    if (!imagePath) return null;

    const webPath = '/' + imagePath.replace(/\\/g, '/');
    const isVideo = webPath.toLowerCase().endsWith('.mp4');

    return (
        <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Media Preview</h4>
            {isVideo ? (
                <video controls className="max-w-full rounded-md border border-gray-600">
                    <source src={webPath} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img 
                    src={webPath} 
                    alt="Asset Media" 
                    className="max-w-full h-auto rounded-md border border-gray-600" 
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // prevent looping
                        target.src = "https://placehold.co/600x400/1f2937/9ca3af?text=Image+Not+Found";
                    }}
                />
            )}
        </div>
    );
};


const AssetDetailModal: React.FC<AssetDetailModalProps> = ({ asset, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-700">
        <header className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            Detalles del Activo: <span className="text-blue-400">{asset.id}</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </header>
        <div className="p-6 space-y-6 overflow-y-auto">
            <FormSection title="Información General">
                <DetailItem label="ID del Dispositivo" value={asset.id} />
                <DetailItem label="Área / Zona" value={asset.zona} />
                <DetailItem label="Subárea" value={asset.address} />
                <DetailItem label="Fabricante" value={asset.fabricante} />
                <DetailItem label="Categoría" value={asset.subcategoria} />
                <DetailItem label="Detalle de Subcategoría" value={asset.categoria} />
                <DetailItem label="Tipo de Dispositivo" value={asset.deviceType} />
                <DetailItem label="Criticidad" value={asset.criticidad} />
            </FormSection>
             <FormSection title="Detalles de Red">
                <DetailItem label="Dirección IP" value={asset.ipAddress} />
                <DetailItem label="Subred" value={asset.subnet} />
                <DetailItem label="Puerta de Enlace" value={asset.gateway} />
                <DetailItem label="Dirección MAC" value={asset.macAddress} />
                <DetailItem label="Nombre PROFINET" value={asset.profinetName} />
            </FormSection>
             <FormSection title="Hardware y Ubicación">
                <DetailItem label="Número de Artículo" value={asset.articleNumber} />
                <DetailItem label="Número de Serie" value={asset.serialNumber} />
                <DetailItem label="Firmware" value={asset.firmware} />
                <DetailItem label="Versión de Hardware" value={asset.hardware} />
                <DetailItem label="Slot" value={asset.slot} />
                <div className="lg:col-span-3">
                    <p className="text-xs text-gray-400 font-medium">Notas</p>
                    <p className="text-base text-white bg-gray-900/50 p-2 rounded-md mt-1">{asset.notes || 'N/A'}</p>
                </div>
            </FormSection>
            
            <FormSection title="Ubicación y Medios">
                 <DetailItem label="Latitud" value={asset.latitude} />
                 <DetailItem label="Longitud" value={asset.longitude} />
                 {asset.latitude && asset.longitude && (
                     <div>
                        <p className="text-xs text-gray-400 font-medium">Enlace de Mapa</p>
                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${asset.latitude},${asset.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Ver en Google Maps
                        </a>
                     </div>
                 )}
                 <div className="lg:col-span-3">
                    <MediaPreview imagePath={asset.image} />
                 </div>
            </FormSection>

        </div>
        <footer className="px-6 py-3 border-t border-gray-700 mt-auto flex justify-end bg-gray-800">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Cerrar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AssetDetailModal;