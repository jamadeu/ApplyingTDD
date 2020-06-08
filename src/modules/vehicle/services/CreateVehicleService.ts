import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import IVehicleRepository from '@modules/vehicle/repositories/IVehicleRepository';
import Vehicle from '@modules/vehicle/typeorm/entities/Vehicle';

interface IRequest {
  model: string;
  brand: string;
  license_plate: string;
  owner_id: string;
  status: 'Na fila' | 'Em revisão' | 'Revisado';
}

@injectable()
class CreateVehicleService {
  constructor(
    @inject('VehicleRepository')
    private vehiclesRepository: IVehicleRepository,
  ) {}

  public async execute({
    model,
    brand,
    license_plate,
    owner_id,
    status,
  }: IRequest): Promise<Vehicle> {
    const vehicleExists = await this.vehiclesRepository.findByLicensePlate(
      license_plate,
    );
    if (vehicleExists) {
      throw new AppError('Vehicle already exists');
    }
    const vehicle = await this.vehiclesRepository.create({
      model,
      brand,
      license_plate,
      owner_id,
      status,
    });

    return vehicle;
  }
}

export default CreateVehicleService;
