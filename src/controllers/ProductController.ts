import { Request, Response } from 'express';
import ProductService from '../services/ProductService.js';

class ProductController {
  // Buscar todos os produtos
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const products = await ProductService.getAllProducts(tenantId!);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produtos', error: (error as Error).message });
    }
  }

  // Buscar um produto por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const product = await ProductService.getProductById(Number(req.params.id), tenantId!);
      if (product) res.json(product);
      else res.status(404).json({ message: 'Produto não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produto', error: (error as Error).message });
    }
  }

  // Criar um novo produto
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const product = await ProductService.createProduct(req.body, tenantId!);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar produto', error: (error as Error).message });
    }
  }

  // Atualizar um produto
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const product = await ProductService.updateProduct(Number(req.params.id), req.body, tenantId!);
      if (product) res.json(product);
      else res.status(404).json({ message: 'Produto não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar produto', error: (error as Error).message });
    }
  }

  // Excluir um produto
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const success = await ProductService.deleteProduct(Number(req.params.id), tenantId!);
      if (success) res.status(204).send();
      else res.status(404).json({ message: 'Produto não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir produto', error: (error as Error).message });
    }
  }

  // Buscar um produto por código de barras
  async getByCodigoBarras(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const product = await ProductService.getProductByCodigoBarras(req.params.codigobarras, tenantId!);
      if (product) res.json(product);
      else res.status(404).json({ message: 'Produto não encontrado pelo código de barras' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produto pelo código de barras', error: (error as Error).message });
    }
  }

  // Atualizar um produto por código de barras
  async updateByCodigoBarras(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const product = await ProductService.updateProductByCodigoBarras(req.params.codigobarras, req.body, tenantId!);
      if (product) res.json(product);
      else res.status(404).json({ message: 'Produto não encontrado pelo código de barras' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar produto pelo código de barras', error: (error as Error).message });
    }
  }

  // Excluir um produto por código de barras
  async deleteByCodigoBarras(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const success = await ProductService.deleteProductByCodigoBarras(req.params.codigobarras, tenantId!);
      if (success) res.status(204).send();
      else res.status(404).json({ message: 'Produto não encontrado pelo código de barras' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir produto pelo código de barras', error: (error as Error).message });
    }
  }
}

export default new ProductController();