import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Tenant from './Tenant.js';

const Customer = sequelize.define('Customer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tenantId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  document: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
}, {
  tableName: 'customers',
  timestamps: true,
});

Customer.belongsTo(Tenant, { foreignKey: 'tenantId' });

export default Customer;
