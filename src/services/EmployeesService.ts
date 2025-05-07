//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\services\EmployeesService.ts
import EmployeesRepository from '../repositories/EmployeesRepository';
import { EmployeeType } from '../types/EmployeeType';
import bcrypt from 'bcrypt';
import { RegisterEmployeeDTO } from '../types/RegisterEmployeeDTOType';
import { ROLE_PREFIX_MAP } from '../utils/ROLE_PREFIX_MAP';

const EmployeesService = {
  // Buscar todos os funcionários
  async getEmployees(): Promise<EmployeeType[]> {
    return await EmployeesRepository.findAll();
  },

  // Buscar um funcionário por ID
  async getEmployeeById(id: number): Promise<EmployeeType> {
    const employee = await EmployeesRepository.findById(id);
    if (!employee) throw new Error('Funcionário não encontrado');
    return employee;
  },

  // Criar um novo funcionário
  async createEmployee(data: RegisterEmployeeDTO): Promise<EmployeeType> {
    // Pega o prefixo pelo enum (data.role) definido em RoleType.ts
    const prefix = ROLE_PREFIX_MAP[data.role as keyof typeof ROLE_PREFIX_MAP];

    // Concatena prefixo + pin
    const rawPassword = prefix + data.pin;

    // Faz o hash com bcrypt
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Monta o objeto de cadastro
    const employeeData = {
      name: data.name,
      role: data.role,
      email: data.email,
      phone: data.phone,
      address: data.address,
      passwordHash: hashedPassword,
    };

    // Salva no banco
    const newEmployee = await EmployeesRepository.create(employeeData);
    return newEmployee;
  },

  // Validação de PIN (role + pin)
  async validateEmployeePin(id: number, role: string, pin: string): Promise<boolean> {
    const employee = await EmployeesRepository.findById(id);
    if (!employee || !employee.passwordHash) return false;

    const prefix = ROLE_PREFIX_MAP[role as keyof typeof ROLE_PREFIX_MAP]; // ou <Role>role, dependendo do caso
    const rawPassword = prefix + pin;

    return bcrypt.compare(rawPassword, employee.passwordHash);
  },

  // Atualizar um funcionário
  async updateEmployee(
    id: number,
    data: Partial<Omit<EmployeeType, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<EmployeeType> {
    const updatedEmployee = await EmployeesRepository.update(id, data);
    if (!updatedEmployee) throw new Error('Falha ao atualizar o funcionário');
    return updatedEmployee;
  },

  // Excluir um funcionário
  async deleteEmployee(id: number): Promise<void> {
    const employee = await EmployeesRepository.findById(id);
    if (!employee) throw new Error('Funcionário não encontrado');
    await EmployeesRepository.delete(id);
  },
};

export default EmployeesService;