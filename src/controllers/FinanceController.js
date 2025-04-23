// controllers/FinanceController.js
import FinanceService from '../services/FinanceService.js';

class FinanceController {
  async create(req, res) {
    const record = await FinanceService.createFinanceRecord(req.body, req.tenantId);
    res.status(201).json(record);
  }

  async getAll(req, res) {
    const records = await FinanceService.getFinanceRecords(req.tenantId);
    res.json(records);
  }

  async getById(req, res) {
    const record = await FinanceService.getFinanceRecordById(req.params.id, req.tenantId);
    if (!record) return res.status(404).json({ message: 'Registro não encontrado' });
    res.json(record);
  }

  async update(req, res) {
    const record = await FinanceService.updateFinanceRecord(req.params.id, req.body, req.tenantId);
    if (!record) return res.status(404).json({ message: 'Registro não encontrado' });
    res.json(record);
  }

  async delete(req, res) {
    const success = await FinanceService.deleteFinanceRecord(req.params.id, req.tenantId);
    if (!success) return res.status(404).json({ message: 'Registro não encontrado' });
    res.status(204).send();
  }

  async getByPeriod(req, res) {
    const { startDate, endDate } = req.query;
    const { tenantId } = req;
  
    try {
      const records = await FinanceService.getFinanceRecordsByPeriod(tenantId, startDate, endDate);
      res.json(records);
    } catch (error) {
      console.error('Erro ao buscar registros financeiros por período:', error);
      res.status(500).json({ message: 'Erro ao buscar registros financeiros' });
    }
  }

  async getSummaryByCategory(req, res) {
    const { tenantId } = req;
  
    try {
      const summary = await FinanceService.getSummaryByCategory(tenantId);
      res.json(summary);
    } catch (error) {
      console.error('Erro ao buscar resumo por categoria:', error);
      res.status(500).json({ message: 'Erro ao buscar resumo por categoria' });
    }
  }

  async getTotalBalance(req, res) {
    const { tenantId } = req;
  
    try {
      const balance = await FinanceService.getTotalBalance(tenantId);
      res.json({ balance });
    } catch (error) {
      console.error('Erro ao calcular saldo total:', error);
      res.status(500).json({ message: 'Erro ao calcular saldo total' });
    }
  }
}

export default new FinanceController();
