import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Tenant from './Tenant.js';
import Sale from './Sale.js';

const FinanceRecord = sequelize.define('FinanceRecord', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  description: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  type: { 
    type: DataTypes.ENUM('entrada', 'saida'), 
    allowNull: false,
    validate: {
      isIn: [['entrada', 'saida']],
    },
  },
  value: { 
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0,
    },
  },
  date: { 
    type: DataTypes.DATEONLY, 
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  tenantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tenant,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  category: {
    type: DataTypes.ENUM('Aluguel', 'Vendas', 'Marketing'),
    allowNull: false,
    validate: {
      isIn: [['Aluguel', 'Vendas', 'Marketing']],
    },
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  saleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Sale,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}, {
  tableName: 'finance_records',
  timestamps: true,
});

// Associação com Tenant
Tenant.hasMany(FinanceRecord, { foreignKey: 'tenantId' });
FinanceRecord.belongsTo(Tenant, { foreignKey: 'tenantId' });

// Associação com Sale
FinanceRecord.belongsTo(Sale, { foreignKey: 'saleId', as: 'venda' });

export default FinanceRecord;