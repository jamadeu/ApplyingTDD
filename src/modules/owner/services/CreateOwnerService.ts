import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import Owner from '@modules/owner/typeorm/entities/Owners';

interface IRequest {
  name: string;
  phone: string;
  email: string;
}

@injectable()
class CreateOwnerService {
  constructor(
    @inject('OwnerRepository')
    private ownersRepository: IOwnerRepository,
  ) {}

  public async execute({ name, phone, email }: IRequest): Promise<Owner> {
    const ownerExists = await this.ownersRepository.findByEmail(email);
    if (ownerExists) {
      throw new AppError('Email already used');
    }
    const owner = await this.ownersRepository.create({ name, phone, email });
    return owner;
  }
}

export default CreateOwnerService;
