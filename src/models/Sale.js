import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Tenant from './Tenant.js';
import User from './User.js';

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  tenantId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true, // ou false se obrigatório
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'pago', 'cancelado'),
    defaultValue: 'pendente',
  },
}, {
  timestamps: true,
});

Sale.belongsTo(Tenant, { foreignKey: 'tenantId' });
Sale.belongsTo(User, { foreignKey: 'userId' });

export default Sale;
