import { container } from 'tsyringe';

import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import OwnerRepository from '@modules/owner/typeorm/repositories/OwnerRepository';

container.registerSingleton<IOwnerRepository>(
  'OwnerRepository',
  OwnerRepository,
);
