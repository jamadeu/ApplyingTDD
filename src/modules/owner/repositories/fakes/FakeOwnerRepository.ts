import { uuid } from 'uuidv4';
import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import ICreateOwnerDTO from '@modules/owner/dtos/ICreateOwnerDTO';
import Owner from '@modules/owner/typeorm/entities/Owners';

class FakeOwnerRepository implements IOwnerRepository {
  private owners: Owner[] = [];

  public async create(ownerData: ICreateOwnerDTO): Promise<Owner> {
    const owner = new Owner();
    Object.assign(owner, { id: uuid() }, ownerData);
    this.owners.push(owner);
    return owner;
  }

  public async findById(id: string): Promise<Owner | undefined> {
    return this.owners.find(owner => owner.id === id);
  }

  public async findByEmail(email: string): Promise<Owner | undefined> {
    return this.owners.find(owner => owner.email === email);
  }

  public async update(owner: Owner): Promise<Owner> {
    const findIndex = this.owners.findIndex(
      findOwner => findOwner.id === owner.id,
    );
    this.owners[findIndex] = owner;
    return owner;
  }
}

export default FakeOwnerRepository;
