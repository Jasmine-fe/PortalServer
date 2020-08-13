import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Provider", { schema: "compal" })
export class Provider {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "companyName", nullable: true, length: 20 })
  companyName: string | null;

  @Column("varchar", { name: "companyTel", nullable: true, length: 20 })
  companyTel: string | null;

  @Column("varchar", { name: "companyLoc", nullable: true, length: 30 })
  companyLoc: string | null;

  @Column("varchar", { name: "providerId", nullable: true, length: 3 })
  providerId: string | null;
}
