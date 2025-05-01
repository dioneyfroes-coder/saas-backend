import SaleItemRepository from '../repositories/SaleItemRepository';
import { SaleItemType } from '../types/SaleItemType';

const SaleItemService = {
  // Buscar todos os itens de uma venda
  async getItemsBySale(saleId: number): Promise<SaleItemType[]> {
    return await SaleItemRepository.findAllBySale(saleId);
  },

  // Criar um novo item de venda
  async createSaleItem(data: Omit<SaleItemType, 'id'>): Promise<SaleItemType> {
    return await SaleItemRepository.create(data);
  },

  // Excluir todos os itens de uma venda
  async deleteItemsBySale(saleId: number): Promise<boolean> {
    return await SaleItemRepository.deleteBySale(saleId);
  },
};

export default SaleItemService;