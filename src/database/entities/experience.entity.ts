import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profesion } from './profesion.entity';

@Entity({ name: 'experiences' })
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    default:
      'https://www.netambulo.com/storage/2011/12/404-not-found-gatito.jpg',
    nullable: true,
  })
  imgUrl: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  date: string;

  @ManyToOne(() => Profesion, (profesion) => profesion.experiences)
  @JoinColumn({ name: 'profesion_ID' })
  profesion: Profesion;
}