import { uuid } from 'uuidv4';
import ICreateVehicleDTO from '@modules/vehicle/dtos/ICreateVehicleDTO';
import IVehicleRepository from '@modules/vehicle/repositories/IVehicleRepository';
import Vehicle from '@modules/vehicle/typeorm/entities/Vehicle';

class FakeVehicleRepository implements IVehicleRepository {
  private vehicles: Vehicle[] = [];

  public async create(vehicleData: ICreateVehicleDTO): Promise<Vehicle> {
    const vehicle = new Vehicle();
    Object.assign(vehicle, { id: uuid() }, vehicleData);
    this.vehicles.push(vehicle);
    return vehicle;
  }

  public async update(vehicle: Vehicle): Promise<Vehicle> {
    const findIndex = this.vehicles.findIndex(
      findVehicle => findVehicle.id === vehicle.id,
    );
    this.vehicles[findIndex] = vehicle;
    return vehicle;
  }

  public async findById(id: string): Promise<Vehicle | undefined> {
    return this.vehicles.find(vehicle => vehicle.id === id);
  }

  public async findAllByOwner(owner_id: string): Promise<Vehicle[]> {
    return this.vehicles.filter(vehicle => vehicle.owner_id === owner_id);
  }

  public async changeStatus(
    vehicle: Vehicle,
    status: string,
  ): Promise<Vehicle> {
    const findIndex = this.vehicles.findIndex(
      findVehicle => findVehicle.id === vehicle.id,
    );
    vehicle.status = status;
    this.vehicles[findIndex] = vehicle;
    return vehicle;
  }

  public async findByLicensePlate(
    license_plate: string,
  ): Promise<Vehicle | undefined> {
    return this.vehicles.find(
      vehicle => vehicle.license_plate === license_plate,
    );
  }
}

export default FakeVehicleRepository;
