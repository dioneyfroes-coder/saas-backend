import Device from '../models/Device.js';

export async function seedDevices() {
  await Device.bulkCreate([
    {
      nome: 'Caixa 01',
      tipo: 'pdv',
      identificador: 'PDV-001',
      chaveSecreta: 'abc123',
      ativo: true,
      tenantId: 1
    },
    {
      nome: 'Estoque Central',
      tipo: 'estoque',
      identificador: 'EST-001',
      chaveSecreta: 'xyz456',
      ativo: true,
      tenantId: 1
    }
  ]);

  console.log('Dispositivos de teste criados');
}
