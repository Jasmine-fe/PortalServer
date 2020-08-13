import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User", { schema: "compal" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "username", nullable: true, length: 11 })
  username: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 11 })
  password: string | null;
}
