import React from 'react';
import { Asset, User, LookupItem } from '../types';

interface DebugInfoProps {
  assets: Asset[];
  users: User[];
  manufacturers: LookupItem[];
  subcategories: LookupItem[];
  zonas: LookupItem[];
}

const DebugInfo: React.FC<DebugInfoProps> = ({ assets, users, manufacturers, subcategories, zonas }) => {
  const sampleAsset = assets[0];
  
  return (
    <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg mt-4">
      <h3 className="text-red-300 font-bold mb-2">🐛 DEBUG INFO (TEMPORAL)</h3>
      <div className="text-xs text-gray-300 space-y-2">
        <p><strong>Assets Count:</strong> {assets.length}</p>
        <p><strong>Users Count:</strong> {users.length}</p>
        <p><strong>Manufacturers Count:</strong> {manufacturers.length}</p>
        
        {sampleAsset && (
          <div className="bg-gray-800 p-2 rounded">
            <p><strong>Sample Asset:</strong></p>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(sampleAsset, null, 2)}
            </pre>
          </div>
        )}
        
        {manufacturers.length > 0 && (
          <div className="bg-gray-800 p-2 rounded">
            <p><strong>Sample Manufacturer:</strong></p>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(manufacturers[0], null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugInfo; 