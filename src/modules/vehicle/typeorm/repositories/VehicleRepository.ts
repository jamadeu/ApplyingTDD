import { getRepository, Repository } from 'typeorm';
import IVehicleRepository from '@modules/vehicle/repositories/IVehicleRepository';
import Vehicle from '@modules/vehicle/typeorm/entities/Vehicle';
import ICreateVehicleDTO from '@modules/vehicle/dtos/ICreateVehicleDTO';
// TODO
class VehicleRepository implements IVehicleRepository {
  private ormRepository: Repository<Vehicle>;

  constructor() {
    this.ormRepository = getRepository(Vehicle);
  }

  public async create(data: ICreateVehicleDTO): Promise<Vehicle> {}

  public async update(vehicle: Vehicle): Promise<Vehicle> {}

  public async findById(id: string): Promise<Vehicle | undefined> {}

  public async findByOwner(owner_id: string): Promise<Vehicle[]> {}
}

export default VehicleRepository;
