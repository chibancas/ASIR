import { Producto } from 'src/modules/productos/entities/producto.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Proveedore {
  @PrimaryColumn('text')
  cif: string;

  @Column('text', { unique: true, nullable: false })
  nombre: string;

  @Column('text', { unique: false, nullable: true })
  direccion?: string;

  @Column('text', { unique: true, nullable: true })
  telefono?: string;

  @Column('text', { unique: true, nullable: true })
  email?: string;

  @OneToMany(() => Producto, (producto) => producto.proveedor, {
    cascade: true,
    eager: true,
  })
  productos: Producto[];
}
