import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("login", { schema: "gamedb" })
export class Login {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", nullable: true, length: 20 })
  username: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 45 })
  password: string | null;
}
