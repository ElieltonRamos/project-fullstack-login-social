import { NextFunction, Request, Response } from 'express';
import JsonWebToken from '../utils/jsonWebToken';

class AuthenticateToken {
  static verifyToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).send({ message: 'Token not found' });

    const token = authorization.split(' ')[1];
    const userAuthenticate = JsonWebToken.verifyToken(token);

    if (userAuthenticate === 'token-invalid') {
      return res.status(401).send({ message: 'Token must be a valid token' });
    }

    req.body.user = userAuthenticate;
    next();
  }
}

export default AuthenticateToken;
