import { Module, forwardRef } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { CarritosModule } from '../carritos/carritos.module';
import { Carrito } from '../carritos/entities/carrito.entity';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService],
  imports: [
    TypeOrmModule.forFeature([Cliente, Carrito]),
    forwardRef(() => CarritosModule),
  ],
  exports: [ClientesService, TypeOrmModule],
})
export class ClientesModule {}
