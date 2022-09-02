import { MigrationInterface, QueryRunner } from 'typeorm'

export class wideImage1661504446718 implements MigrationInterface {
	name = 'wideImage1661504446718'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "film" ADD "wideImage" character varying NOT NULL DEFAULT ''`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "film" DROP COLUMN "wideImage"`)
	}
}
