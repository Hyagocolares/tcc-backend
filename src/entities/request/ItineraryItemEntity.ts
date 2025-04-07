// src/entities/request/ItineraryItemEntity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { Request } from "./RequestEntity"

@Entity("itinerary_items")
export default class ItineraryItem {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "date", type: "date" })
  date: string

  @Column({ length: 100 })
  origin: string

  @Column({ length: 100 })
  destination: string

  @Column({ type: "text" })
  activity: string

  @Column({ type: "time" })
  departureTime: string

  @Column({ type: "time" })
  arrivalTime: string

  @Column({ name: "unpaved_road_km", type: "varchar", default: false })
  unpavedRoadKm: boolean

  @Column({ type: "decimal", precision: 10, scale: 2 })
  kilometers: number

  @Column({
    type: "enum",
    enum: ["Boa", "Regular", "Ruim"],
    default: "Boa"
  })
  roadCondition: string

  @Column({ name: "has_wooden_bridge", type: "varchar", default: false })
  hasWoodenBridge: boolean

  @Column({ name: "has_ferry", type: "varchar", default: false })
  hasFerry: boolean

  @Column({ name: "has_toll", type: "varchar", default: false })
  hasToll: boolean

  @ManyToOne(() => Request, request => request.itinerary, { onDelete: 'CASCADE' })
  request: Request

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}
