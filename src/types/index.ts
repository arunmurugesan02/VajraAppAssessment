// src/types/index.ts
export interface Asset {
  id: string;
  name: string;
  department: string;
  assetId: string;
  services: number;
  status: 'normal' | 'attention' | 'critical';
}

export interface Hospital {
  name: string;
  branchName: string;
  departments: number;
  totalAssets: number;
  checkIns: number;
  allAssetsInOrder: boolean;
  timeStamp: string;
}

export interface Service {
  id: string;
  assetId: string;
  type: string;
  count: number;
  status: 'normal' | 'attention';
}

export interface TabItem {
  name: string;
  icon: string;
  component: React.ComponentType<any>;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export interface AssetCardProps {
  asset: Asset;
  onPress?: () => void;
}
