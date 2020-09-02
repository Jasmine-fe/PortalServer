import { Column, Entity } from "typeorm";

@Entity("config_fix", { schema: "gamedb" })
export class ConfigFix {
  @Column("varchar", { primary: true, name: "config_column", length: 100 })
  configColumn: string;

  @Column("text", { name: "A", nullable: true })
  a: string | null;

  @Column("text", { name: "B", nullable: true })
  b: string | null;

  @Column("text", { name: "C", nullable: true })
  c: string | null;

  @Column("text", { name: "D", nullable: true })
  d: string | null;

  @Column("text", { name: "E", nullable: true })
  e: string | null;

  @Column("text", { name: "F", nullable: true })
  f: string | null;

  @Column("text", { name: "G", nullable: true })
  g: string | null;

  @Column("text", { name: "H", nullable: true })
  h: string | null;

  @Column("text", { name: "I", nullable: true })
  i: string | null;

  @Column("text", { name: "J", nullable: true })
  j: string | null;

  @Column("text", { name: "K", nullable: true })
  k: string | null;

  @Column("text", { name: "L", nullable: true })
  l: string | null;

  @Column("text", { name: "M", nullable: true })
  m: string | null;

  @Column("text", { name: "N", nullable: true })
  n: string | null;

  @Column("text", { name: "O", nullable: true })
  o: string | null;

  @Column("text", { name: "P", nullable: true })
  p: string | null;

  @Column("text", { name: "Q", nullable: true })
  q: string | null;

  @Column("text", { name: "R", nullable: true })
  r: string | null;

  @Column("text", { name: "S", nullable: true })
  s: string | null;

  @Column("text", { name: "T", nullable: true })
  t: string | null;

  @Column("text", { name: "U", nullable: true })
  u: string | null;

  @Column("text", { name: "V", nullable: true })
  v: string | null;

  @Column("text", { name: "W", nullable: true })
  w: string | null;

  @Column("text", { name: "X", nullable: true })
  x: string | null;

  @Column("text", { name: "Y", nullable: true })
  y: string | null;

  @Column("text", { name: "Z", nullable: true })
  z: string | null;
}
