import ProductRepository from '../repositories/ProductRepository.js';

class ProductService {
  async getAllProducts(tenantId) {
    return await ProductRepository.findAll(tenantId);
  }

  async getProductById(id, tenantId) {
    return await ProductRepository.findById(id, tenantId);
  }

  async createProduct(data, tenantId) {
    return await ProductRepository.create({ ...data, tenantId });
  }

  async updateProduct(id, data, tenantId) {
    const product = await ProductRepository.findById(id, tenantId);
    if (!product) {
      throw new Error('Produto não encontrado ou não pertence ao tenant');
    }
    return await product.update(data);
  }

  async deleteProduct(id, tenantId) {
    const product = await ProductRepository.findById(id, tenantId);
    if (!product) {
      throw new Error('Produto não encontrado ou não pertence ao tenant');
    }
    return await product.destroy();
  }

  async getProductByCodigoBarras(codigoBarras, tenantId) {
    return await ProductRepository.findByCodigoBarras(codigoBarras, tenantId);
  }

  async updateProductByCodigoBarras(codigoBarras, data, tenantId) {
    const product = await ProductRepository.findByCodigoBarras(codigoBarras, tenantId);
    if (!product) {
      throw new Error('Produto não encontrado pelo código de barras');
    }
    return await product.update(data);
  }

  async deleteProductByCodigoBarras(codigoBarras, tenantId) {
    const product = await ProductRepository.findByCodigoBarras(codigoBarras, tenantId);
    if (!product) {
      throw new Error('Produto não encontrado pelo código de barras');
    }
    return await product.destroy();
  }
}

export default new ProductService();