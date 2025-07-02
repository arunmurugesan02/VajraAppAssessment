// src/data/mockData.ts
import { Asset, Hospital, Service } from '../types';

export const hospitalData: Hospital = {
  name: 'ABC Hospital',
  branchName: 'Branch Name',
  departments: 22,
  totalAssets: 240,
  checkIns: 4,
  allAssetsInOrder: true,
  timeStamp: '00 hr : 00 m : 00 s',
};

export const assetsData: Asset[] = [
  {
    id: '1',
    name: 'Ge ECG Machine',
    department: 'Intensive Care',
    assetId: 'AG-764569812',
    services: 4,
    status: 'normal',
  },
  {
    id: '2',
    name: 'Ge ECG Machine',
    department: 'Intensive Care',
    assetId: 'AG-764569812',
    services: 10,
    status: 'attention',
  },
  {
    id: '3',
    name: 'Ge ECG Machine',
    department: 'Intensive Care',
    assetId: 'AG-764569812',
    services: 5,
    status: 'normal',
  },
  {
    id: '4',
    name: 'Ge ECG Machine',
    department: 'Intensive Care',
    assetId: 'AG-764569812',
    services: 6,
    status: 'normal',
  },
  {
    id: '5',
    name: 'Ge ECG Machine',
    department: 'Intensive Care',
    assetId: 'AG-764569812',
    services: 4,
    status: 'normal',
  },
  {
    id: '6',
    name: 'Ge ECG Machine',
    department: 'Intensive Care',
    assetId: 'AG-764569812',
    services: 4,
    status: 'normal',
  },
];

export const servicesData: Service[] = [
  {
    id: '1',
    assetId: 'AG-764569812',
    type: 'Maintenance',
    count: 1,
    status: 'attention',
  },
  {
    id: '2',
    assetId: 'AG-764569812',
    type: 'Calibration',
    count: 3,
    status: 'normal',
  },
];

export const menuItems = [
  {name: 'Scan QR Code', icon: 'qrcode-scan'},
  {name: 'Dashboard', icon: 'view-dashboard'},
  {name: 'Assets', icon: 'pulse'},
  {name: 'Incidents', icon: 'tools'},
  {name: 'Services', icon: 'cog'},
  {name: 'Requests', icon: 'message-text'},
  {name: 'Users', icon: 'account-supervisor'},
  {name: 'Report', icon: 'file-document-multiple-outline'},
  {name: 'Notifications', icon: 'message'},
  {name: 'QR Scanner', icon: 'scan-helper'},
  {name: 'Profile', icon: 'account-circle'},
];
