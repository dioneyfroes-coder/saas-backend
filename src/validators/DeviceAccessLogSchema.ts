//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\validators\DeviceAccessLogSchema.ts
import Joi from 'joi';

// Schema para criar um novo DeviceAccessLog
export const createDeviceAccessLogSchema = Joi.object({
  deviceId: Joi.number().required(),
  accessedAt: Joi.date().required(),
  ip: Joi.string().allow(null, ''),
  userAgent: Joi.string().allow(null, ''),
});