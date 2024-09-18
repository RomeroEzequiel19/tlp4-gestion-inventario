import { Router } from 'express';
import DeviceController from '../controllers/device.controllers';
import roleMiddleware from '../middlewares/Roles';
import authMiddleware from '../middlewares/ValidateJWT';

const deviceRoutes: Router = Router();

// Rutas para CRUD de dispositivos
deviceRoutes.post('/devices', authMiddleware, roleMiddleware(['admin', 'user']), DeviceController.ctrlCreateDevice);
deviceRoutes.get('/devices', authMiddleware, roleMiddleware(['admin', 'user']), DeviceController.ctrlGetAllDevices);
deviceRoutes.get('/devices/:id', authMiddleware, roleMiddleware(['admin', 'user']), DeviceController.ctrlGetDeviceById);
deviceRoutes.put('/devices/:id', authMiddleware, roleMiddleware(['admin', 'user']), DeviceController.ctrlUpdateDevice);
deviceRoutes.delete('/devices/:id', authMiddleware, roleMiddleware(['admin', 'user']), DeviceController.ctrlDeleteDevice);

export default deviceRoutes;
