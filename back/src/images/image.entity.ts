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

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  url: string; // URL de l'image (par exemple un lien ou un chemin sur le serveur)

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.images, { onDelete: 'CASCADE' })
  user: User; // Propriétaire de l'image

  @OneToMany(() => Like, (like) => like.image)
  likes: Like[]; // Liste des likes associés à l'image
}
