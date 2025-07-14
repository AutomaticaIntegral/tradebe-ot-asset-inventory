

import React, { useState, useMemo } from 'react';
import { Asset, SortConfig, User } from '../types';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface AssetTableProps {
  assets: Asset[];
  currentUser: User;
  onAddNew: () => void;
  onEdit: (asset: Asset) => void;
  onDelete: (assetId: string) => void;
  onViewDetails: (asset: Asset) => void;
}

const SortIcon = ({ direction }: { direction: 'ascending' | 'descending' | 'none' }) => {
    if (direction === 'none') return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-30"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>;
    if (direction === 'ascending') return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>;
    return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
}

const CriticidadBadge: React.FC<{ criticidad: Asset['criticidad'] }> = ({ criticidad }) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    const colorClasses = {
        'Alta': "bg-red-500/20 text-red-300",
        'Seguridad': "bg-red-700/30 text-red-200",
        'Media': "bg-yellow-500/20 text-yellow-300",
        'Baja': "bg-green-500/20 text-green-300",
    };
    return <span className={`${baseClasses} ${colorClasses[criticidad] || 'bg-gray-500/20 text-gray-300'}`}>{criticidad || 'N/A'}</span>;
};

const ViewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;
const ExcelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m16 13-4 4-4-4"/><path d="m12 17 4-4"/></svg>;
const PdfIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13v-1h6v1"/><path d="M12 12v6"/><path d="M11 18h2"/></svg>;

