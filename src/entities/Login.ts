import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Login", { schema: "compal" })
export class Login {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "username", nullable: true, length: 11 })
  username: string | null;

  @Column("timestamp", { name: "loginTime", nullable: true })
  loginTime: Date | null;
}
