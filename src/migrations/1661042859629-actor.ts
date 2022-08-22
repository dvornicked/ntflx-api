import { MigrationInterface, QueryRunner } from 'typeorm'

export class actor1661042859629 implements MigrationInterface {
	name = 'actor1661042859629'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "actor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id"))`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "actor"`)
	}
}
