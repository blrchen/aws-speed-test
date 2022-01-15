export const DefaultRegionsKey = "currentSelectedRegions";

export class Region {
  availabilityZoneCount?: number;
  availabilityZoneStatus?: string;
  displayName: string;
  geography: string;
  latitude?: string;
  longitude?: string;
  pairedRegion?: string;
  physicalLocation?: string;
  regionalDisplayName?: string;
  regionName: string;
  storageAccountName: string;
}

export class RegionModel extends Region {
  averageLatency?: number;
  checked?: boolean;
  url?: string;
}

export class RegionGroupModel {
  geography: string;
  regions: RegionModel[];
  checked?: boolean;
}

export class HistoryModel {
  [key: string]: any[];
}

export class BlobModel {
  endpoint: string;
  accountName: string;
  containerName: string;
  blobName: string;
  sas: string;
}

export class BlobUploadSpeedModel {
  fileName: any;
  fileSize: string;
  region: string;
  thread: number;
  blockSize: number;
  uploadSpeed: string;
}
