import ServiceResponse from '../interfaces/serviceResponse';
import User from '../interfaces/user';
import JsonWebToken from '../utils/jsonWebToken';
import AbstractService from './abstractService';
import { Token } from '../interfaces/user';
import { hashSync } from 'bcryptjs';
import modelDatabase from '../interfaces/modelDatabase';

class ServiceRegister extends AbstractService<User> {
  constructor(protected model: modelDatabase<User>) {
    super(model);
  }

  override async create(user: User): Promise<ServiceResponse<Token>> {
    const { email, password } = user;

    const userExists = await this.model.findOne('email', email);

    if (userExists) {
      return { status: 'confict', data: { message: 'Email already registered' } };
    }

    const passwordHash = hashSync(password);
    const newUser = await this.model.create({ ...user, password: passwordHash });

    if (!newUser.id) return { status: 'serverError', data: { message: 'Error creating user' } };

    const token = JsonWebToken.generateToken({ id: newUser.id, email: newUser.email });
    return { status: 'created', data: { token } };
  }
}

export default ServiceRegister;