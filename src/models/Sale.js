import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Tenant from './Tenant.js';
import FinanceRecord from './Finance_Record.js';
import SaleItem from './Sale_Item.js';

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  status: {
    type: DataTypes.ENUM('pendente', 'pago', 'cancelado'),
    defaultValue: 'pendente',
  },
}, {
  tableName: 'sales',
  timestamps: true,
});

// Associações
Sale.belongsTo(Tenant, { foreignKey: 'tenantId' });
Sale.belongsTo(User, { foreignKey: 'userId' });
Sale.hasMany(SaleItem, { foreignKey: 'saleId', as: 'itensVenda' });
Sale.hasMany(FinanceRecord, { foreignKey: 'saleId', as: 'registrosFinanceiros' });

export default Sale;