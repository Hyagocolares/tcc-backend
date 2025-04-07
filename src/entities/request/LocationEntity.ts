// src/entities/request/LocationEntity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { Request } from "./RequestEntity"

@Entity("locations")
export default class Location {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 150 })
  location: string

  @Column({ length: 100 })
  municipality: string

  @Column({ name: "period_start", type: "date", nullable: true })
  periodStart: string

  @Column({ name: "period_end", type: "date", nullable: true })
  periodEnd: string

  @Column({
    name: "total_distance_km",
    type: "decimal",
    precision: 10,
    scale: 2
  })
  totalDistanceKm: number

  @ManyToOne(() => Request, request => request.locations, { onDelete: 'CASCADE' })
  request: Request

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}
