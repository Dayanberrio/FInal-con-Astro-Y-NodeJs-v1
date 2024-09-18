import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).json({ message: 'No autorizado' });
  }
};
