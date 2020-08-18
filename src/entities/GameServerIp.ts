import { Column, Entity } from "typeorm";

@Entity("GameServerIP", { schema: "gamedb" })
export class GameServerIp {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "ip", nullable: true })
  ip: string | null;

  @Column("text", { name: "lastUpdateTime", nullable: true })
  lastUpdateTime: string | null;

  @Column("text", { name: "status", nullable: true })
  status: string | null;
}
