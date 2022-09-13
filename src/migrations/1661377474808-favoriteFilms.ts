import { MigrationInterface, QueryRunner } from 'typeorm'

export class favoriteFilms1661377474808 implements MigrationInterface {
	name = 'favoriteFilms1661377474808'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user_favorite_films_film" ("userId" integer NOT NULL, "filmId" integer NOT NULL, CONSTRAINT "PK_2ce7c9d5b1c2eb03ed56529a99e" PRIMARY KEY ("userId", "filmId"))`,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_7a61fa14a21660b12d4837de2d" ON "user_favorite_films_film" ("userId") `,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_8d5382882519f3e2761f5be4a6" ON "user_favorite_films_film" ("filmId") `,
		)
		await queryRunner.query(
			`ALTER TABLE "user_favorite_films_film" ADD CONSTRAINT "FK_7a61fa14a21660b12d4837de2d7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
		await queryRunner.query(
			`ALTER TABLE "user_favorite_films_film" ADD CONSTRAINT "FK_8d5382882519f3e2761f5be4a6b" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user_favorite_films_film" DROP CONSTRAINT "FK_8d5382882519f3e2761f5be4a6b"`,
		)
		await queryRunner.query(
			`ALTER TABLE "user_favorite_films_film" DROP CONSTRAINT "FK_7a61fa14a21660b12d4837de2d7"`,
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_8d5382882519f3e2761f5be4a6"`,
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_7a61fa14a21660b12d4837de2d"`,
		)
		await queryRunner.query(`DROP TABLE "user_favorite_films_film"`)
	}
}
