import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import IVehicleRepository from '@modules/vehicle/repositories/IVehicleRepository';
import Vehicle from '@modules/vehicle/typeorm/entities/Vehicle';

interface IRequest {
  id: string;
  model: string;
  brand: string;
  license_plate: string;
  owner_id: string;
  status: string;
}

@injectable()
class UpdateVehicleService {
  constructor(
    @inject('VehicleRepository')
    private vehiclesRepository: IVehicleRepository,
  ) {}

  public async execute({
    id,
    model,
    brand,
    license_plate,
    owner_id,
    status,
  }: IRequest): Promise<Vehicle> {
    const toUpdatevehicle = await this.vehiclesRepository.findById(id);
    if (!toUpdatevehicle) {
      throw new AppError('Vehicle not found');
    }

    const updatedVehicle = Object.assign(toUpdatevehicle, {
      id,
      model,
      brand,
      license_plate,
      owner_id,
      status,
    });

    this.vehiclesRepository.update(updatedVehicle);
    return updatedVehicle;
  }
}

export default UpdateVehicleService;
