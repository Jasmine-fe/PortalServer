import { Column, Entity } from "typeorm";

@Entity("config_changable", { schema: "gamedb" })
export class ConfigChangable {
  @Column("text", { name: "gameid", nullable: true })
  gameid: string | null;

  @Column("text", { name: "config_name", nullable: true })
  configName: string | null;

  @Column("text", { name: "config_colomn", nullable: true })
  configColomn: string | null;

  @Column("text", { name: "config_value", nullable: true })
  configValue: string | null;

  @Column("text", { name: "user_change", nullable: true })
  userChange: string | null;
}
