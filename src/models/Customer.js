import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Tenant from './Tenant.js';

const Customer = sequelize.define('Customer', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
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
  name: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  document: { 
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [11, 14], // CPF ou CNPJ
    },
  },
  email: { 
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  phone: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'customers',
  timestamps: true,
});

Customer.belongsTo(Tenant, { foreignKey: 'tenantId' });

export default Customer;