import { MigrationInterface, QueryRunner } from 'typeorm'

export class favoriteGenres1661388727422 implements MigrationInterface {
	name = 'favoriteGenres1661388727422'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user_favorite_genres_genre" ("userId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_64f134ecbe336cab2871d844d35" PRIMARY KEY ("userId", "genreId"))`,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_708de8eb5fb7eb6282008cd59d" ON "user_favorite_genres_genre" ("userId") `,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_9405c8702cd878e5a350b1bc39" ON "user_favorite_genres_genre" ("genreId") `,
		)
		await queryRunner.query(
			`ALTER TABLE "user_favorite_genres_genre" ADD CONSTRAINT "FK_708de8eb5fb7eb6282008cd59d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
		await queryRunner.query(
			`ALTER TABLE "user_favorite_genres_genre" ADD CONSTRAINT "FK_9405c8702cd878e5a350b1bc39b" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user_favorite_genres_genre" DROP CONSTRAINT "FK_9405c8702cd878e5a350b1bc39b"`,
		)
		await queryRunner.query(
			`ALTER TABLE "user_favorite_genres_genre" DROP CONSTRAINT "FK_708de8eb5fb7eb6282008cd59d1"`,
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_9405c8702cd878e5a350b1bc39"`,
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_708de8eb5fb7eb6282008cd59d"`,
		)
		await queryRunner.query(`DROP TABLE "user_favorite_genres_genre"`)
	}
}
