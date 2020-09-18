import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("gameslist", { schema: "gamedb" })
export class Gameslist {
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

  @PrimaryGeneratedColumn({ type: "int", name: "gameId" })
  gameId: number;

  @Column("text", { name: "configFile", nullable: true })
  configFile: string | null;

  @Column("text", { name: "excuteMode", nullable: true })
  excuteMode: string | null;

  @Column("varchar", { name: "filename", nullable: true, length: 45 })
  filename: string | null;

  @Column("varchar", { name: "imgPath", nullable: true, length: 45 })
  imgPath: string | null;
}
