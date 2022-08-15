import { MigrationInterface, QueryRunner } from 'typeorm'

export class user1660586218397 implements MigrationInterface {
	name = 'user1660586218397'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."user_role_enum" AS ENUM('USER', 'ADMIN')`,
		)
		await queryRunner.query(
			`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "user"`)
		await queryRunner.query(`DROP TYPE "public"."user_role_enum"`)
	}
}
