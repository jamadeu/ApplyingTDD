import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import Owner from '@modules/owner/typeorm/entities/Owners';

interface IRequest {
  email: string;
}

@injectable()
class FindOwnerByEmailService {
  constructor(
    @inject('OwnerRepository')
    private ownersRepository: IOwnerRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<Owner> {
    const owner = await this.ownersRepository.findByEmail(email);
    if (!owner) {
      throw new AppError('Owner not found');
    }
    return owner;
  }
}

export default FindOwnerByEmailService;
