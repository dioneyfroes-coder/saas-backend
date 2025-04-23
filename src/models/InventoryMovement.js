// models/InventoryMovement.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import Inventory from './Inventory.js';
import Tenant from './Tenant.js';

const InventoryMovement = sequelize.define('InventoryMovement', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  inventoryId: { type: DataTypes.INTEGER, allowNull: false },
  tenantId: { type: DataTypes.INTEGER, allowNull: false },
  type: {
    type: DataTypes.ENUM('entrada', 'saida', 'venda', 'ajuste'),
    allowNull: false,
  },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING },
}, {
  tableName: 'inventory_movements',
  timestamps: true,
});

InventoryMovement.belongsTo(Inventory, { foreignKey: 'inventoryId' });
InventoryMovement.belongsTo(Tenant, { foreignKey: 'tenantId' });

export default InventoryMovement;
