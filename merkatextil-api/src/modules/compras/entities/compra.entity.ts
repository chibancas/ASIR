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

  @Column('date')
  fecha_compra: Date;

  @ManyToOne(() => Carrito, (carrito) => carrito.compras)
  @JoinColumn()
  carrito: Carrito;

  @CreateDateColumn()
  createdAt: Date;
}
