import jwt from 'jsonwebtoken';
import { ICreateJWTResponse } from '../interface/AuthInterface';

export const addJWT = (payload: {user: string}): Promise<ICreateJWTResponse> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, "ñññññ", (err, token) => {
      if (err) {
        return reject('Error al firmar el token');
      }

      if (!token) {
        return reject('No se pudo generar el token');
      }

      resolve({ token });
    });
  });
};
