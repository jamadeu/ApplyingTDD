import AppError from '@shared/errors/AppErrors';
import FakeOwnerRepository from '@modules/owner/repositories/fakes/FakeOwnerRepository';
import CreateOwnerService from './CreateOwnerService';
import UpdateOwnerService from './UpdateOwnerService';

let fakeOwnerRepository: FakeOwnerRepository;
let createOwner: CreateOwnerService;
let updateOwner: UpdateOwnerService;

describe('UpdateOwner', () => {
  beforeEach(() => {
    fakeOwnerRepository = new FakeOwnerRepository();
    createOwner = new CreateOwnerService(fakeOwnerRepository);
    updateOwner = new UpdateOwnerService(fakeOwnerRepository);
  });

  it('be able to update a new owner', async () => {
    const owner = await createOwner.execute({
      name: 'Jhon Doe',
      phone: '99-999999999',
      email: 'jhondoe@example.com',
    });

    const updated = await updateOwner.execute({
      owner_id: owner.id,
      name: 'Jhon Doe',
      phone: '00-000000000',
      email: 'jhondoe@example.com',
    });

    expect(updated.phone).toBe('00-000000000');
    expect(updated.email).toBe('jhondoe@example.com');
  });

  it('not be able to update a owner with a invalid id', async () => {
    await expect(
      updateOwner.execute({
        owner_id: 'invalid id',
        name: 'Jhon Doe',
        phone: '99-999999999',
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not be able to update email owner with a email already in use', async () => {
    await createOwner.execute({
      name: 'Jhon Doe',
      phone: '99-999999999',
      email: 'jhondoe@example.com',
    });

    const owner = await createOwner.execute({
      name: 'Jane Doe',
      phone: '99-999999999',
      email: 'janedoe@example.com',
    });

    await expect(
      updateOwner.execute({
        owner_id: owner.id,
        name: 'Jane Doe',
        phone: '99-999999999',
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
