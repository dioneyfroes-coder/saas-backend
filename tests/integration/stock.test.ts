import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../src/server'; // Ajuste o caminho conforme necessário

describe('Stock Module - Integration Tests', () => {

    it('Deve criar um novo item no estoque', async () => {
        const newItem = {
           name: 'Novo Item',
           barcode: '1234567890123',
           price: 10.99,
           quantity: 100,
        };

        
  it('Deve retornar a lista de itens do estoque', async () => {
    const response = await request(app).get('/api/stock'); // Ajuste o endpoint caso seja diferente
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });


      
      it('Deve retornar um item do estoque pelo ID', async () => {
     const response = await request(app).get('/api/stock/1'); // Ajuste o ID conforme necessário
     expect(response.status).toBe(200);
     expect(response.body).toHaveProperty('id', 1); // Ajuste conforme necessário
      });
      
      it('Deve retornar um erro ao buscar um item inexistente', async () => {
     const response = await request(app).get('/api/stock/9999'); // ID que não existe
     expect(response.status).toBe(404);
      });
      

     
     const response = await request(app).post('/api/stock').send(newItem);
     expect(response.status).toBe(201);
     expect(response.body).toHaveProperty('id');
     expect(response.body.name).toBe(newItem.name);
      });
      
      it('Deve atualizar um item existente no estoque', async () => {
     const updatedItem = {
        name: 'Item Atualizado',
        price: 12.99,
     };
     
     const response = await request(app).put('/api/stock/1').send(updatedItem); // Ajuste o ID conforme necessário
     expect(response.status).toBe(200);
     expect(response.body.name).toBe(updatedItem.name);
      });
      
      it('Deve excluir um item do estoque', async () => {
     const response = await request(app).delete('/api/stock/1'); // Ajuste o ID conforme necessário
     expect(response.status).toBe(204);
      });
    });