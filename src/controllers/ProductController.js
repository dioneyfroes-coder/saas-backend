import ProductService from '../services/ProductService.js';

class ProductController {
  async getAll(req, res) {
    try {
      const { tenantId } = req;
      const products = await ProductService.getAllProducts(tenantId);
      res.json(products);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
  }

  async getById(req, res) {
    const { tenantId } = req;
    const product = await ProductService.getProductById(req.params.id, tenantId);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Produto não encontrado' });
  }

  async create(req, res) {
    const { tenantId } = req;
    const product = await ProductService.createProduct(req.body, tenantId);
    res.status(201).json(product);
  }

  async update(req, res) {
    const { tenantId } = req;
    const product = await ProductService.updateProduct(req.params.id, req.body, tenantId);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Produto não encontrado' });
  }

  async delete(req, res) {
    const { tenantId } = req;
    const success = await ProductService.deleteProduct(req.params.id, tenantId);
    if (success) res.status(204).send();
    else res.status(404).json({ message: 'Produto não encontrado' });
  }

  async getByCodigoBarras(req, res) {
    const { tenantId } = req;
    const product = await ProductService.getProductByCodigoBarras(req.params.codigobarras, tenantId);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Produto não encontrado pelo código de barras' });
  }

  async updateByCodigoBarras(req, res) {
    const { tenantId } = req;
    const product = await ProductService.updateProductByCodigoBarras(req.params.codigobarras, req.body, tenantId);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Produto não encontrado pelo código de barras' });
  }

  async deleteByCodigoBarras(req, res) {
    const { tenantId } = req;
    const success = await ProductService.deleteProductByCodigoBarras(req.params.codigobarras, tenantId);
    if (success) res.status(204).send();
    else res.status(404).json({ message: 'Produto não encontrado pelo código de barras' });
  }
}

export default new ProductController();