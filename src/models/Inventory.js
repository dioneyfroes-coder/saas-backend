// models/Inventory.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import Product from './Product.js';
import Tenant from './Tenant.js';

const Inventory = sequelize.define('Inventory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  tenantId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, {
  tableName: 'inventories',
  timestamps: true,
});

Inventory.belongsTo(Product, { foreignKey: 'productId' });
Inventory.belongsTo(Tenant, { foreignKey: 'tenantId' });

export default Inventory;
