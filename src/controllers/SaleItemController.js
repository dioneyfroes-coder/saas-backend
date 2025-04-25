import SaleItemService from '../services/SaleItemService.js';

class SaleItemController {
  async getItemsBySale(req, res) {
    const { saleId } = req.params;
    const { tenantId } = req;

    try {
      const items = await SaleItemService.getItemsBySale(saleId, tenantId);
      res.json(items);
    } catch (error) {
      console.error('Erro ao buscar itens da venda:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async createSaleItem(req, res) {
    const { tenantId } = req;
    const data = { ...req.body, tenantId };

    try {
      const item = await SaleItemService.createSaleItem(data);
      res.status(201).json(item);
    } catch (error) {
      console.error('Erro ao criar item da venda:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async deleteItemsBySale(req, res) {
    const { saleId } = req.params;
    const { tenantId } = req;

    try {
      await SaleItemService.deleteItemsBySale(saleId, tenantId);
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir itens da venda:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

export default new SaleItemController();