import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
  ) {}

  async create(createCompraDto: CreateCompraDto) {
    try {
      const compra = this.compraRepository.create(createCompraDto);
      await this.compraRepository.save(compra);
      return compra;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al crear compra. ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const compras = await this.compraRepository.find({
        relations: { carrito: true },
      });
      return compras;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al listar compras. ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const compra = await this.compraRepository.findOne({
        where: { id },
        relations: { carrito: true },
      });
      if (!compra) {
        throw new NotFoundException(`Compra no encontrada con id ${id}`);
      }
      return compra;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al buscar compra. ${error.message}`,
      );
    }
  }

  async update(id: string, updateCompraDto: UpdateCompraDto) {
    try {
      const compra = await this.compraRepository.findOne({
        where: { id },
        relations: { carrito: true },
      });
      if (!compra) {
        throw new NotFoundException(`Compra no encontrada con id ${id}`);
      }
      this.compraRepository.merge(compra, updateCompraDto);
      await this.compraRepository.save(compra);
      return compra;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al actualizar compra. ${error.message}`,
      );
    }
  }

  async delete(id: string) {
    try {
      const compra = await this.compraRepository.findOne({
        where: { id },
      });
      if (!compra) {
        throw new NotFoundException(`Compra no encontrada con id ${id}`);
      }
      await this.compraRepository.remove(compra);
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al eliminar compra con id ${id}. ${error.message}`,
      );
    }
  }
}
