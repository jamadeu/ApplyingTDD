import Vehicle from '@modules/vehicle/typeorm/entities/Vehicle';
import ICreateVehicleDTO from '@modules/vehicle/dtos/ICreateVehicleDTO';

export default interface IVehicleRepository {
  create(date: ICreateVehicleDTO): Promise<Vehicle>;
  update(vehicle: Vehicle): Promise<Vehicle>;
  findById(id: string): Promise<Vehicle | undefined>;
  findAllByOwner(owner_id: string): Promise<Vehicle[]>;
}
