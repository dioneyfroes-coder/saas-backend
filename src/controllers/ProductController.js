import ProductService from '../services/ProductService.js';

class ProductController {
  async getAll(req, res) {
    try {
      const { tenantId } = req;
      const products = await ProductService.getAllProducts(tenantId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { tenantId } = req;
      const product = await ProductService.getProductById(req.params.id, tenantId);
      if (product) res.json(product);
      else res.status(404).json({ message: 'Produto não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { tenantId } = req;
      const product = await ProductService.createProduct(req.body, tenantId);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { tenantId } = req;
      const product = await ProductService.updateProduct(req.params.id, req.body, tenantId);
      if (product) res.json(product);
      else res.status(404).json({ message: 'Produto não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { tenantId } = req;
      const success = await ProductService.deleteProduct(req.params.id, tenantId);
      if (success) res.status(204).send();
      else res.status(404).json({ message: 'Produto não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir produto', error: error.message });
    }
  }

  async getByCodigoBarras(req, res) {
    try {
      const { tenantId } = req;
      const product = await ProductService.getProductByCodigoBarras(req.params.codigobarras, tenantId);
      if (product) res.json(product);
      else res.status(404).json({ message: 'Produto não encontrado pelo código de barras' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produto pelo código de barras', error: error.message });
    }
  }

  async updateByCodigoBarras(req, res) {
    try {
      const { tenantId } = req;
      const product = await ProductService.updateProductByCodigoBarras(req.params.codigobarras, req.body, tenantId);
      if (product) res.json(product);
      else res.status(404).json({ message: 'Produto não encontrado pelo código de barras' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar produto pelo código de barras', error: error.message });
    }
  }

  async deleteByCodigoBarras(req, res) {
    try {
      const { tenantId } = req;
      const success = await ProductService.deleteProductByCodigoBarras(req.params.codigobarras, tenantId);
      if (success) res.status(204).send();
      else res.status(404).json({ message: 'Produto não encontrado pelo código de barras' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir produto pelo código de barras', error: error.message });
    }
  }
}

export default new ProductController();