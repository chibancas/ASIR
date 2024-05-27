import { Carrito } from 'src/modules/carritos/entities/carrito.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Compra {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  importe: number;

  @ManyToOne(() => Carrito, (carrito) => carrito.compras)
  carrito: Carrito;

  @CreateDateColumn()
  createdAt: Date;
}
