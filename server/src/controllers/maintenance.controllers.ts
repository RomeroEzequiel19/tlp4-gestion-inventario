import { Request, Response } from 'express';
import MaintenanceService from '../services/MaintenanceService';

class MaintenanceController {

  // Controlador para crear un nuevo registro de mantenimiento
  async createMaintenance(req: Request, res: Response): Promise<Response> {
    try {
      const maintenance = await MaintenanceService.createMaintenance(req.body);
      return res.status(201).json({ message: "Mantenimiento creado correctamente" });
    } catch (error: any) {
      return res.status(400).json({ message: "Error interno en el servidor" });
    }
  }

  // Controlador para obtener todos los registros de mantenimiento
  async getAllMaintenances(req: Request, res: Response): Promise<Response> {
    try {
      const maintenances = await MaintenanceService.getAllMaintenance();
      return res.status(200).json(maintenances);
    } catch (error: any) {
      return res.status(500).json({ message: "Error interno en el servidor" });
    }
  }

  // Controlador para obtener un registro de mantenimiento por ID
  async getMaintenanceById(req: Request, res: Response): Promise<Response> {
    try {
      const maintenance = await MaintenanceService.getMaintenanceById(req.params.id);
      return res.status(200).json(maintenance);
    } catch (error: any) {
      return res.status(404).json({ message: "Mantenimiento no encontrado" });
    }
  }

  // Controlador para actualizar un registro de mantenimiento por ID
  async updateMaintenance(req: Request, res: Response): Promise<Response> {
    try {
      const maintenance = await MaintenanceService.updateMaintenance(req.params.id, req.body);
      if (!maintenance) {
        return res.status(404).json({ message: "Mantenimiento no encontrado" });
      }
      return res.status(200).json({ message: "Mantenimiento actualizado correctamente"});
    } catch (error: any) {
      return res.status(400).json({ message: "Error interno en el servidor" });
    }
  }

  // Controlador para eliminar un registro de mantenimiento por ID
  async deleteMaintenance(req: Request, res: Response): Promise<Response> {
    try {
      await MaintenanceService.deleteMaintenance(req.params.id);
      return res.status(200).json({ message: "Mantenimiento eliminado correctamente" });
    } catch (error: any) {
      return res.status(404).json({ message: "Mantenimiento no encontrado" });
    }
  }
}

export default new MaintenanceController();
