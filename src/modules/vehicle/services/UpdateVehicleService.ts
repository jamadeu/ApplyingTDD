import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import IVehicleRepository from '@modules/vehicle/repositories/IVehicleRepository';
import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import Vehicle from '@modules/vehicle/typeorm/entities/Vehicle';

interface IRequest {
  id: string;
  model: string;
  brand: string;
  license_plate: string;
  owner_id: string;
  status: 'Na fila' | 'Em revisão' | 'revisado';
}

@injectable()
class UpdateVehicleService {
  constructor(
    @inject('VehicleRepository')
    private vehiclesRepository: IVehicleRepository,

    @inject('OwnerRepository')
    private ownerRepository: IOwnerRepository,
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

    if (license_plate !== toUpdatevehicle.license_plate) {
      const licensePlateInUse = await this.vehiclesRepository.findByLicensePlate(
        license_plate,
      );

      if (licensePlateInUse) {
        throw new AppError('License plate already in use');
      }
    }

    const owenrExists = await this.ownerRepository.findById(owner_id);
    if (!owenrExists && owner_id !== toUpdatevehicle.owner_id) {
      throw new AppError('Owner not found');
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
