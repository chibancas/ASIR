import { Module, forwardRef } from '@nestjs/common';
import { CarritosService } from './carritos.service';
import { CarritosController } from './carritos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from './entities/carrito.entity';
import { ClientesModule } from '../clientes/clientes.module';
import { ProductosModule } from '../productos/productos.module';

@Module({
  controllers: [CarritosController],
  providers: [CarritosService],
  imports: [
    TypeOrmModule.forFeature([Carrito]),
    forwardRef(() => ClientesModule),
    forwardRef(() => ProductosModule),
  ],
  exports: [CarritosService, TypeOrmModule],
})
export class CarritosModule {}
