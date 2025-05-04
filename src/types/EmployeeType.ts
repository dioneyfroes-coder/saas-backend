export interface EmployeeType {
  id: number;
  name: string;
  document?: string;
  email?: string;
  phone?: string;
  address?: string;
  passwordHash?: string; // <-- adicionando
  createdAt: Date;
  updatedAt: Date;
}