//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\validators\StockSchema.ts
import Joi from 'joi';

// Schema para criar um novo item de estoque
export const createStockSchema = Joi.object({
  // "id" é gerado automaticamente, não precisa no body
  barcode: Joi.string().allow(null, ''), // Campo opcional
  name: Joi.string().required(),         // Campo obrigatório
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  description: Joi.string().optional(),
});

// Schema para atualizar um item de estoque
export const updateStockSchema = Joi.object({
  barcode: Joi.string().allow(null, ''),
  name: Joi.string().optional(),
  quantity: Joi.number().optional(),
  price: Joi.number().optional(),
  description: Joi.string().optional(),
});