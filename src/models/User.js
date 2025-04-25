import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Tenant from './Tenant.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  nomeCompleto: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'estoquista', 'caixa'),
    allowNull: false,
    validate: {
      isIn: [['admin', 'estoquista', 'caixa']],
    },
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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
}, {
  timestamps: true,
  tableName: 'users',
});

// Associação com Tenant
User.belongsTo(Tenant, { foreignKey: 'tenantId' });

export default User;