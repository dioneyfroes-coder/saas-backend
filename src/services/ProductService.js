import ProductRepository from '../repositories/ProductRepository.js';

class ProductService {
  async getAllProducts() {
    return await ProductRepository.findAll();
  }

  async getProductById(id) {
    return await ProductRepository.findById(id);
  }

  async createProduct(data) {
    return await ProductRepository.create(data);
  }

  async updateProduct(id, data) {
    return await ProductRepository.update(id, data);
  }

  async deleteProduct(id) {
    return await ProductRepository.delete(id);
  }

  // para codigo de barras
async getProductByCodigoBarras(codigobarras) {
    return await ProductRepository.findByCodigoBarras(codigobarras);
  }
  
  async updateProductByCodigoBarras(codigobarras, data) {
    return await ProductRepository.updateByCodigoBarras(codigobarras, data);
  }
  
  async deleteProductByCodigoBarras(codigobarras) {
    return await ProductRepository.deleteByCodigoBarras(codigobarras);
  }
}

export default new ProductService();