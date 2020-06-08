export default interface ICreateVehicleDTO {
  model: string;
  brand: string;
  license_plate: string;
  owner_id: string;
  status: 'Na fila' | 'Em revisão' | 'Revisado';
}
