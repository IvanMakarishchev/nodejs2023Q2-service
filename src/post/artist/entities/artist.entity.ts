import { Album } from 'src/post/album/entities/album.entity';
import { Track } from 'src/post/track/entities/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artistId)
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.artistId)
  albums: Album[];
}
