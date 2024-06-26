import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTPP';
import ServiceLogin from '../services/serviceLogin';

class ControllerLogin {
  constructor(
    protected serviceLogin: ServiceLogin,
  ) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { status, data } = await this.serviceLogin.login(email, password);
      return res.status(mapStatusHTTP(status)).send(data);
    } catch (error) {
      console.log(error);
      return res.status(mapStatusHTTP('serverError')).send({ message: 'Server Error' });
    }
  }

}

export default ControllerLogin;