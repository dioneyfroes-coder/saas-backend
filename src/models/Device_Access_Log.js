import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Device from './Device.js';
import Tenant from './Tenant.js';

const DeviceAccessLog = sequelize.define('DeviceAccessLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  deviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Device,
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
  accessedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIP: true,
    },
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'device_access_logs',
  timestamps: false,
});

DeviceAccessLog.belongsTo(Device, { foreignKey: 'deviceId' });
Device.hasMany(DeviceAccessLog, { foreignKey: 'deviceId' });

DeviceAccessLog.belongsTo(Tenant, { foreignKey: 'tenantId' });
Tenant.hasMany(DeviceAccessLog, { foreignKey: 'tenantId' });

export default DeviceAccessLog;