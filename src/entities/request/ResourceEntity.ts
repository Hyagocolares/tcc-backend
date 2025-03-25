// src/entities/request/ResourceEntity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { Request } from "./RequestEntity"

@Entity("resources")
export default class Resource {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  resource: string

  @Column({ type: "int" })
  quantity: number

  @Column({ name: "quantity_per_day", type: "int" })
  quantityPerDay: number

  @ManyToOne(() => Request, request => request.resources, { onDelete: 'CASCADE' })
  request: Request

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}
