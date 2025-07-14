// services/firebaseService.ts

import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { db } from '../firebase';
import { Asset, User, LookupItem } from '../types';

// Assets Service
export const assetsService = {
  // Obtener todos los assets
  async getAll(): Promise<Asset[]> {
    const querySnapshot = await getDocs(collection(db, 'assets'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Asset[];
  },

  // Escuchar cambios en tiempo real
  onSnapshot(callback: (assets: Asset[]) => void): Unsubscribe {
    return onSnapshot(collection(db, 'assets'), (snapshot) => {
      const assets = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Asset[];
      callback(assets);
    });
  },

  // Agregar un nuevo asset
  async add(asset: Omit<Asset, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'assets'), asset);
    return docRef.id;
  },

  // Actualizar un asset existente
  async update(id: string, asset: Partial<Asset>): Promise<void> {
    const assetRef = doc(db, 'assets', id);
    await updateDoc(assetRef, asset);
  },

  // Eliminar un asset
  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, 'assets', id));
  }
};

// Users Service
export const usersService = {
  // Obtener todos los usuarios
  async getAll(): Promise<User[]> {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as User[];
  },

  // Buscar usuario por nombre
  async findByName(name: string): Promise<User | null> {
    const q = query(collection(db, 'users'), where('name', '==', name));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as User;
  },

  // Agregar un nuevo usuario
  async add(user: Omit<User, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'users'), user);
    return docRef.id;
  },

  // Actualizar un usuario existente
  async update(id: string, user: Partial<User>): Promise<void> {
    const userRef = doc(db, 'users', id);
    await updateDoc(userRef, user);
  },

  // Eliminar un usuario
  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, 'users', id));
  }
};

// Lookup Data Service (para manufacturers, subcategories, zonas)
export const lookupService = {
  // Obtener datos de lookup por tipo
  async getByType(type: 'manufacturers' | 'subcategories' | 'zonas'): Promise<LookupItem[]> {
    const querySnapshot = await getDocs(collection(db, type));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as LookupItem[];
  },

  // Agregar un nuevo item de lookup
  async add(type: 'manufacturers' | 'subcategories' | 'zonas', item: Omit<LookupItem, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, type), item);
    return docRef.id;
  },

  // Eliminar un item de lookup
  async delete(type: 'manufacturers' | 'subcategories' | 'zonas', id: string): Promise<void> {
    await deleteDoc(doc(db, type, id));
  }
};

// Función helper para inicializar datos (solo ejecutar una vez)
export const initializeData = {
  // Agregar datos iniciales de assets
  async addInitialAssets(assets: Asset[]): Promise<void> {
    const batch = assets.map(asset => 
      addDoc(collection(db, 'assets'), asset)
    );
    await Promise.all(batch);
  },

  // Agregar datos iniciales de usuarios
  async addInitialUsers(users: User[]): Promise<void> {
    const batch = users.map(user => 
      addDoc(collection(db, 'users'), user)
    );
    await Promise.all(batch);
  },

  // Agregar datos iniciales de lookup
  async addInitialLookupData(
    manufacturers: LookupItem[], 
    subcategories: LookupItem[], 
    zonas: LookupItem[]
  ): Promise<void> {
    const manufacturersBatch = manufacturers.map(item => 
      addDoc(collection(db, 'manufacturers'), item)
    );
    const subcategoriesBatch = subcategories.map(item => 
      addDoc(collection(db, 'subcategories'), item)
    );
    const zonasBatch = zonas.map(item => 
      addDoc(collection(db, 'zonas'), item)
    );
    
    await Promise.all([
      ...manufacturersBatch,
      ...subcategoriesBatch,
      ...zonasBatch
    ]);
  }
}; 