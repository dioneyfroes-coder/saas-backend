import SaleService from '../services/SaleService.js';

const SaleController = {
  async createSale(req, res) {
    try {
      const { items, userId } = req.body;
      const tenantId = req.tenantId;

      const sale = await SaleService.createSale({ tenantId, userId, items });
      res.status(201).json(sale);
    } catch (error) {
      console.error('Erro ao criar venda:', error);
      res.status(500).json({ message: 'Erro ao criar venda' });
    }
  },

  async getAllSales(req, res) {
    try {
      const tenantId = req.tenantId;
      const sales = await SaleService.getAllSales(tenantId);
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar vendas' });
    }
  },

  async getSaleById(req, res) {
    try {
      const tenantId = req.tenantId;
      const id = req.params.id;

      const sale = await SaleService.getSaleById(id, tenantId);
      if (sale) {
        res.json(sale);
      } else {
        res.status(404).json({ message: 'Venda não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar venda' });
    }
  },

  async cancelSale(req, res) {
    try {
      const tenantId = req.tenantId;
      const id = req.params.id;

      const sale = await SaleService.cancelSale(id, tenantId);
      if (sale) {
        res.json({ message: 'Venda cancelada com sucesso', sale });
      } else {
        res.status(404).json({ message: 'Venda não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cancelar venda' });
    }
  },
};

export default SaleController;