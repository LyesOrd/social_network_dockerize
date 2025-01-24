import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../users/user.entity';
import { Image } from './image.entity';

@Entity('likes') // Nom de la table
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  user: User; // L'utilisateur qui a liké ou disliké

  @ManyToOne(() => Image, (image) => image.likes, { onDelete: 'CASCADE' })
  image: Image; // L'image qui a été likée ou dislikée

  @Column({ type: 'boolean' })
  isLike: boolean; // True = Like, False = Dislike
}
