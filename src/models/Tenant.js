import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tenant = sequelize.define('Tenant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plano: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'free', // ou 'pro', 'enterprise', etc.
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ativo', // ou 'suspenso', 'inativo'
  },
}, {
  tableName: 'tenants',
  timestamps: true,
});

export default Tenant;
