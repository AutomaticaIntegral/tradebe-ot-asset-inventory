import React, { useState, useMemo, useEffect } from 'react';
import { assetsService, usersService, lookupService } from './services/firebaseService';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import AssetTable from './components/AssetTable';
import AssetModal from './components/AssetModal';
import AssetDetailModal from './components/AssetDetailModal';
import Settings from './components/Settings';
import Login from './components/Login';
import UserManagement from './components/UserManagement';

import { FilterState, Asset, LookupItem, LookupType, User, View, Role } from './types';

function App() {
  // App State
  const [view, setView] = useState<View>('dashboard');
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Data State
  const [allAssets, setAllAssets] = useState<Asset[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [viewingAsset, setViewingAsset] = useState<Asset | null>(null);
  
  // Filter State
  const [filters, setFilters] = useState<FilterState>({});

  // Lookup Data State
  const [manufacturers, setManufacturers] = useState<LookupItem[]>([]);
  const [subcategories, setSubcategories] = useState<LookupItem[]>([]);
  const [zonas, setZonas] = useState<LookupItem[]>([]);

  useEffect(() => {
    if (currentUser?.role !== 'Admin' && (view === 'settings' || view === 'users')) {
      setView('dashboard');
    }
  }, [currentUser, view]);

  // Cargar datos desde Firebase al iniciar la aplicación
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Cargar usuarios
        const users = await usersService.getAll();
        setAllUsers(users);
        
        // Cargar assets
        const assets = await assetsService.getAll();
        setAllAssets(assets);
        
        // Cargar datos de lookup
        const [manufacturersData, subcategoriesData, zonasData] = await Promise.all([
          lookupService.getByType('manufacturers'),
          lookupService.getByType('subcategories'),
          lookupService.getByType('zonas')
        ]);
        
        setManufacturers(manufacturersData);
        setSubcategories(subcategoriesData);
        setZonas(zonasData);
        
      } catch (error) {
        console.error('Error cargando datos desde Firebase:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Auth Logic
  const handleLogin = async (name: string, password: string) => {
    try {
      const user = await usersService.findByName(name);
      if (user && user.password === password) {
        setCurrentUser(user);
        setLoginError(null);
      } else {
        setLoginError('Nombre de usuario o contraseña inválidos.');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      setLoginError('Error al conectar con el servidor.');
    }
  };
  const handleLogout = () => {
    setCurrentUser(null);
    setView('dashboard');
  };

  // Filter Logic
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[key] === value) {
        delete newFilters[key];
      } else {
        newFilters[key as keyof FilterState] = value as any;
      }
      return newFilters;
    });
  };
  
  const resetFilters = () => setFilters({});

  const filteredAssets = useMemo(() => {
    const filterKeys = Object.keys(filters);
    if (filterKeys.length === 0) return allAssets;
    return allAssets.filter(asset => {
      return filterKeys.every(key => asset[key as keyof Asset] === filters[key as keyof FilterState]);
    });
  }, [allAssets, filters]);

  // Asset CRUD Logic
  const handleOpenAssetModal = (asset: Asset | null) => {
    setEditingAsset(asset);
    setIsAssetModalOpen(true);
  };
  const handleCloseAssetModal = () => {
    setIsAssetModalOpen(false);
    setEditingAsset(null);
  };
  const handleSaveAsset = async (asset: Asset) => {
    try {
      if (editingAsset) {
        // Actualizar asset existente
        await assetsService.update(asset.id, asset);
        setAllAssets(prev => prev.map(a => a.id === asset.id ? asset : a));
      } else {
        // Crear nuevo asset
        const { id, ...assetData } = asset;
        const newId = await assetsService.add(assetData);
        setAllAssets(prev => [...prev, { ...asset, id: newId }]);
      }
      handleCloseAssetModal();
    } catch (error) {
      console.error('Error guardando asset:', error);
      alert('Error al guardar el activo. Por favor, inténtalo de nuevo.');
    }
  };
  const handleDeleteAsset = async (assetId: string) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el asset ${assetId}?`)) {
      try {
        await assetsService.delete(assetId);
        setAllAssets(prev => prev.filter(a => a.id !== assetId));
      } catch (error) {
        console.error('Error eliminando asset:', error);
        alert('Error al eliminar el activo. Por favor, inténtalo de nuevo.');
      }
    }
  };
  const handleViewAssetDetails = (asset: Asset) => {
    setViewingAsset(asset);
  };
  const handleCloseAssetDetails = () => {
    setViewingAsset(null);
  };

  // User CRUD Logic
  const handleSaveUser = async (user: User) => {
    try {
      // Validación básica
      if (!user.name?.trim()) {
        alert('El nombre de usuario es requerido.');
        return;
      }

      if (!user.password?.trim()) {
        alert('Error: La contraseña no puede estar vacía.');
        return;
      }

      // Verificar si ya existe un usuario con el mismo nombre (solo para nuevos usuarios o cambios de nombre)
      const existingUser = allUsers.find(u => u.name === user.name && u.id !== user.id);
      if (existingUser) {
        alert('Ya existe un usuario con ese nombre. Por favor, elija un nombre diferente.');
        return;
      }

      const existing = allUsers.find(u => u.id === user.id);
      if (existing) {
        // Actualizar usuario existente
        await usersService.update(user.id, user);
        setAllUsers(prev => prev.map(u => u.id === user.id ? user : u));
      } else {
        // Crear nuevo usuario
        const { id, ...userData } = user;
        const newId = await usersService.add(userData);
        setAllUsers(prev => [...prev, { ...user, id: newId }]);
      }
    } catch (error) {
      console.error('Error guardando usuario:', error);
      alert('Error al guardar el usuario. Por favor, inténtelo de nuevo.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === currentUser?.id) {
        alert("No puedes eliminarte a ti mismo.");
        return;
    }
    if (window.confirm(`¿Estás seguro de que quieres eliminar este usuario?`)) {
      try {
        await usersService.delete(userId);
        setAllUsers(prev => prev.filter(u => u.id !== userId));
      } catch (error) {
        console.error('Error eliminando usuario:', error);
        alert('Error al eliminar el usuario. Por favor, inténtalo de nuevo.');
      }
    }
  };

  // Lookup Table CRUD Logic
  const handleAddItem = async (type: LookupType, value: string) => {
    if (!value) return;
    try {
      const newItem = { value }; // Sin id para Firebase
      const newId = await lookupService.add(type, newItem);
      const itemWithId: LookupItem = { id: newId, value };
      
      const updater = { manufacturers: setManufacturers, subcategories: setSubcategories, zonas: setZonas };
      updater[type](prev => [...prev, itemWithId]);
    } catch (error) {
      console.error('Error agregando item:', error);
      alert('Error al agregar el elemento. Por favor, inténtalo de nuevo.');
    }
  };
  const handleDeleteItem = async (type: LookupType, id: string) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar este elemento?`)) {
      try {
        await lookupService.delete(type, id);
        const updater = { manufacturers: setManufacturers, subcategories: setSubcategories, zonas: setZonas };
        updater[type](prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error eliminando item:', error);
        alert('Error al eliminar el elemento. Por favor, inténtalo de nuevo.');
      }
    }
  };

  // Verificar si todos los datos necesarios están cargados
  const isDataReady = !loading && 
    allAssets.length > 0 && 
    allUsers.length > 0 && 
    manufacturers.length > 0 && 
    subcategories.length > 0 && 
    zonas.length > 0;

  if (loading || !isDataReady) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Cargando datos desde Firebase...</h2>
          <p className="text-gray-400 mt-2">
            {loading ? 'Conectando con la base de datos...' : 'Finalizando carga de datos...'}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <p>Assets: {allAssets.length}/104</p>
            <p>Usuarios: {allUsers.length}/3</p>
            <p>Fabricantes: {manufacturers.length}/6</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header currentUser={currentUser} currentView={view} onViewChange={setView} onLogout={handleLogout} />
      <main className="p-4 sm:p-6 lg:p-8">
        {view === 'dashboard' && (
          <>
            <Dashboard allAssets={allAssets} assets={filteredAssets} filters={filters} onFilterChange={handleFilterChange} onResetFilters={resetFilters} />
            <div className="mt-8">
              <AssetTable assets={filteredAssets} currentUser={currentUser} onAddNew={() => handleOpenAssetModal(null)} onEdit={handleOpenAssetModal} onDelete={handleDeleteAsset} onViewDetails={handleViewAssetDetails} />
            </div>
          </>
        )}
        {view === 'settings' && currentUser.role === 'Admin' && (
          <Settings manufacturers={manufacturers} subcategories={subcategories} zonas={zonas} onAddItem={handleAddItem} onDeleteItem={handleDeleteItem} />
        )}
        {view === 'users' && currentUser.role === 'Admin' && (
            <UserManagement users={allUsers} onSaveUser={handleSaveUser} onDeleteUser={handleDeleteUser}/>
        )}
      </main>
      {isAssetModalOpen && (
        <AssetModal 
          asset={editingAsset} 
          onClose={handleCloseAssetModal} 
          onSave={handleSaveAsset} 
          manufacturers={manufacturers.map(m => m.value)} 
          subcategories={subcategories.map(s => s.value)} 
          zonas={zonas.map(z => z.value)} 
        />
      )}
      {viewingAsset && (
        <AssetDetailModal asset={viewingAsset} onClose={handleCloseAssetDetails} />
      )}
      <Footer />
    </div>
  );
}

export default App;