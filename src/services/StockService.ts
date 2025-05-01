import StockRepository from '../repositories/StockRepository';
import { StockType } from '../types/StockType';

class StockService {
  // Buscar todos os itens no estoque
  async getAllStock(): Promise<StockType[]> {
    return await StockRepository.findAll();
  }

  // Buscar um item por ID
  async getStockById(id: number): Promise<StockType | null> {
    return await StockRepository.findById(id);
  }

  // Buscar um item por código de barras
  async getStockByBarcode(barcode: string): Promise<StockType | null> {
    return await StockRepository.findByBarcode(barcode);
  }

  // Criar um novo item no estoque
  async createStock(data: Omit<StockType, 'id' | 'createdAt' | 'updatedAt'>): Promise<StockType> {
    return await StockRepository.create(data);
  }

  // Atualizar um item no estoque
  async updateStock(id: number, data: Partial<Omit<StockType, 'id' | 'createdAt' | 'updatedAt'>>): Promise<StockType | null> {
    return await StockRepository.update(id, data);
  }

  // Excluir um item do estoque
  async deleteStock(id: number): Promise<void> {
    await StockRepository.delete(id);
  }
}

export default new StockService();