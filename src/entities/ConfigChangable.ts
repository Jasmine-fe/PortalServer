import { Column, Entity } from "typeorm";

@Entity("config_changable", { schema: "gamedb" })
export class ConfigChangable {
  @Column("text", { name: "gameid", nullable: true })
  gameid: string | null;

  @Column("text", { name: "config_name", nullable: true })
  configName: string | null;

  @Column("text", { name: "config_column", nullable: true })
  configColumn: string | null;

  @Column("text", { name: "config_value", nullable: true })
  configValue: string | null;

  @Column("text", { name: "user_change", nullable: true })
  userChange: string | null;

  @Column("int", { primary: true, name: "id" })
  id: number;
}
