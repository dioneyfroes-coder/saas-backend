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
    defaultValue: 'free',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ativo',
  },
}, {
  tableName: 'tenants',
  timestamps: true,
});

export default Tenant;