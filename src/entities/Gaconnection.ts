import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("gaconnection", { schema: "gamedb" })
export class Gaconnection {
  @PrimaryGeneratedColumn({ type: "int", name: "idconnection" })
  idconnection: number;

  @Column("varchar", { name: "username", nullable: true, length: 45 })
  username: string | null;

  @Column("varchar", { name: "gamename", nullable: true, length: 45 })
  gamename: string | null;

  @Column("varchar", { name: "serverIp", nullable: true, length: 45 })
  serverIp: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 45 })
  status: string | null;

  @Column("datetime", { name: "lastUpdateTime", nullable: true })
  lastUpdateTime: Date | null;

  @Column("varchar", { name: "pid", nullable: true, length: 45 })
  pid: string | null;

  @Column("int", { name: "gameId" })
  gameId: number;
}
