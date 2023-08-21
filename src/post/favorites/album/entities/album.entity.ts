import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavAlbums {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  albumId: string;
}
