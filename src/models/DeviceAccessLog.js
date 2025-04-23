import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
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
      model: 'devices',
      key: 'id',
    },
  },
  tenantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tenants',
      key: 'id',
    },
  },
  accessedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

DeviceAccessLog.belongsTo(Device, { foreignKey: 'deviceId' });
Device.hasMany(DeviceAccessLog, { foreignKey: 'deviceId' });

DeviceAccessLog.belongsTo(Tenant, { foreignKey: 'tenantId' });
Tenant.hasMany(DeviceAccessLog, { foreignKey: 'tenantId' });

export default DeviceAccessLog;
