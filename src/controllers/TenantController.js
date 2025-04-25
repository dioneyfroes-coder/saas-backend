import TenantService from "../services/TenantService.js";

const TenantController = {
  async createTenant(req, res) {
    try {
      const { nome, plano } = req.body;
      const tenant = await TenantService.createTenant({ nome, plano });
      return res.status(201).json(tenant);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getAllTenants(req, res) {
    try {
      const tenants = await TenantService.getAllTenants();
      return res.status(200).json(tenants);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getTenantById(req, res) {
    try {
      const { id } = req.params;
      const tenant = await TenantService.getTenantById(id);
      if (!tenant) return res.status(404).json({ error: "Tenant not found" });
      return res.status(200).json(tenant);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async updateTenant(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const tenant = await TenantService.updateTenant(id, data);
      return res.status(200).json(tenant);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async deleteTenant(req, res) {
    try {
      const { id } = req.params;
      await TenantService.deleteTenant(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default TenantController;