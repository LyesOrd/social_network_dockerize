import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Like } from './like.entity';

@Entity('images') // Nom de la table
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.images, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Like, (like) => like.image)
  likes: Like[];
}
