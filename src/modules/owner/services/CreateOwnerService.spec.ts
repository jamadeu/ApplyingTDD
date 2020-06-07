import AppError from '@shared/errors/AppErrors';
import FakeOwnerRepository from '@modules/owner/repositories/fakes/FakeOwnerRepository';
import CreateOwnerService from './CreateOwnerService';

let fakeOwnerRepository: FakeOwnerRepository;
let createOwner: CreateOwnerService;

describe('CreateOwner', () => {
  beforeEach(() => {
    fakeOwnerRepository = new FakeOwnerRepository();
    createOwner = new CreateOwnerService(fakeOwnerRepository);
  });

  it('be able to create a new owner', async () => {
    const owner = await createOwner.execute({
      name: 'Jhon Doe',
      phone: '99-999999999',
      email: 'jhondoe@example.com',
    });

    expect(owner).toHaveProperty('id');
    expect(owner.phone).toBe('99-999999999');
    expect(owner.email).toBe('jhondoe@example.com');
  });

  it('not be able to create a new owner with a email already used', async () => {
    await createOwner.execute({
      name: 'Jhon Doe',
      phone: '99-999999999',
      email: 'jhondoe@example.com',
    });

    await expect(
      createOwner.execute({
        name: 'Jhon Doe',
        phone: '99-999999999',
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
