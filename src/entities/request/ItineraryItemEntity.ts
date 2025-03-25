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

  @Column({ type: "date" })
  date: Date

  @Column({ length: 100 })
  origin: string

  @Column({ length: 100 })
  destination: string

  @Column({ type: "text" })
  activity: string

  @Column({ type: "timestamp" })
  departureTime: Date

  @Column({ type: "timestamp" })
  arrivalTime: Date

  @Column({ name: "unpaved_road_km", type: "float" })
  unpavedRoadKm: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  kilometers: number

  @Column({
    type: "enum",
    enum: ["Boa", "Regular", "Ruim"],
    default: "Boa"
  })
  roadCondition: string

  @Column({ name: "has_wooden_bridge", default: false })
  hasWoodenBridge: boolean

  @Column({ name: "has_ferry", default: false })
  hasFerry: boolean

  @Column({ name: "has_toll", default: false })
  hasToll: boolean

  @ManyToOne(() => Request, request => request.itinerary, { onDelete: 'CASCADE' })
  request: Request

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}
