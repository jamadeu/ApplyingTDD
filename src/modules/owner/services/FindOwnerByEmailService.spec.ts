import AppError from '@shared/errors/AppErrors';
import FakeOwnerRepository from '@modules/owner/repositories/fakes/FakeOwnerRepository';
import CreateOwnerService from './CreateOwnerService';
import FindOwnerByEmailService from './FindOwnerByEmailService';

let fakeOwnerRepository: FakeOwnerRepository;
let createOwner: CreateOwnerService;
let findOwnerByEmail: FindOwnerByEmailService;

describe('FindOwnerByEmail', () => {
  beforeEach(() => {
    fakeOwnerRepository = new FakeOwnerRepository();
    createOwner = new CreateOwnerService(fakeOwnerRepository);
    findOwnerByEmail = new FindOwnerByEmailService(fakeOwnerRepository);
  });

  it('be able to find a owner by email', async () => {
    const owner = await createOwner.execute({
      name: 'Jhon Doe',
      phone: '99-999999999',
      email: 'jhondoe@example.com',
    });

    const findedOwner = await findOwnerByEmail.execute({
      email: owner.email,
    });

    expect(findedOwner.name).toBe('Jhon Doe');
    expect(findedOwner.phone).toBe('99-999999999');
    expect(findedOwner.email).toBe('jhondoe@example.com');
  });

  it('not be able to find a owner by email with a invalid email', async () => {
    await expect(
      findOwnerByEmail.execute({
        email: 'invalid email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
