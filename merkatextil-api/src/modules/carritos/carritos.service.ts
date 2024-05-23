import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrito } from './entities/carrito.entity';
import { Repository } from 'typeorm';
import { ClientesService } from '../clientes/clientes.service';

@Injectable()
export class CarritosService {
  constructor(
    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>,
    private readonly clienteService: ClientesService,
  ) {}

  async create(createCarritoDto: CreateCarritoDto) {
    try {
      const { cliente, ...campos } = createCarritoDto;
      const carrito = this.carritoRepository.create({ ...campos });
      const clienteobj = await this.clienteService.findOne(cliente.nif);
      carrito.cliente = clienteobj;

      await this.carritoRepository.save(carrito);
      return carrito;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al crear carrito. ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const carritos = await this.carritoRepository.find({
        relations: { cliente: true },
      });
      return carritos;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al listar carritos. ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const carrito = await this.carritoRepository.findOne({
        where: { id },
        relations: { cliente: true },
      });
      if (!carrito) {
        throw new NotFoundException(`Carrito no encontrado con id ${id}`);
      }
      return carrito;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al buscar carrito. ${error.message}`,
      );
    }
  }

  async update(id: string, updateCarritoDto: UpdateCarritoDto) {
    try {
      const carrito = await this.carritoRepository.findOne({
        where: { id },
        relations: { cliente: true },
      });
      if (!carrito) {
        throw new NotFoundException(`Carrito no encontrado con id ${id}`);
      }
      this.carritoRepository.merge(carrito, updateCarritoDto);
      await this.carritoRepository.save(carrito);
      return carrito;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al actualizar carrito. ${error.message}`,
      );
    }
  }

  async delete(id: string) {
    try {
      const carrito = await this.carritoRepository.findOne({
        where: { id },
      });
      if (!carrito) {
        throw new NotFoundException(`Carrito no encontrado con id ${id}`);
      }
      await this.carritoRepository.remove(carrito);
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al eliminar carrito con id ${id}. ${error.message}`,
      );
    }
  }
}
