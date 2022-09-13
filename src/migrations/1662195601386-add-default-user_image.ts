import { MigrationInterface, QueryRunner } from 'typeorm'

export class addDefaultUserImage1662195601386 implements MigrationInterface {
	name = 'addDefaultUserImage1662195601386'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ALTER COLUMN "image" SET DEFAULT '/uploads/files/7hkjow-avatar.jpg'`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ALTER COLUMN "image" SET DEFAULT ''`,
		)
	}
}
