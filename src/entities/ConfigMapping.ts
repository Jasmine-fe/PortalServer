import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("config_mapping", { schema: "gamedb" })
export class ConfigMapping {
  @Column("text", { name: "gameid", nullable: true })
  gameid: string | null;

  @Column("text", { name: "config_name", nullable: true })
  configName: string | null;

  @Column("text", { name: "config_column", nullable: true })
  configColumn: string | null;

  @Column("text", { name: "map_code", nullable: true })
  mapCode: string | null;

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;
}
