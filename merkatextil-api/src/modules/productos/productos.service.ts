import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoService: Repository<Producto>
  ) { }
  async create(createProductoDto: CreateProductoDto) {
    // return 'This action adds a new producto';
    try {
      const producto = this.productoService.create(createProductoDto)
      await this.productoService.save(producto)
      return producto
    } catch (error) {
      throw new InternalServerErrorException(`Fallo al crear producto ${createProductoDto.nombre}.`)
    }
  }

  async findAll() {
    // return `This action returns all productos`;
    try {
      const productos = await this.productoService.find()
      return productos
    } catch (error) {
      throw new InternalServerErrorException('Fallo al listar propductos.')
    }
  }

  async findOne(id: string) {
    // return `This action returns a #${id} producto`;
    try {
      const producto=await this.productoService.findOne({
        where:{id}
      })
      return producto
    } catch (error) {
      
    }
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    // return `This action updates a #${id} producto`;
    try {
      const producto= await this.productoService.findOne({
        where:{id}
      })
      this.productoService.merge(producto,updateProductoDto)
      await this.productoService.save(producto)
      return producto
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async delete(id: string) {
    // return `This action removes a #${id} producto`;
    try {
      const producto= await this.productoService.findOne({
        where:{id}
      })
      await this.productoService.delete(producto)
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
