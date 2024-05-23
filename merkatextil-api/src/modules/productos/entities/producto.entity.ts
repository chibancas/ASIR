import { Carrito } from 'src/modules/carritos/entities/carrito.entity';
import { Categoria } from 'src/modules/categorias/entities/categoria.entity';
import { Proveedore } from 'src/modules/proveedores/entities/proveedore.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: false, nullable: false })
  nombre: string;

  @Column('float', { unique: false, nullable: false })
  precio: number;

  @Column('numeric', { unique: false, nullable: true })
  existencias?: number;

  @Column('text', { unique: false, nullable: true })
  descripcion?: string;

  @ManyToOne(() => Proveedore, (proveedor) => proveedor.productos)
  proveedor: Proveedore;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;

  @ManyToMany(() => Carrito, (carrito) => carrito.productos)
  carrito?: Carrito[];
}
