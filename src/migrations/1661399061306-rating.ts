import { MigrationInterface, QueryRunner } from 'typeorm'

export class rating1661399061306 implements MigrationInterface {
	name = 'rating1661399061306'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."rating_resoursetype_enum" AS ENUM('FILM', 'SERIES')`,
		)
		await queryRunner.query(
			`CREATE TABLE "rating" ("userId" integer NOT NULL, "resourseId" integer NOT NULL, "resourseType" "public"."rating_resoursetype_enum" NOT NULL, "value" integer NOT NULL, CONSTRAINT "PK_80455344185f8eb02fc630a81b1" PRIMARY KEY ("userId", "resourseId", "resourseType"))`,
		)
		await queryRunner.query(
			`CREATE TABLE "user_rated_films_genre" ("userId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_45bdbe51c6edfbe31c43b2e0495" PRIMARY KEY ("userId", "genreId"))`,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_1c310e7a27e1d77fa73e81c4db" ON "user_rated_films_genre" ("userId") `,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_101e7e046f7d7b41f7ebea0001" ON "user_rated_films_genre" ("genreId") `,
		)
		await queryRunner.query(
			`ALTER TABLE "film" ADD "ratingCount" integer NOT NULL DEFAULT '0'`,
		)
		await queryRunner.query(
			`ALTER TABLE "user_rated_films_genre" ADD CONSTRAINT "FK_1c310e7a27e1d77fa73e81c4dba" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
		await queryRunner.query(
			`ALTER TABLE "user_rated_films_genre" ADD CONSTRAINT "FK_101e7e046f7d7b41f7ebea00017" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user_rated_films_genre" DROP CONSTRAINT "FK_101e7e046f7d7b41f7ebea00017"`,
		)
		await queryRunner.query(
			`ALTER TABLE "user_rated_films_genre" DROP CONSTRAINT "FK_1c310e7a27e1d77fa73e81c4dba"`,
		)
		await queryRunner.query(`ALTER TABLE "film" DROP COLUMN "ratingCount"`)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_101e7e046f7d7b41f7ebea0001"`,
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_1c310e7a27e1d77fa73e81c4db"`,
		)
		await queryRunner.query(`DROP TABLE "user_rated_films_genre"`)
		await queryRunner.query(`DROP TABLE "rating"`)
		await queryRunner.query(`DROP TYPE "public"."rating_resoursetype_enum"`)
	}
}
