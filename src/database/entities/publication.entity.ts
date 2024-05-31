import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Profesion } from './profesion.entity';

@Entity({ name: 'publications' })
export class Publicaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  description: string;

  @ManyToOne(() => Profesion, (profesion) => profesion)
  @JoinColumn({ name: 'profesion_ID' })
  profesion: Profesion;

  @Column({
    type: 'text',
    nullable: true,
  })
  imgUrl: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  date: Date;

  @Column({ nullable: true })
  time: string;

  @Column({ nullable: true })
  timelapse: string;

  @ManyToOne(() => User, (user) => user.publicactions)
  @JoinColumn({ name: 'user_ID' })
  user: User;
}
