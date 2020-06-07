import AppError from '@shared/errors/AppErrors';
import FakeOwnerRepository from '@modules/owner/repositories/fakes/FakeOwnerRepository';
import CreateOwnerService from './CreateOwnerService';
import FindOwnerByIdService from './FindOwnerByIdService';

let fakeOwnerRepository: FakeOwnerRepository;
let createOwner: CreateOwnerService;
let findOwnerById: FindOwnerByIdService;

describe('FindOwnerById', () => {
  beforeEach(() => {
    fakeOwnerRepository = new FakeOwnerRepository();
    createOwner = new CreateOwnerService(fakeOwnerRepository);
    findOwnerById = new FindOwnerByIdService(fakeOwnerRepository);
  });

  it('be able to find a owner by id', async () => {
    const owner = await createOwner.execute({
      name: 'Jhon Doe',
      phone: '99-999999999',
      email: 'jhondoe@example.com',
    });

    const findedOwner = await findOwnerById.execute({
      owner_id: owner.id,
    });

    expect(findedOwner.name).toBe('Jhon Doe');
    expect(findedOwner.phone).toBe('99-999999999');
    expect(findedOwner.email).toBe('jhondoe@example.com');
  });

  it('not be able to find a owner by id with a invalid id', async () => {
    await expect(
      findOwnerById.execute({
        owner_id: 'invalid id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
