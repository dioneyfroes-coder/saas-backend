// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\tests\integration\employees.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app }from '../../src/server'; // Ajuste o caminho para a sua instância do Express

describe('GET /api/employees', () => {
  it('deve retornar uma lista de funcionários', async () => {
    const res = await request(app).get('/api/employees');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});