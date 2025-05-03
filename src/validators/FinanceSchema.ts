//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\validators\FinanceSchema.ts
import Joi from 'joi';

// Schema para criar um novo registro financeiro
export const createFinanceSchema = Joi.object({
  description: Joi.string().required(),
  type: Joi.string().valid('income', 'expense').required(),
  value: Joi.number().required(),
  date: Joi.date().required(),
  category: Joi.string().valid('rent', 'sales', 'marketing', 'other').required(),
  note: Joi.string().allow('').optional(),
});

// Schema para atualizar um registro financeiro
export const updateFinanceSchema = Joi.object({
  description: Joi.string().optional(),
  type: Joi.string().valid('income', 'expense').optional(),
  value: Joi.number().optional(),
  date: Joi.date().optional(),
  category: Joi.string().valid('rent', 'sales', 'marketing', 'other').optional(),
  note: Joi.string().allow('').optional(),
});