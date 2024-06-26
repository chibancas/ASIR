import { Producto } from 'src/modules/productos/entities/producto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true, nullable: false })
  nombre: string;

  @Column('text', { unique: false, nullable: true })
  descripcion?: string;

  @OneToMany(() => Producto, (producto) => producto.categoria, {
    cascade: true,
    eager: true,
  })
  productos: Producto[];
}
