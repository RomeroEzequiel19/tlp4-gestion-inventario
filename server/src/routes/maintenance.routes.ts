import { Router } from 'express';
import MaintenanceController from '../controllers/maintenance.controllers';
import roleMiddleware from '../middlewares/Roles';
import authMiddleware from '../middlewares/ValidateJWT';

const maintenanceRoutes: Router = Router();

// Rutas para CRUD de mantenimientos
maintenanceRoutes.post('/maintenances', authMiddleware, roleMiddleware(['admin', 'user']), MaintenanceController.createMaintenance);
maintenanceRoutes.get('/maintenances', authMiddleware, roleMiddleware(['admin', 'user']),MaintenanceController.getAllMaintenances);
maintenanceRoutes.get('/maintenances/:id', authMiddleware, roleMiddleware(['admin', 'user']),MaintenanceController.getMaintenanceById);
maintenanceRoutes.put('/maintenances/:id', authMiddleware, roleMiddleware(['admin', 'user']),MaintenanceController.updateMaintenance);
maintenanceRoutes.delete('/maintenances/:id', authMiddleware, roleMiddleware(['admin', 'user']),MaintenanceController.deleteMaintenance);

export default maintenanceRoutes;
