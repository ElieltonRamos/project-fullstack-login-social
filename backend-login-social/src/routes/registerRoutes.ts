import { Request, Response, Router } from 'express';
import ConstrollerRegister from '../controllers/constrollerRegister';
import ServiceRegister from '../services/serviceRegister';
import RegisterUserModel from '../models/modelRegister';
import { validateEmail, validateName, validatePassword } from '../middlewares/validateUser';
import AuthenticateToken from '../middlewares/authenticateToken';
import { validateImage } from '../middlewares/validateImage';

const modelregisterUser = new RegisterUserModel();
const serviceRegister = new ServiceRegister(modelregisterUser);
const constrollerRegister = new ConstrollerRegister(serviceRegister);

const registerRoutes = Router();

registerRoutes.post(
  '/',
  validateEmail,
  validateName,
  validatePassword,
  validateImage,
  (req: Request, res: Response) => constrollerRegister.create(req, res));

registerRoutes.get(
  '/user',
  AuthenticateToken.verifyToken,
  (req: Request, res: Response) => constrollerRegister.find(req, res));

registerRoutes.patch(
  '/user',
  AuthenticateToken.verifyToken,
  validateEmail,
  validateName,
  validateImage,
  (req: Request, res: Response) => constrollerRegister.update(req, res)
);

export default registerRoutes;