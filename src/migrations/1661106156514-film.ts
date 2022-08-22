import { MigrationInterface, QueryRunner } from 'typeorm'

export class film1661106156514 implements MigrationInterface {
	name = 'film1661106156514'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "film" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "desc" character varying NOT NULL, "image" character varying NOT NULL, "video" character varying NOT NULL, "views" integer NOT NULL DEFAULT '0', "releaseDate" date NOT NULL, "rating" integer NOT NULL DEFAULT '0', "duration" integer NOT NULL, CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY ("id"))`,
		)
		await queryRunner.query(
			`CREATE TABLE "film_actors_actor" ("filmId" integer NOT NULL, "actorId" integer NOT NULL, CONSTRAINT "PK_f7723b5dc3e7af33c4dc0e7a3c5" PRIMARY KEY ("filmId", "actorId"))`,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_a540bbf20a9849769cccf1b344" ON "film_actors_actor" ("filmId") `,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_7d54dc82814adf8d0a679a5475" ON "film_actors_actor" ("actorId") `,
		)
		await queryRunner.query(
			`CREATE TABLE "film_genres_genre" ("filmId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_d3631824680cfe84393ec4525b9" PRIMARY KEY ("filmId", "genreId"))`,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_a67a97774005861bc040612e33" ON "film_genres_genre" ("filmId") `,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_154ad77df90384e3d5886d36d2" ON "film_genres_genre" ("genreId") `,
		)
		await queryRunner.query(
			`ALTER TABLE "film_actors_actor" ADD CONSTRAINT "FK_a540bbf20a9849769cccf1b3443" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
		await queryRunner.query(
			`ALTER TABLE "film_actors_actor" ADD CONSTRAINT "FK_7d54dc82814adf8d0a679a54756" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
		await queryRunner.query(
			`ALTER TABLE "film_genres_genre" ADD CONSTRAINT "FK_a67a97774005861bc040612e33d" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
		await queryRunner.query(
			`ALTER TABLE "film_genres_genre" ADD CONSTRAINT "FK_154ad77df90384e3d5886d36d28" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "film_genres_genre" DROP CONSTRAINT "FK_154ad77df90384e3d5886d36d28"`,
		)
		await queryRunner.query(
			`ALTER TABLE "film_genres_genre" DROP CONSTRAINT "FK_a67a97774005861bc040612e33d"`,
		)
		await queryRunner.query(
			`ALTER TABLE "film_actors_actor" DROP CONSTRAINT "FK_7d54dc82814adf8d0a679a54756"`,
		)
		await queryRunner.query(
			`ALTER TABLE "film_actors_actor" DROP CONSTRAINT "FK_a540bbf20a9849769cccf1b3443"`,
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_154ad77df90384e3d5886d36d2"`,
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_a67a97774005861bc040612e33"`,
		)
		await queryRunner.query(`DROP TABLE "film_genres_genre"`)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_7d54dc82814adf8d0a679a5475"`,
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_a540bbf20a9849769cccf1b344"`,
		)
		await queryRunner.query(`DROP TABLE "film_actors_actor"`)
		await queryRunner.query(`DROP TABLE "film"`)
	}
}
