import React, { useMemo } from 'react';
import { Asset, FilterState } from '../types';
import AssetCategoryChart from './charts/AssetCategoryChart';
import AssetsByAreaChart from './charts/AssetsByAreaChart';
import AssetCriticalityChart from './charts/AssetCriticalityChart';
import AssetManufacturerChart from './charts/AssetManufacturerChart';
import StatCard from './StatCard';

interface DashboardProps {
  allAssets: Asset[];
  assets: Asset[];
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
}

const TotalAssetsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>);
const CategoriesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.57 8.57A2 2 0 1 1 7 15l9.19-9.19"/></svg>);
const AreasIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>);
const ManufacturersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);

const FilterBadges: React.FC<Pick<DashboardProps, 'filters' | 'onFilterChange' | 'onResetFilters'>> = ({ filters, onFilterChange, onResetFilters }) => {
    const activeFilters = Object.entries(filters);
    if (activeFilters.length === 0) return null;

    return (
        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-gray-300">Filtros Activos:</span>
            {activeFilters.map(([key, value]) => (
                <span key={key} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                    <span className="capitalize">{key}:</span><strong className="ml-1">{value}</strong>
                    <button onClick={() => onFilterChange(key as keyof FilterState, value)} className="ml-2 text-blue-200 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </span>
            ))}
            <button 
                onClick={onResetFilters}
                className="text-sm text-gray-400 hover:text-white hover:underline ml-auto"
            >
                Limpiar Filtros
            </button>
        </div>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ allAssets, assets, filters, onFilterChange, onResetFilters }) => {
  const stats = useMemo(() => {
    const categories = new Set(assets.map(a => a.subcategoria));
    const areas = new Set(assets.map(a => a.zona));
    const manufacturers = new Set(assets.map(a => a.fabricante));
    return {
      total: assets.length,
      categoryCount: categories.size,
      areaCount: areas.size,
      manufacturerCount: manufacturers.size,
    };
  }, [assets]);

  const chartData = useMemo(() => {
    const aggregate = (key: keyof Asset) => allAssets.reduce((acc: Record<string, number>, asset) => {
      const value = asset[key] as string || 'N/A';
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    const format = (data: Record<string, number>) => Object.entries(data).map(([name, value]) => ({ name, value }));

    return {
        category: format(aggregate('subcategoria')).sort((a,b) => b.value - a.value),
        area: format(aggregate('zona')).sort((a,b) => b.value - a.value),
        criticality: format(aggregate('criticidad')).sort((a,b) => b.value - a.value),
        manufacturer: format(aggregate('fabricante')).sort((a,b) => b.value - a.value).slice(0, 10), // Top 10
    }
  }, [allAssets]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Activos Visibles" value={stats.total} icon={<TotalAssetsIcon />} colorClass="bg-blue-500/20 text-blue-300" />
        <StatCard title="Categorías Visibles" value={stats.categoryCount} icon={<CategoriesIcon />} colorClass="bg-green-500/20 text-green-300" />
        <StatCard title="Áreas Visibles" value={stats.areaCount} icon={<AreasIcon />} colorClass="bg-yellow-500/20 text-yellow-300" />
        <StatCard title="Fabricantes Visibles" value={stats.manufacturerCount} icon={<ManufacturersIcon />} colorClass="bg-purple-500/20 text-purple-300" />
      </div>
      
      <FilterBadges filters={filters} onFilterChange={onFilterChange} onResetFilters={onResetFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 min-h-[400px]">
            <h2 className="text-xl font-bold text-white mb-4">Activos por Categoría</h2>
            <AssetCategoryChart data={chartData.category} onFilterChange={onFilterChange} activeFilter={filters.subcategoria}/>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 min-h-[400px]">
            <h2 className="text-xl font-bold text-white mb-4">Activos por Criticidad</h2>
            <AssetCriticalityChart data={chartData.criticality} onFilterChange={onFilterChange} activeFilter={filters.criticidad} />
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 min-h-[400px]">
            <h2 className="text-xl font-bold text-white mb-4">Activos por Área</h2>
            <AssetsByAreaChart data={chartData.area} onFilterChange={onFilterChange} activeFilter={filters.zona}/>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 min-h-[400px]">
            <h2 className="text-xl font-bold text-white mb-4">Top 10 Fabricantes</h2>
            <AssetManufacturerChart data={chartData.manufacturer} onFilterChange={onFilterChange} activeFilter={filters.fabricante}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
