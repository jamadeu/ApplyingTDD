import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import Owner from '@modules/owner/typeorm/entities/Owners';

interface IRequest {
  owner_id: string;
}

@injectable()
class FindOwnerByIdService {
  constructor(
    @inject('OwnerRepository')
    private ownersRepository: IOwnerRepository,
  ) {}

  public async execute({ owner_id }: IRequest): Promise<Owner> {
    const owner = await this.ownersRepository.findById(owner_id);
    if (!owner) {
      throw new AppError('Owner not found');
    }
    return owner;
  }
}

export default FindOwnerByIdService;
