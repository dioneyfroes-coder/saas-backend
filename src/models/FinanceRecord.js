import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import Tenant from './Tenant.js';

const FinanceRecord = sequelize.define('FinanceRecord', {
  id: { type: DataTypes.INTEGER, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  description: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM('entrada', 'saida'), allowNull: false },
  value: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  tenantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tenant,
      key: 'id'
    }
  },
  category: {
    type: DataTypes.ENUM('Aluguel', 'Vendas', 'Marketing'),
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true, // Campo opcional
  },
  saleId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Associação opcional
    references: {
      model: 'sales',
      key: 'id',
    },
  },
});

Tenant.hasMany(FinanceRecord, { foreignKey: 'tenantId' });
FinanceRecord.belongsTo(Tenant, { foreignKey: 'tenantId' });

export default FinanceRecord;
