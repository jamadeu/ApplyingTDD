import { getRepository, Repository } from 'typeorm';
import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import ICreateOwnerDTO from '@modules/owner/dtos/ICreateOwnerDTO';
import Owner from '@modules/owner/typeorm/entities/Owners';

class OwnerRepository implements IOwnerRepository {
  private ormRepository: Repository<Owner>;

  constructor() {
    this.ormRepository = getRepository(Owner);
  }

  public async create(ownerData: ICreateOwnerDTO): Promise<Owner> {
    const owner = this.ormRepository.create(ownerData);
    await this.ormRepository.save(owner);
    return owner;
  }

  public async update(owner: Owner): Promise<Owner> {
    return this.ormRepository.save(owner);
  }

  public async findById(id: string): Promise<Owner | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<Owner | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }
}

export default OwnerRepository;
