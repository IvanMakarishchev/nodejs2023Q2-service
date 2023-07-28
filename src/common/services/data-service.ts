import { Injectable } from '@nestjs/common';
import { Album, Artist, DataBase, Track, User } from '../interfaces/interfaces';
import { BASIC_DATABASE } from '../constants';

@Injectable()
export class DataService {
  private dataBase: DataBase = BASIC_DATABASE;

  createUser(dto: User) {
    this.dataBase.users.push(dto);
  }

  getAllUsers() {
    return this.dataBase.users;
  }

  updateUser(id: number, dto: User) {
    this.dataBase.users[id] = dto;
  }

  deleteUser(id: string) {
    this.dataBase.users = this.dataBase.users.filter((user) => user.id !== id);
  }

  createTrack(dto: Track) {
    this.dataBase.tracks.push(dto);
  }

  getAllTracks() {
    return this.dataBase.tracks;
  }

  updateTrack(id: number, dto: Track) {
    this.dataBase.tracks[id] = dto;
  }

  deleteTrack(id: string) {
    this.dataBase.tracks = this.dataBase.tracks.filter(
      (track) => track.id !== id,
    );
  }

  createArtist(dto: Artist) {
    this.dataBase.artists.push(dto);
  }

  getAllArtists() {
    return this.dataBase.artists;
  }

  updateArtist(id: number, dto: Artist) {
    this.dataBase.artists[id] = dto;
  }

  deleteArtist(id: string) {
    this.dataBase.artists = this.dataBase.artists.filter(
      (artist) => artist.id !== id,
    );
  }

  createAlbum(dto: Album) {
    this.dataBase.albums.push(dto);
  }

  getAllAlbums() {
    return this.dataBase.albums;
  }

  updateAlbum(id: number, dto: Album) {
    this.dataBase.albums[id] = dto;
  }

  deleteAlbum(id: string) {
    this.dataBase.albums = this.dataBase.albums.filter(
      (album) => album.id !== id,
    );
  }

  getAllFavs() {
    return this.dataBase.favorites;
  }

  addTrackToFav(id: string) {
    this.dataBase.favorites.tracks.push(id);
  }

  getAllTrackFavs() {
    return this.dataBase.favorites.tracks;
  }

  deleteTrackFav(id: string) {
    this.dataBase.favorites.tracks = this.dataBase.favorites.tracks.filter(
      (ID) => ID !== id,
    );
  }

  addArtistToFav(id: string) {
    this.dataBase.favorites.artists.push(id);
  }

  getAllArtistFavs() {
    return this.dataBase.favorites.artists;
  }

  deleteArtistFav(id: string) {
    this.dataBase.favorites.artists = this.dataBase.favorites.artists.filter(
      (ID) => ID !== id,
    );
  }

  addAlbumToFav(id: string) {
    this.dataBase.favorites.albums.push(id);
  }

  getAllAlbumFavs() {
    return this.dataBase.favorites.albums;
  }

  deleteAlbumFav(id: string) {
    this.dataBase.favorites.albums = this.dataBase.favorites.albums.filter(
      (ID) => ID !== id,
    );
  }
}
