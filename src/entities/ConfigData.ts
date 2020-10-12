import { Column, Entity } from "typeorm";

@Entity("config_data", { schema: "gamedb" })
export class ConfigData {
  @Column("int", { name: "gameid", nullable: true })
  gameid: number | null;

  @Column("varchar", { name: "dictionary", nullable: true, length: 100 })
  dictionary: string | null;

  @Column("varchar", { name: "GAcolumn", nullable: true, length: 255 })
  gAcolumn: string | null;

  @Column("varchar", { name: "default_value", nullable: true, length: 255 })
  defaultValue: string | null;

  @Column("varchar", { name: "new_value", nullable: true, length: 255 })
  newValue: string | null;
}
