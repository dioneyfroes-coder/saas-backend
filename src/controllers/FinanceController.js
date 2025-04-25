import FinanceService from '../services/FinanceService.js';

class FinanceController {
  async create(req, res) {
    try {
      const record = await FinanceService.createFinanceRecord(req.body, req.tenantId);
      res.status(201).json(record);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar registro financeiro', error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const records = await FinanceService.getFinanceRecords(req.tenantId);
      res.json(records);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar registros financeiros', error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const record = await FinanceService.getFinanceRecordById(req.params.id, req.tenantId);
      if (!record) return res.status(404).json({ message: 'Registro não encontrado' });
      res.json(record);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar registro financeiro', error: error.message });
    }
  }

  async update(req, res) {
    try {
      const record = await FinanceService.updateFinanceRecord(req.params.id, req.body, req.tenantId);
      if (!record) return res.status(404).json({ message: 'Registro não encontrado' });
      res.json(record);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar registro financeiro', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const success = await FinanceService.deleteFinanceRecord(req.params.id, req.tenantId);
      if (!success) return res.status(404).json({ message: 'Registro não encontrado' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir registro financeiro', error: error.message });
    }
  }

  async getByPeriod(req, res) {
    const { startDate, endDate } = req.query;
    try {
      const records = await FinanceService.getFinanceRecordsByPeriod(req.tenantId, startDate, endDate);
      res.json(records);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar registros financeiros por período', error: error.message });
    }
  }

  async getSummaryByCategory(req, res) {
    try {
      const summary = await FinanceService.getSummaryByCategory(req.tenantId);
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar resumo por categoria', error: error.message });
    }
  }

  async getTotalBalance(req, res) {
    try {
      const balance = await FinanceService.getTotalBalance(req.tenantId);
      res.json({ balance });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao calcular saldo total', error: error.message });
    }
  }
}

export default new FinanceController();