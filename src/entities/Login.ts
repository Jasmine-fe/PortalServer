import { Column, Entity } from "typeorm";

@Entity("Login", { schema: "gamedb" })
export class Login {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "username", nullable: true })
  username: string | null;

  @Column("text", { name: "loginTime", nullable: true })
  loginTime: string | null;
}
