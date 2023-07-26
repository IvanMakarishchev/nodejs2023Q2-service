import { Injectable } from '@nestjs/common';
import {
  Album,
  Artist,
  DataBase,
  Track,
  UpdatePasswordDto,
  User,
} from '../interfaces/interfaces';
import { BASIC_DATABASE } from '../constants';

@Injectable()
export class DataService {
  private dataBase: DataBase = BASIC_DATABASE;

  getUserById(id: string) {
    return this.dataBase.users.find((user) => user.id === id);
  }

  createUser(dto: User) {
    this.dataBase.users.push(dto);
    const { password, ...safeData } = dto;
    return safeData;
  }

  getAllUsers() {
    const res = this.dataBase.users.map((user) => {
      const { password, ...safeData } = user;
      return safeData;
    });
    return res;
  }

  getUser(id: string) {
    const user = this.getUserById(id);
    if (!user) return false;
    const { password, ...safeData } = user;
    return safeData;
  }

  updateUser(id: string, dto: UpdatePasswordDto) {
    const user = this.getUserById(id);
    if (!user) return false;
    const { password: pas, ...safeData } = user;
    if (pas !== dto.oldPassword) return null;
    const userUpdatedData: User = {
      ...safeData,
      password: dto.newPassword,
      version: safeData.version + 1,
      updatedAt: Date.now(),
    };
    const userIndex = this.dataBase.users.findIndex((user) => user.id === id);
    this.dataBase.users[userIndex] = userUpdatedData;
    const { password, ...resData } = userUpdatedData;
    return resData;
  }

  deleteUser(id: string) {
    const user = this.getUserById(id);
    if (!user) return false;
    this.dataBase.users = this.dataBase.users.filter((user) => user.id !== id);
    return user;
  }

  createTrack(dto: Track) {
    this.dataBase.tracks.push(dto);
    return dto;
  }

  getAllTracks() {
    return this.dataBase.tracks;
  }

  getTrack(id: string) {
    const track = this.dataBase.tracks.find((track) => track.id === id);
    return track ? track : false;
  }

  updateTrack(id: string, dto: Track) {
    const track = this.getTrack(id);
    if (!track) return false;
    const trackIndex = this.dataBase.tracks.findIndex(
      (track) => track.id === id,
    );
    this.dataBase.tracks[trackIndex] = {
      ...track,
      ...dto,
    };
    return this.dataBase.tracks[trackIndex];
  }

  deleteTrack(id: string) {
    const track = this.getTrack(id);
    if (!track) return false;
    this.dataBase.tracks = this.dataBase.tracks.filter(
      (track) => track.id !== id,
    );
    return track;
  }

  createArtist(dto: Artist) {
    this.dataBase.artists.push(dto);
    return dto;
  }

  getAllArtists() {
    return this.dataBase.artists;
  }

  getArtist(id: string) {
    const artist = this.dataBase.artists.find((artist) => artist.id === id);
    return artist ? artist : false;
  }

  updateArtist(id: string, dto: Artist) {
    const artist = this.getArtist(id);
    if (!artist) return false;
    const artistIndex = this.dataBase.artists.findIndex(
      (artist) => artist.id === id,
    );
    this.dataBase.artists[artistIndex] = {
      ...artist,
      ...dto,
    };
    return this.dataBase.artists[artistIndex];
  }

  deleteArtist(id: string) {
    const artist = this.getArtist(id);
    if (!artist) return false;
    this.dataBase.tracks = this.dataBase.tracks.map((track) => {
      return {
        ...track,
        artistId: track.artistId === id ? null : track.artistId,
      };
    });
    this.dataBase.albums = this.dataBase.albums.map((album) => {
      return {
        ...album,
        artistId: album.artistId === id ? null : album.artistId,
      };
    });
    this.dataBase.artists = this.dataBase.artists.filter(
      (artist) => artist.id !== id,
    );
    return artist;
  }

  createAlbum(dto: Album) {
    this.dataBase.albums.push(dto);
    return dto;
  }

  getAllAlbums() {
    return this.dataBase.albums;
  }

  getAlbum(id: string) {
    const album = this.dataBase.albums.find((album) => album.id === id);
    return album ? album : false;
  }

  updateAlbum(id: string, dto: Album) {
    const album = this.getAlbum(id);
    if (!album) return false;
    const albumIndex = this.dataBase.albums.findIndex(
      (album) => album.id === id,
    );
    this.dataBase.albums[albumIndex] = {
      ...album,
      ...dto,
    };
    return this.dataBase.albums[albumIndex];
  }

  deleteAlbum(id: string) {
    const album = this.getAlbum(id);
    if (!album) return false;
    this.dataBase.tracks = this.dataBase.tracks.map((track) => {
      return {
        ...track,
        albumId: track.albumId === id ? null : track.albumId,
      };
    });
    this.dataBase.albums = this.dataBase.albums.filter(
      (album) => album.id !== id,
    );
    return album;
  }
}
