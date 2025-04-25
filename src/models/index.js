'use strict';

import sequelize from '../config/database.js';
import Tenant from './Tenant.js';
import Sale from './Sale.js';
import SaleItem from './SaleItem.js';
import Product from './Product.js';
import Inventory from './Inventory.js';
import InventoryMovement from './InventoryMovement.js';
import Device from './Device.js';
import DeviceAccessLog from './DeviceAccessLog.js';
import FinanceRecord from './FinanceRecord.js';
import Customer from './Customer.js';
import User from './User.js';

const db = {};

// Adiciona os modelos ao objeto db
db.Tenant = Tenant;
db.Sale = Sale;
db.SaleItem = SaleItem;
db.Product = Product;
db.Inventory = Inventory;
db.InventoryMovement = InventoryMovement;
db.Device = Device;
db.DeviceAccessLog = DeviceAccessLog;
db.FinanceRecord = FinanceRecord;
db.Customer = Customer;
db.User = User;

// Configura associações entre os modelos

// Tenant
Tenant.hasMany(Sale, { foreignKey: 'tenantId' });
Tenant.hasMany(Product, { foreignKey: 'tenantId' });
Tenant.hasMany(User, { foreignKey: 'tenantId' });
Tenant.hasMany(Customer, { foreignKey: 'tenantId' });
Tenant.hasMany(FinanceRecord, { foreignKey: 'tenantId' });
Tenant.hasMany(Device, { foreignKey: 'tenantId' });
Tenant.hasMany(Inventory, { foreignKey: 'tenantId' });
Tenant.hasMany(InventoryMovement, { foreignKey: 'tenantId' });
Tenant.hasMany(DeviceAccessLog, { foreignKey: 'tenantId' });

// Sale
Sale.belongsTo(Tenant, { foreignKey: 'tenantId' });
Sale.belongsTo(User, { foreignKey: 'userId' });
Sale.hasMany(SaleItem, { foreignKey: 'saleId' });

// SaleItem
SaleItem.belongsTo(Sale, { foreignKey: 'saleId' });
SaleItem.belongsTo(Product, { foreignKey: 'productId' });
SaleItem.belongsTo(Tenant, { foreignKey: 'tenantId' });

// Product
Product.belongsTo(Tenant, { foreignKey: 'tenantId' });
Product.hasMany(Inventory, { foreignKey: 'productId' });

// Inventory
Inventory.belongsTo(Product, { foreignKey: 'productId' });
Inventory.belongsTo(Tenant, { foreignKey: 'tenantId' });
Inventory.hasMany(InventoryMovement, { foreignKey: 'inventoryId' });

// InventoryMovement
InventoryMovement.belongsTo(Inventory, { foreignKey: 'inventoryId' });
InventoryMovement.belongsTo(Tenant, { foreignKey: 'tenantId' });

// Device
Device.belongsTo(Tenant, { foreignKey: 'tenantId' });
Device.hasMany(DeviceAccessLog, { foreignKey: 'deviceId' });

// DeviceAccessLog
DeviceAccessLog.belongsTo(Device, { foreignKey: 'deviceId' });
DeviceAccessLog.belongsTo(Tenant, { foreignKey: 'tenantId' });

// FinanceRecord
FinanceRecord.belongsTo(Tenant, { foreignKey: 'tenantId' });
FinanceRecord.belongsTo(Sale, { foreignKey: 'saleId', allowNull: true });

// Customer
Customer.belongsTo(Tenant, { foreignKey: 'tenantId' });

// User
User.belongsTo(Tenant, { foreignKey: 'tenantId' });
User.hasMany(Sale, { foreignKey: 'userId' });

// Exporta os modelos e a instância do Sequelize
db.sequelize = sequelize;

export default db;