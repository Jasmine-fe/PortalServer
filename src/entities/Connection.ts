import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("connection", { schema: "gamedb" })
export class Connection {
  @PrimaryGeneratedColumn({ type: "int", name: "idconnection" })
  idconnection: number;

  @Column("varchar", { name: "username", nullable: true, length: 45 })
  username: string | null;

  @Column("varchar", { name: "gamename", nullable: true, length: 45 })
  gamename: string | null;

  @Column("varchar", { name: "ip", nullable: true, length: 45 })
  ip: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 45 })
  status: string | null;

  @Column("varchar", { name: "lstUpdateTime", nullable: true, length: 45 })
  lstUpdateTime: string | null;
}
