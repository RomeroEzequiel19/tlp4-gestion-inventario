import Maintenance, { IMaintenance } from "../models/Maintenance";

class MaintenanceService {
  constructor() {}

  async createMaintenance(maintenanceData: IMaintenance): Promise<IMaintenance> {
    const newMaintenance = new Maintenance(maintenanceData);
    return await newMaintenance.save();
  }

  async getAllMaintenance(): Promise<IMaintenance[]> {
    return await Maintenance.find();
  }

  async getMaintenanceById(maintenanceId: string): Promise<IMaintenance> {
    const maintenance = await Maintenance.findById(maintenanceId);

    if (!maintenance) {
      throw new Error('Registro de mantenimiento no encontrado');
    }

    return maintenance;
  }

  async updateMaintenance(
    maintenanceId: string,
    updateData: Partial<IMaintenance>
  ): Promise<IMaintenance> {
    const maintenance = await Maintenance.findById(maintenanceId);

    if (!maintenance) {
      throw new Error('Registro de mantenimiento no encontrado');
    }

    Object.assign(maintenance, updateData);

    return await maintenance.save();
  }

  async deleteMaintenance(maintenanceId: string): Promise<void> {
    const maintenance = await Maintenance.findByIdAndDelete(maintenanceId);

    if (!maintenance) {
      throw new Error('Registro de mantenimiento no encontrado');
    }
  }
}

export default new MaintenanceService();
