import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Tenant from './Tenant.js';

const Device = sequelize.define('Device', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tipo: {
    type: DataTypes.ENUM('estoque', 'pdv', 'admin', 'outro'),
    defaultValue: 'outro',
    validate: {
      isIn: [['estoque', 'pdv', 'admin', 'outro']],
    },
  },
  identificador: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  chaveSecreta: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  tenantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tenants',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}, {
  tableName: 'devices',
  timestamps: true,
});

// Associação com Tenant
Device.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'empresa' });

// Associação opcional com User
Device.belongsTo(User, { foreignKey: 'userId', as: 'usuarioResponsavel' });

export default Device;