import AppError from '@shared/errors/AppErrors';
import FakeVehicleRepository from '@modules/vehicle/repositories/fakes/FakeVehicleRepository';
import FakeOwnerRepository from '@modules/owner/repositories/fakes/FakeOwnerRepository';
import CreateOwnerService from '@modules/owner/services/CreateOwnerService';
import CreateVehicleService from './CreateVehicleService';
import UpdateVehicleService from './UpdateVehicleService';

let fakeVehicleRepository: FakeVehicleRepository;
let createVehicle: CreateVehicleService;
let fakeOwnerRepository: FakeOwnerRepository;
let createOwner: CreateOwnerService;
let updateVehicle: UpdateVehicleService;

describe('UpdateVehicle', () => {
  beforeEach(() => {
    fakeOwnerRepository = new FakeOwnerRepository();
    createOwner = new CreateOwnerService(fakeOwnerRepository);

    fakeVehicleRepository = new FakeVehicleRepository();
    createVehicle = new CreateVehicleService(fakeVehicleRepository);
    updateVehicle = new UpdateVehicleService(
      fakeVehicleRepository,
      fakeOwnerRepository,
    );
  });

  it('be able to update a vehicle', async () => {
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

    const updatedVehicle = await updateVehicle.execute({
      id: vehicle.id,
      model: 'Uno',
      brand: 'Fiat',
      license_plate: 'aaa-bbb',
      owner_id: owner.id,
      status: 'Na fila',
    });

    expect(updatedVehicle).toHaveProperty('id');
    expect(updatedVehicle.model).toBe('Uno');
    expect(updatedVehicle.brand).toBe('Fiat');
    expect(updatedVehicle.license_plate).toBe('aaa-bbb');
    expect(updatedVehicle.owner_id).toBe(owner.id);
    expect(updatedVehicle.status).toBe('Na fila');
  });

  it('not be able to update a vehicle with a invalid id', async () => {
    await expect(
      updateVehicle.execute({
        id: 'invalid-id',
        model: 'Uno',
        brand: 'Fiat',
        license_plate: 'aaa-bbb',
        owner_id: 'owner.id',
        status: 'Na fila',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not be able to update a license_plate to one that is already in use', async () => {
    const owner = await createOwner.execute({
      name: 'Jhon Doe',
      phone: '99-999999999',
      email: 'jhondoe@example.com',
    });

    await createVehicle.execute({
      model: 'Uno',
      brand: 'Fiat',
      license_plate: 'aaa-aaa',
      owner_id: owner.id,
      status: 'Na fila',
    });

    const vehicle = await createVehicle.execute({
      model: 'Uno',
      brand: 'Fiat',
      license_plate: 'bbb-bbb',
      owner_id: owner.id,
      status: 'Na fila',
    });

    await expect(
      updateVehicle.execute({
        id: vehicle.id,
        model: 'Uno',
        brand: 'Fiat',
        license_plate: 'aaa-aaa',
        owner_id: owner.id,
        status: 'Na fila',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not be able to change the owner_id to a invalid one', async () => {
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

    await expect(
      updateVehicle.execute({
        id: vehicle.id,
        model: 'Uno',
        brand: 'Fiat',
        license_plate: 'aaa-aaa',
        owner_id: 'invalid id',
        status: 'Na fila',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
