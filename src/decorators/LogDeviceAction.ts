import DeviceAccessLogService from '../services/DeviceAccessLogService';
import { getLocalDateAsUTC } from '../utils/getLocalDateAsUTC';

export function LogDeviceAction() {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    const originalMethod = descriptor.value!;
    descriptor.value = async function (...args: any[]) {
      const [data] = args;
      const accessedAt = getLocalDateAsUTC(); // Agora pega o horário local como UTC
      if (data && data.id) {
        await DeviceAccessLogService.createLog({
          deviceId: data.id,
          accessedAt,
          ip: data.ip || '127.0.0.1',
          userAgent: data.userAgent || 'unknown',
        });
      }
      return originalMethod.apply(this, args);
    };
  };
};