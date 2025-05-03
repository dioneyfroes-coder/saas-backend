//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\validators\EmployeeSchema.ts
import Joi from 'joi';

// Schema para criar um novo funcionário
export const createEmployeeSchema = Joi.object({
  tenantId: Joi.number().required(),
  name: Joi.string().required(),
  document: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
});

// Schema para atualizar dados de um funcionário
export const updateEmployeeSchema = Joi.object({
  tenantId: Joi.number().optional(),
  name: Joi.string().optional(),
  document: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
});