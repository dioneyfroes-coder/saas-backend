import ProductRepository from '../repositories/ProductRepository';
import { ProductType } from '../types/ProductType';

class ProductService {
  // Buscar todos os produtos de um tenant
  async getAllProducts(tenantId: number): Promise<ProductType[]> {
    return await ProductRepository.findAll(tenantId);
  }

  // Buscar um produto por ID
  async getProductById(id: number, tenantId: number): Promise<ProductType | null> {
    return await ProductRepository.findById(id, tenantId);
  }

  // Criar um novo produto
  async createProduct(data: Omit<ProductType, 'id'>, tenantId: number): Promise<ProductType> {
    return await ProductRepository.create({ ...data, tenantId });
  }

  // Atualizar um produto
  async updateProduct(
    id: number,
    data: Partial<Omit<ProductType, 'id' | 'tenantId'>>,
    tenantId: number
  ): Promise<ProductType | null> {
    return await ProductRepository.update(id, tenantId, data);
  }

  // Excluir um produto por ID
  async deleteProduct(id: number, tenantId: number): Promise<boolean> {
    return await ProductRepository.delete(id, tenantId);
  }

  // Buscar um produto por código de barras
  async getProductByCodigoBarras(codigoBarras: string, tenantId: number): Promise<ProductType | null> {
    return await ProductRepository.findByCodigoBarras(codigoBarras, tenantId);
  }

  // Atualizar um produto por código de barras
  async updateProductByCodigoBarras(
    codigoBarras: string,
    data: Partial<Omit<ProductType, 'id' | 'tenantId'>>,
    tenantId: number
  ): Promise<ProductType | null> {
    const product = await ProductRepository.findByCodigoBarras(codigoBarras, tenantId);
    if (!product) throw new Error('Produto não encontrado pelo código de barras');

    return await ProductRepository.update(product.id, tenantId, data);
  }

  // Excluir um produto por código de barras
  async deleteProductByCodigoBarras(codigoBarras: string, tenantId: number): Promise<boolean> {
    return await ProductRepository.deleteByCodigoBarras(codigoBarras, tenantId);
  }
}

export default new ProductService();