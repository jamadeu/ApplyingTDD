import Owner from '@modules/owner/typeorm/entities/Owners';
import IOwnerCreateDTO from '@modules/owner/dtos/ICreateOwnerDTO';

export default interface IOwnerRepository {
  create(data: IOwnerCreateDTO): Promise<Owner>;
  update(owner: Owner): Promise<Owner>;
  findById(id: string): Promise<Owner | undefined>;
  findByEmail(email: string): Promise<Owner | undefined>;
}
