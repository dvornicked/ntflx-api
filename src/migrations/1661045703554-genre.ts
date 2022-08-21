import { MigrationInterface, QueryRunner } from 'typeorm'

export class genre1661045703554 implements MigrationInterface {
	name = 'genre1661045703554'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "desc" character varying NOT NULL, CONSTRAINT "UQ_dd8cd9e50dd049656e4be1f7e8c" UNIQUE ("name"), CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "genre"`)
	}
}
