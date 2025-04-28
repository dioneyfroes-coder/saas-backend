import { Router } from "express";
import TenantController from "../controllers/TenantController";

const router = Router();

// Rotas para Tenant
router.post("/", TenantController.createTenant);
router.get("/", TenantController.getAllTenants);
router.get("/:id", TenantController.getTenantById);
router.put("/:id", TenantController.updateTenant);
router.delete("/:id", TenantController.deleteTenant);

export default router;