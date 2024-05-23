import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './modules/clientes/clientes.module';
import { CarritosModule } from './modules/carritos/carritos.module';
import { ComprasModule } from './modules/compras/compras.module';
import { ProductosModule } from './modules/productos/productos.module';
import { ProveedoresModule } from './modules/proveedores/proveedores.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({envFilePath: '.env'}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      autoLoadEntities: true,
      synchronize:true,
      logging:true,
      host:process.env.DB_HOST,
      port:parseInt(process.env.DB_PORT), //asi convertimos el tipo de la variable a int
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }),
    ClientesModule,
    CarritosModule,
    ComprasModule,
    ProductosModule,
    ProveedoresModule,
    CategoriasModule
  ],
})
export class AppModule { }
