//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\types\DeviceAccessLogType.ts
export interface DeviceAccessLogType {
  id: number;
  deviceId: number;        // Em vez de number | null (no schema está como Int obrigatório)
  accessedAt: Date;
  ip?: string;
  userAgent?: string;
  // Removido tenantId e mensagem, pois não existem no schema device_access_logs
}