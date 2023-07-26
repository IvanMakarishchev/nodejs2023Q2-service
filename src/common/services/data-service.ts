import { Injectable } from '@nestjs/common';
import {
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

  updateUser(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.getUserById(id);
    if (!user) return false;
    const { password: pas, ...safeData } = user;
    if (pas !== updatePasswordDto.oldPassword) return null;
    const userUpdatedData: User = {
      ...safeData,
      password: updatePasswordDto.newPassword,
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

  updateTrack(id: string, updateTrackDto: Track) {
    const track = this.getTrack(id);
    if (!track) return false;
    const trackIndex = this.dataBase.tracks.findIndex(
      (track) => track.id === id,
    );
    this.dataBase.tracks[trackIndex] = {
      ...track,
      ...updateTrackDto,
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

  updateArtist(id: string, updateArtistDto: Artist) {
    const artist = this.getArtist(id);
    if (!artist) return false;
    const artistIndex = this.dataBase.artists.findIndex(
      (artist) => artist.id === id,
    );
    this.dataBase.artists[artistIndex] = {
      ...artist,
      ...updateArtistDto,
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
    this.dataBase.artists = this.dataBase.artists.filter(
      (artist) => artist.id !== id,
    );
    return artist;
  }
}
