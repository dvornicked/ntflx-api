import { MigrationInterface, QueryRunner } from 'typeorm'

export class userImageDesc1662123359021 implements MigrationInterface {
	name = 'userImageDesc1662123359021'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ADD "image" character varying NOT NULL DEFAULT ''`,
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "desc" character varying NOT NULL DEFAULT ''`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "desc"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`)
	}
}
