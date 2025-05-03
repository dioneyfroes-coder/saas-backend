//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\middlewares\expressValidatorMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export function validateBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      res.status(400).json({ errors });
      return;
    }
    next();
  };
}