//logTypes.ts
export interface LogType {
    id: number;
    level: string;
    message: string;
    timestamp: Date;
    stack?: string;
  }