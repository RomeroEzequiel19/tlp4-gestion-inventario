import { Request, Response } from "express";
import DeviceService from "../services/DeviceService";

class DeviceController {

    // Controlador para crear un nuevo equipo informático
    async ctrlCreateDevice(req: Request, res: Response): Promise<Response> {
        try {
            await DeviceService.createDevice(req.body);
            return res.status(201).json({ message: "Creado correctamente" });
        } catch (error) {
            return res.status(400).json({ message: "Error interno en el servidor" });
        }
    }

    // Controlador para obtener un equipo por su ID
    async ctrlGetDeviceById(req: Request, res: Response): Promise<Response> {
        try {
            const device = await DeviceService.getDeviceById(req.params.id);

            if (!device) {
                return res.status(404).json({ message: "Dispositivo no encontrado" });
            }

            return res.status(200).json(device);
        } catch (error) {
            return res.status(400).json({ message: "Error interno en el servidor" });
        }
    }

    // Controlador para obtener todos los equipos
    async ctrlGetAllDevices(req: Request, res: Response): Promise<Response> {
        try {
            const devices = await DeviceService.getAllDevices();
            return res.status(200).json(devices);
        } catch (error) {
            return res.status(400).json({ message: "Error interno en el servidor" });
        }
    }

    // Controlador para actualizar un equipo por su ID
    async ctrlUpdateDevice(req: Request, res: Response): Promise<Response> {
        try {
            const updateDevice = await DeviceService.updateDevice(req.params.id, req.body);

            if (!updateDevice) {
                return res.status(404).json({ message: "Dispositivo no encontrado" });
            }

            return res.status(200).json({ message: "Actualizado correctamente" });
        } catch (error) {
            return res.status(400).json({ message: "Error interno en el servidor" });
        }
    }

    // Controlador para eliminar un equipo por su ID
    async ctrlDeleteDevice(req: Request, res: Response): Promise<Response> {
        try {
            await DeviceService.deleteDevice(req.params.id);
            return res.status(201).json({message: "Eliminado correctamente"});
        } catch (error) {
            return res.status(400).json({ message: "Error interno en el servidor" });
        }
    }
}

export default new DeviceController();
