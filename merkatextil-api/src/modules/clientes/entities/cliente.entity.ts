import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Carrito } from './../../carritos/entities/carrito.entity';
import { Exclude, Type } from 'class-transformer';

@Entity()
export class Cliente {
  @PrimaryColumn('text')
  nif: string;

  @Column('text', { unique: true, nullable: false })
  email: string;

  @Column('text', { unique: true, nullable: false })
  password: string;

  @Column('text', { unique: false, nullable: false })
  nombre: string;

  @Column('text', { unique: false, nullable: false })
  apellidos: string;

  @Column('text', { unique: false, nullable: true })
  ciudad?: string;

  @Column('text', { unique: false, nullable: true })
  direccion?: string;

  @Column('text', { unique: false, nullable: true })
  telefono?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Carrito, (carrito) => carrito.cliente, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  @Type(() => Carrito)
  @Exclude()
  carrito: Carrito;
}