const AssetTable: React.FC<AssetTableProps> = ({ assets, currentUser, onAddNew, onEdit, onDelete, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const canManageAssets = currentUser.role === 'Admin' || currentUser.role === 'Supervisor';

  const sortedAssets = useMemo(() => {
    let sortableAssets = [...assets];
    if (sortConfig !== null) {
      sortableAssets.sort((a, b) => {
        const valA = a[sortConfig.key] || '';
        const valB = b[sortConfig.key] || '';
        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableAssets;
  }, [assets, sortConfig]);

  const filteredAssets = useMemo(() => {
    return sortedAssets.filter(asset =>
      Object.values(asset).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedAssets, searchTerm]);

  const requestSort = (key: keyof Asset) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortDirection = (key: keyof Asset) => {
      if (!sortConfig || sortConfig.key !== key) return 'none';
      return sortConfig.direction;
  }

  const handleExportExcel = () => {
    const dataToExport = filteredAssets.map(asset => ({
        'ID': asset.id,
        'Area': asset.zona,
        'Subarea': asset.address || '',
        'Manufacturer': asset.fabricante,
        'Category': asset.subcategoria,
        'Subcategory Detail': asset.categoria,
        'Device Type': asset.deviceType,
        'IP Address': asset.ipAddress,
        'Subnet': asset.subnet || '',
        'Gateway': asset.gateway,
        'MAC Address': asset.macAddress,
        'Slot': asset.slot,
        'Article Number': asset.articleNumber || '',
        'Serial Number': asset.serialNumber,
        'Firmware': asset.firmware,
        'Hardware': asset.hardware,
        'PROFINET Name': asset.profinetName || '',
        'PROFINET Converted Name': asset.profinetConvertedName || '',
        'Criticality': asset.criticidad,
        'Notes': asset.notes,
        'Image Path': asset.image || '',
        'Map URL': asset.mapsUrl || '',
        'Latitude': asset.latitude,
        'Longitude': asset.longitude,
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Assets');
    XLSX.writeFile(workbook, 'AssetInventory_Full.xlsx');
  };

  const handleExportPdf = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    
    const tableHead = [[
        'ID', 'Area', 'Category', 'Device Type', 'IP Address', 'MAC Address', 'Article Number', 'Criticality'
    ]];
    
    const tableBody = filteredAssets.map(asset => [
        asset.id,
        asset.zona,
        asset.subcategoria,
        asset.deviceType,
        asset.ipAddress || 'N/A',
        asset.macAddress || 'N/A',
        asset.articleNumber || 'N/A',
        asset.criticidad
    ]);

    (doc as any).autoTable({
        head: tableHead,
        body: tableBody,
        startY: 20,
        theme: 'grid',
        styles: { font: 'helvetica', fontSize: 7, cellPadding: 1.5, overflow: 'linebreak' },
        headStyles: { fillColor: [31, 41, 55], textColor: [243, 246, 246], fontSize: 7 },
        columnStyles: {
            0: { cellWidth: 35 }, // ID
            3: { cellWidth: 35 }, // Device Type
            5: { cellWidth: 32 }, // MAC
            6: { cellWidth: 35 }, // Article
        }
    });

    doc.text('Asset Inventory Report', 14, 15);
    doc.save('AssetInventory_Full.pdf');
  };

  const headers: { key: keyof Asset, label: string, className?: string }[] = [
    { key: 'id', label: 'ID', className: 'w-1/12' },
    { key: 'zona', label: 'Area', className: 'w-1/12' },
    { key: 'subcategoria', label: 'Category', className: 'w-1/12' },
    { key: 'fabricante', label: 'Manufacturer', className: 'w-2/12' },
    { key: 'deviceType', label: 'Device Type', className: 'w-2/12' },
    { key: 'articleNumber', label: 'Article Number', className: 'w-2/12' },
    { key: 'ipAddress', label: 'IP Address', className: 'w-1/12' },
    { key: 'criticidad', label: 'Criticality', className: 'w-1/12' },
  ];

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Inventario Completo de Activos</h2>
        <div className="flex flex-wrap items-center gap-2">
             <input
              type="text"
              placeholder="Buscar activos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-48 p-2.5"
            />
            <button onClick={handleExportExcel} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600">
                <ExcelIcon/>
                Excel
            </button>
            <button onClick={handleExportPdf} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600">
                <PdfIcon/>
                PDF
            </button>
            {canManageAssets && (
              <button
                  onClick={onAddNew}
                  className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 whitespace-nowrap"
              >
                  Agregar Activo
              </button>
            )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400 table-fixed">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
            <tr>
              {headers.map(({ key, label, className }) => (
                <th key={key} scope="col" className={`px-6 py-3 ${className}`}>
                  <button onClick={() => requestSort(key)} className="flex items-center space-x-1 hover:text-white">
                      <span>{label}</span>
                      <SortIcon direction={getSortDirection(key)} />
                  </button>
                </th>
              ))}
              <th scope="col" className="px-6 py-3 text-center w-24">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
                <td className="px-6 py-4 font-medium text-white truncate">{asset.id}</td>
                <td className="px-6 py-4 truncate">{asset.zona}</td>
                <td className="px-6 py-4 truncate">{asset.subcategoria}</td>
                <td className="px-6 py-4 truncate">{asset.fabricante}</td>
                <td className="px-6 py-4 truncate">{asset.deviceType}</td>
                <td className="px-6 py-4 truncate">{asset.articleNumber}</td>
                <td className="px-6 py-4 font-mono truncate">{asset.ipAddress}</td>
                <td className="px-6 py-4"><CriticidadBadge criticidad={asset.criticidad} /></td>
                <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center space-x-4">
                        <button onClick={() => onViewDetails(asset)} className="text-gray-400 hover:text-blue-300" aria-label={`View ${asset.id}`}>
                            <ViewIcon />
                        </button>
                    {canManageAssets && (
                        <>
                        <button onClick={() => onEdit(asset)} className="text-blue-400 hover:text-blue-300" aria-label={`Edit ${asset.id}`}>
                            <EditIcon />
                        </button>
                        <button onClick={() => onDelete(asset.id)} className="text-red-400 hover:text-red-300" aria-label={`Delete ${asset.id}`}>
                            <DeleteIcon />
                        </button>
                        </>
                    )}
                    </div>
                </td>
              </tr>
            ))}
             {filteredAssets.length === 0 && (
                <tr>
                    <td colSpan={headers.length + 1} className="text-center py-8 text-gray-500">
                        No assets found matching your criteria.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetTable;