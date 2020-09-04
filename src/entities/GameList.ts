import { Column, Entity } from "typeorm";

@Entity("gamelist", { schema: "gamedb" })
export class Gamelist {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @Column("text", { name: "imageURL", nullable: true })
  imageUrl: string | null;

  @Column("text", { name: "descp", nullable: true })
  descp: string | null;

  @Column("text", { name: "providerId", nullable: true })
  providerId: string | null;

  @Column("datetime", { name: "LastUpdateTime", nullable: true })
  lastUpdateTime: Date | null;

  @Column("text", { name: "gameId", nullable: true })
  gameId: string | null;

  @Column("text", { name: "configFile", nullable: true })
  configFile: string | null;

  @Column("text", { name: "excuteMode", nullable: true })
  excuteMode: string | null;

  @Column("varchar", { name: "filename", nullable: true, length: 45 })
  filename: string | null;
}
