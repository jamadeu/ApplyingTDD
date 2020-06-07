import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import Owner from '@modules/owner/typeorm/entities/Owners';

interface IRequest {
  owner_id: string;
  name: string;
  phone: string;
  email: string;
}

@injectable()
class UpdateOwnerService {
  constructor(
    @inject('OwnerRepository')
    private ownersRepository: IOwnerRepository,
  ) {}

  public async execute({
    owner_id,
    name,
    phone,
    email,
  }: IRequest): Promise<Owner> {
    const owner = await this.ownersRepository.findById(owner_id);
    if (!owner) {
      throw new AppError('Owner not found');
    }

    const checkEmailInUse = await this.ownersRepository.findByEmail(email);
    if (email && checkEmailInUse?.id !== owner.id) {
      throw new AppError('Email already in use');
    }

    owner.name = name;
    owner.email = email;
    owner.phone = phone;

    return this.ownersRepository.update(owner);
  }
}

export default UpdateOwnerService;
