import { RoleType } from '../types/RoleType';


export const ROLE_PREFIX_MAP: Record<RoleType, string> = {
    admin: '00',
    super_admin: '01',
    manager: '10',
    hr: '20',
    finance: '30',
    supervisor: '40',
    auditor: '50',
    stock_clerk: '60',
    cashier: '70',
    operator: '80',
    it: '90',
  };