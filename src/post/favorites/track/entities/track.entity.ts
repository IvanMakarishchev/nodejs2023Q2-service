import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavTracks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  trackId: string;
}
