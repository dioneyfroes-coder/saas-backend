import { Request, Response } from "express";
import TenantService from "../services/TenantService.js";

class TenantController {
  // Criar um novo tenant
  async createTenant(req: Request, res: Response): Promise<void> {
    try {
      const { nome, plano } = req.body;
      const tenant = await TenantService.createTenant({ nome, plano, status: "ativo" });
      res.status(201).json(tenant);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Buscar todos os tenants
  async getAllTenants(req: Request, res: Response): Promise<void> {
    try {
      const tenants = await TenantService.getAllTenants();
      res.status(200).json(tenants);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Buscar um tenant por ID
  async getTenantById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const tenant = await TenantService.getTenantById(Number(id));
      if (!tenant) {
        res.status(404).json({ error: "Tenant not found" });
        return;
      }
      res.status(200).json(tenant);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Atualizar um tenant
  async updateTenant(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
      const tenant = await TenantService.updateTenant(Number(id), data);
      res.status(200).json(tenant);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Excluir um tenant
  async deleteTenant(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await TenantService.deleteTenant(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new TenantController();