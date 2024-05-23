import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { CarritosModule } from '../carritos/carritos.module';

@Module({
  controllers: [ComprasController],
  providers: [ComprasService],
  imports: [TypeOrmModule.forFeature([Compra]), CarritosModule],
  exports: [ComprasService, TypeOrmModule],
})
export class ComprasModule {}
