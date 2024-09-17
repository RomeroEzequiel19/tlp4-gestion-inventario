import { IDevice } from "../models/Device";
import Device from "../models/Device";


class DeviceService {

    constructor() {}
  
    // Crear un nuevo dispositivo
    async createDevice(deviceData: IDevice): Promise<IDevice> {
      const existingDevice = await Device.findOne({ serialNumber: deviceData.serialNumber });
      
      if (existingDevice) {
        throw new Error('El dispositivo con ese número de serie ya existe');
      }
  
      const newDevice = new Device(deviceData);
      return await newDevice.save();
    }
  
    // Obtener todos los dispositivos
    async getAllDevices(): Promise<IDevice[]> {
      return await Device.find();
    }
  
    // Obtener un dispositivo por ID
    async getDeviceById(deviceId: string): Promise<IDevice> {
      const device = await Device.findById(deviceId) as IDevice;
      
      if (!device) {
        throw new Error('Dispositivo no encontrado');
      }
      
      return device;
    }
  
    // Actualizar un dispositivo
    async updateDevice(deviceId: string, updateData: Partial<IDevice>): Promise<IDevice> {
      const device = await Device.findById(deviceId) as IDevice;
      
      if (!device) {
        throw new Error('Dispositivo no encontrado');
      }
  
      // Asignar los datos actualizados al dispositivo
      Object.assign(device, updateData);
      
      return await device.save()
    }
  
    // Eliminar un dispositivo
    async deleteDevice(deviceId: string): Promise<void> {
      const device = await Device.findByIdAndDelete(deviceId);
      
      if (!device) {
        throw new Error('Dispositivo no encontrado');
      }
    }
  
    // Método opcional: Obtener dispositivos asignados a un usuario específico
    async getDevicesByUser(userId: string): Promise<IDevice[]> {
      return await Device.find({ assignedTo: userId });
    }
}
  
export default new DeviceService();