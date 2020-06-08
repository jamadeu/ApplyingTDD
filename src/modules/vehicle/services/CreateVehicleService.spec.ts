import AppError from '@shared/errors/AppErrors';
import FakeVehicleRepository from '@modules/vehicle/repositories/fakes/FakeVehicleRepository';
import FakeOwnerRepository from '@modules/owner/repositories/fakes/FakeOwnerRepository';
import CreateOwnerService from '@modules/owner/services/CreateOwnerService';
import CreateVehicleService from './CreateVehicleService';

let fakeVehicleRepository: FakeVehicleRepository;
let createVehicle: CreateVehicleService;
let fakeOwnerRepository: FakeOwnerRepository;
let createOwner: CreateOwnerService;

describe('CreateVehicle', () => {
  beforeEach(() => {
    fakeOwnerRepository = new FakeOwnerRepository();
    createOwner = new CreateOwnerService(fakeOwnerRepository);

    fakeVehicleRepository = new FakeVehicleRepository();
    createVehicle = new CreateVehicleService(fakeVehicleRepository);
  });

  it('be able to create a new vehicle', async () => {
    const owner = await createOwner.execute({
      name: 'Jhon Doe',
      phone: '99-999999999',
      email: 'jhondoe@example.com',
    });

    const vehicle = await createVehicle.execute({
      model: 'Uno',
      brand: 'Fiat',
      license_plate: 'aaa-aaa',
      owner_id: owner.id,
      status: 'Na fila',
    });

    expect(vehicle).toHaveProperty('id');
    expect(vehicle.model).toBe('Uno');
    expect(vehicle.brand).toBe('Fiat');
    expect(vehicle.license_plate).toBe('aaa-aaa');
    expect(vehicle.owner_id).toBe(owner.id);
    expect(vehicle.status).toBe('Na fila');
  });
});
