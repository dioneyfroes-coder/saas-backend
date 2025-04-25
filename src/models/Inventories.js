// models/Inventory.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './Product.js';
import Tenant from './Tenant.js';

const Inventory = sequelize.define('Inventory', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
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
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
}, {
  tableName: 'inventories',
  timestamps: true,
});

// Associações
Inventory.belongsTo(Product, { foreignKey: 'productId', as: 'produto' });
Inventory.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'empresa' });

export default Inventory;