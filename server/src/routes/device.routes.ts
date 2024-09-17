import { Router } from 'express';
import DeviceController from '../controllers/device.controllers';

const deviceRoutes: Router = Router();

// Rutas para CRUD de dispositivos
deviceRoutes.post('/devices', DeviceController.ctrlCreateDevice);
deviceRoutes.get('/devices', DeviceController.ctrlGetAllDevices);
deviceRoutes.get('/devices/:id', DeviceController.ctrlGetDeviceById);
deviceRoutes.put('/devices/:id', DeviceController.ctrlUpdateDevice);
deviceRoutes.delete('/devices/:id', DeviceController.ctrlDeleteDevice);

export default deviceRoutes;
