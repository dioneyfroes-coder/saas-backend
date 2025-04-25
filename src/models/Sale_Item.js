import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Sale from './Sale.js';
import Product from './Product.js';
import Tenant from './Tenant.js';

const SaleItem = sequelize.define('SaleItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  saleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Sale,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
}, {
  tableName: 'sale_items',
  timestamps: false,
});

// Associações
SaleItem.belongsTo(Sale, { foreignKey: 'saleId', as: 'venda' });
SaleItem.belongsTo(Product, { foreignKey: 'productId', as: 'produto' });
SaleItem.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'empresa' });

export default SaleItem;