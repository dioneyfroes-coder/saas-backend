import User from '../models/User.js';

class UserRepository {
  async findAll(tenantId) {
    return await User.findAll({ where: { tenantId } });
  }

  async findById(id, tenantId) {
    return await User.findOne({ where: { id, tenantId } });
  }

  async findByUsername(username, tenantId) {
    return await User.findOne({ where: { username, tenantId } });
  }

  async create(data) {
    return await User.create(data);
  }

  async update(id, data, tenantId) {
    const user = await this.findById(id, tenantId);
    if (!user) return null;
    await user.update(data);
    return user;
  }

  async delete(id, tenantId) {
    const user = await this.findById(id, tenantId);
    if (!user) return false;
    await user.destroy();
    return true;
  }
}

export default new UserRepository();