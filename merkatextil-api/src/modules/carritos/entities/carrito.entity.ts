import { Type } from 'class-transformer';
import { Cliente } from 'src/modules/clientes/entities/cliente.entity';
import { Compra } from 'src/modules/compras/entities/compra.entity';
import { Producto } from 'src/modules/productos/entities/producto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  // JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Carrito {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric', { unique: false, nullable: true, default: 0 })
  cantidad?: number;

  @ManyToMany(() => Producto, (producto) => producto.carrito)
  productos: Producto[];

  @OneToOne(() => Cliente, (cliente) => cliente.carrito, {
    onDelete: 'CASCADE',
    // cascade: true,
  })
  @Type(() => Carrito)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @OneToMany(() => Compra, (compra) => compra.carrito)
  @Type(() => Compra)
  compras: Compra[];
}
