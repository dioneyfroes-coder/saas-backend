export interface DeviceAccessLogType {
    id: number;
    deviceId: number | null;
    tenantId: number;
    accessedAt: Date;
    ip?: string;
    userAgent?: string;
    mensagem?: string;
  }
  