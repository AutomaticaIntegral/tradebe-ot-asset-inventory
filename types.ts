export interface Asset {
  id: string;
  zona: string;
  address?: string;
  fabricante: string;
  subcategoria: string;
  categoria: string;
  deviceType: string;
  ipAddress: string;
  subnet?: string;
  gateway: string;
  macAddress: string;
  slot?: number;
  articleNumber?: string;
  serialNumber: string;
  firmware: string;
  hardware?: number;
  profinetName?: string;
  profinetConvertedName?: string;
  notes: string;
  image?: string;
  mapsUrl?: string;
  latitude?: number;
  longitude?: number;
  criticidad: 'Alta' | 'Media' | 'Baja' | 'Seguridad';
}

export type SortConfig = {
  key: keyof Asset;
  direction: 'ascending' | 'descending';
} | null;

export type FilterState = Partial<Pick<Asset, 'zona' | 'subcategoria' | 'fabricante' | 'criticidad'>>;

export interface LookupItem {
    id: string;
    value: string;
}

export type LookupType = 'manufacturers' | 'subcategories' | 'zonas';

export type Role = 'Admin' | 'Supervisor' | 'Operator';

export interface User {
  id: string;
  name: string;
  password?: string; // Optional for safety in transit, but required for auth
  role: Role;
}

export type View = 'dashboard' | 'settings' | 'users';