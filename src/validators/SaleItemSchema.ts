//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\validators\SaleItemSchema.ts
import Joi from 'joi';

// Schema para criar um novo item de venda
export const createSaleItemSchema = Joi.object({
  saleId: Joi.number().required(),
  stockId: Joi.number().required(),
  quantity: Joi.number().positive().required(),
  price: Joi.number().positive().required(),
});

// Schema para atualizar um item de venda
export const updateSaleItemSchema = Joi.object({
  saleId: Joi.number().optional(),
  stockId: Joi.number().optional(),
  quantity: Joi.number().positive().optional(),
  price: Joi.number().positive().optional(),
});