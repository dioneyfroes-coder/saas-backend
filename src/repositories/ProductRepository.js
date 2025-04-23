import Product from '../models/Product.js';

class ProductRepository {
  async findAll(tenantId) {
    return await Product.findAll({ where: { tenantId } });
  }

  async findById(id, tenantId) {
    return await Product.findOne({ where: { id, tenantId } });
  }

  async findByCodigoBarras(codigoBarras, tenantId) {
    return await Product.findOne({ where: { codigoBarras, tenantId } });
  }

  async create(data, tenantId) {
    return await Product.create({ ...data, tenantId });
  }

  async update(id, data, tenantId) {
    const product = await this.findById(id, tenantId);
    if (product) {
      return await product.update(data);
    }
    return null;
  }

  async delete(id, tenantId) {
    const product = await this.findById(id, tenantId);
    if (product) {
      return await product.destroy();
    }
    return null;
  }

  async deleteByCodigoBarras(codigoBarras, tenantId) {
    const product = await this.findByCodigoBarras(codigoBarras, tenantId);
    if (product) {
      return await product.destroy();
    }
    return null;
  }
}

export default new ProductRepository();