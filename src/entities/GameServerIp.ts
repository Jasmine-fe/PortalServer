import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("GameServerIP", { schema: "compal" })
export class GameServerIp {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "ip", nullable: true, length: 11 })
  ip: string | null;

  @Column("timestamp", { name: "lastUpdateTime", nullable: true })
  lastUpdateTime: Date | null;

  @Column("int", { name: "status", nullable: true })
  status: number | null;
}
