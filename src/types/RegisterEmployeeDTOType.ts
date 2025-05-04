//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\types\RegisterEmployeeDTOType.ts
export interface RegisterEmployeeDTO {
    role: any;
    name: string;
    roleCode: string; // Ex: "01", "02"
    pin: string;      // Ex: "1234"
    document?: string;
    email?: string;
    phone?: string;
    address?: string;
    // etc. conforme necessidade
  }