import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Owner from '@modules/owner/typeorm/entities/Owners';

@Entity('vehicles')
class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  model: string;

  @Column()
  brand: string;

  @Column('uuid')
  owner_id: string;

  @Column()
  status: string;

  @ManyToOne(() => Owner, { eager: true })
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Vehicle;
