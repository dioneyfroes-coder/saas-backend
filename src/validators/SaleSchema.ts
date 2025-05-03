//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\validators\SaleSchema.ts
import Joi from 'joi';

export const createSaleSchema = Joi.object({
  // employeesId pode vir do token (authMiddleware) ou corpo, conforme sua lógica
  // se vier do corpo, mantenha-o opcional
  employeesId: Joi.number().optional(),

  // Campo obrigatório
  total: Joi.number().positive().required(),

  // Status inicial pode ser "pendente", "pago" ou "cancelado".
  // Definimos como opcional e default para "pendente"
  status: Joi.string().valid('pendente', 'pago', 'cancelado').optional().default('pendente'),

  // "id", "createdAt" e "updatedAt" são controlados pelo banco
});