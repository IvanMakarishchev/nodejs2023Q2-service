import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/post/album/entities/album.entity';
import { Repository } from 'typeorm';
import { FavAlbums } from './entities/album.entity';

@Injectable()
export class FavAlbumService {
  constructor(
    @InjectRepository(FavAlbums)
    private readonly favAlbumRepository: Repository<FavAlbums>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
  ) {}

  async addAlbum(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) return false;
    const dto = this.favAlbumRepository.create({ albumId: id });
    await this.favAlbumRepository.save(dto);
    return id;
  }

  async findAllAlbumsFavs() {
    return await this.favAlbumRepository.find();
  }

  async removeAlbumFromFavs(id: string) {
    return await this.favAlbumRepository.delete({ albumId: id });
  }
}
