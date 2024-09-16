import { Request, Response, NextFunction } from 'express';

const roleMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (userRole !== requiredRole) {
      return res.status(403).json({ message: 'Acceso denegado, rol no autorizado' });
    }

    next();
  };
};

export default roleMiddleware;
