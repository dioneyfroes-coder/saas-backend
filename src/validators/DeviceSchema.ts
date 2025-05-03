//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\validators\DeviceSchema.ts
import Joi from 'joi';

export const createDeviceSchema = Joi.object({
  nome: Joi.string().required(),
  tipo: Joi.string()
    .valid(
      'estoque',
      'pdv',
      'admin',
      'financeiro',
      'rh',
      'totem',
      'terminal_preco',
      'pc_financeiro',
      'pc_rh',
      'pc_gerencia',
      'pc_atendimento',
      'outro'
    )
    .required(),
  identificador: Joi.string().required(),
  chaveSecreta: Joi.string().allow(null, ''),
  ativo: Joi.boolean().required(),
  employeesId: Joi.number().optional(),
});

export const updateDeviceSchema = Joi.object({
  nome: Joi.string().optional(),
  tipo: Joi.string().valid(
    'estoque',
    'pdv',
    'admin',
    'financeiro',
    'rh',
    'totem',
    'terminal_preco',
    'pc_financeiro',
    'pc_rh',
    'pc_gerencia',
    'pc_atendimento',
    'outro'
  ),
  identificador: Joi.string().optional(),
  chaveSecreta: Joi.string().allow(null, ''),
  ativo: Joi.boolean().optional(),
  employeesId: Joi.number().optional(),
});