import { container } from 'tsyringe';

import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import OwnerRepository from '@modules/owner/typeorm/repositories/OwnerRepository';

import IVehicleRepository from '@modules/vehicle/repositories/IVehicleRepository';
import VehicleRepository from '@modules/vehicle/typeorm/repositories/VehicleRepository';

container.registerSingleton<IOwnerRepository>(
  'OwnerRepository',
  OwnerRepository,
);

container.registerSingleton<IVehicleRepository>(
  'VehicleRepository',
  VehicleRepository,
);
