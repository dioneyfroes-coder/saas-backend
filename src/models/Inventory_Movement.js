// models/InventoryMovement.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Inventory from './Inventories.js';
import Tenant from './Tenant.js';

const InventoryMovement = sequelize.define('InventoryMovement', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  inventoryId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: Inventory,
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
  type: {
    type: DataTypes.ENUM('entrada', 'saida', 'venda', 'ajuste'),
    allowNull: false,
    validate: {
      isIn: [['entrada', 'saida', 'venda', 'ajuste']],
    },
  },
  quantity: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  description: { 
    type: DataTypes.STRING, 
    allowNull: true,
  },
}, {
  tableName: 'inventory_movements',
  timestamps: true,
});

// Associações
InventoryMovement.belongsTo(Inventory, { foreignKey: 'inventoryId', as: 'estoque' });
InventoryMovement.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'empresa' });

export default InventoryMovement;