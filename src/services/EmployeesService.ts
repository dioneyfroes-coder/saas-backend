import EmployeesRepository from '../repositories/EmployeesRepository.js';
import { EmployeeType } from '../types/EmployeeType';

const EmployeesService = {
  // Buscar todos os funcionários de um tenant
  async getEmployees(tenantId: number): Promise<EmployeeType[]> {
    return await EmployeesRepository.findAll(tenantId);
  },

  // Buscar um funcionário por ID e tenant
  async getEmployeeById(id: number, tenantId: number): Promise<EmployeeType> {
    const employee = await EmployeesRepository.findById(id, tenantId);
    if (!employee) throw new Error('Funcionário não encontrado');
    return employee;
  },

  // Criar um novo funcionário
  async createEmployee(data: Omit<EmployeeType, 'id' | 'createdAt' | 'updatedAt'>): Promise<EmployeeType> {
    return await EmployeesRepository.create(data);
  },

  // Atualizar um funcionário
  async updateEmployee(
    id: number,
    tenantId: number,
    data: Partial<Omit<EmployeeType, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>>
  ): Promise<EmployeeType> {
    const updatedEmployee = await EmployeesRepository.update(id, tenantId, data);
    if (!updatedEmployee) throw new Error('Falha ao atualizar o funcionário');
    return updatedEmployee;
  },

  // Excluir um funcionário
  async deleteEmployee(id: number, tenantId: number): Promise<void> {
    const employee = await EmployeesRepository.findById(id, tenantId);
    if (!employee) throw new Error('Funcionário não encontrado');
    await EmployeesRepository.delete(id, tenantId);
  },
};

export default EmployeesService;