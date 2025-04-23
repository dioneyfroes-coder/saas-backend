import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  tenantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
  tableName: 'sales',
  timestamps: true,
});

export default Sale;