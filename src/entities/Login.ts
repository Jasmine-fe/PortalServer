import { Column, Entity } from "typeorm";

@Entity("login", { schema: "gamedb" })
export class Login {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("varchar", { name: "username", nullable: true, length: 20 })
  username: string | null;

  @Column("text", { name: "loginTime", nullable: true })
  loginTime: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 45 })
  password: string | null;
}
