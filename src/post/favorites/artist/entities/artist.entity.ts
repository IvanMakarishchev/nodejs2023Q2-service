import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavArtists {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  artistId: string;
}
