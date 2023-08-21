import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1692650129604 implements MigrationInterface {
    name = 'Init1692650129604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" character varying, "albumId" character varying, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav_albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "albumId" uuid NOT NULL, CONSTRAINT "PK_6c77bca2014469e107d68d25187" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav_artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artistId" uuid NOT NULL, CONSTRAINT "PK_e57499b114b13031b5a5ac8f95c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav_tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trackId" uuid NOT NULL, CONSTRAINT "PK_5288c864aa552bb91690d9c4297" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "fav_tracks"`);
        await queryRunner.query(`DROP TABLE "fav_artists"`);
        await queryRunner.query(`DROP TABLE "fav_albums"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "album"`);
    }

}
