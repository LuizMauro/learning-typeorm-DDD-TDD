import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp')
  date: Date;
}

export default Appointment;
