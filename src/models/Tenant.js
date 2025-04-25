import sequelize from '../config/database.js';
import Sale from './Sale.js';
import Product from './Product.js';
import User from './User.js';
import Customer from './Customer.js';
import FinanceRecord from './Finance_Record.js';
import Device from './Device.js';
import Inventory from './Inventories.js';
import InventoryMovement from './Inventory_Movement.js';

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
    validate: {
      isIn: [["free", "basic", "premium"]],
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ativo',
    validate: {
      isIn: [["ativo", "inativo"]],
    },
  },
}, {
  tableName: 'tenants',
  timestamps: true,
});

// Relacionamentos
Tenant.hasMany(Sale, { foreignKey: 'tenantId' });
Tenant.hasMany(Product, { foreignKey: 'tenantId' });
Tenant.hasMany(User, { foreignKey: 'tenantId' });
Tenant.hasMany(Customer, { foreignKey: 'tenantId' });
Tenant.hasMany(FinanceRecord, { foreignKey: 'tenantId' });
Tenant.hasMany(Device, { foreignKey: 'tenantId' });
Tenant.hasMany(Inventory, { foreignKey: 'tenantId' });
Tenant.hasMany(InventoryMovement, { foreignKey: 'tenantId' });

export default Tenant;