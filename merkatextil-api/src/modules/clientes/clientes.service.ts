import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Carrito } from '../carritos/entities/carrito.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const queryRunner =
      this.clienteRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Crear cliente
      const cliente = this.clienteRepository.create(createClienteDto);
      await queryRunner.manager.save(cliente);

      // Crear carrito asociado al cliente
      const carrito = new Carrito();
      carrito.cliente = cliente; // Asociar el carrito al cliente
      await queryRunner.manager.save(carrito);

      // Asociar carrito al cliente y actualizar
      cliente.carrito = carrito;
      await queryRunner.manager.save(cliente);

      await queryRunner.commitTransaction();
      return cliente;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        `Fallo al crear cliente con NIF ${createClienteDto.nif}. ${error.message}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      const clientes = await this.clienteRepository.find({
        relations: { carrito: true },
      });
      return clientes;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al listar clientes. ${error.message}`,
      );
    }
  }

  async findOne(nif: string) {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { nif },
        relations: { carrito: true },
      });
      if (!cliente) {
        throw new NotFoundException(
          `Fallo al buscar el cliente con NIF ${nif}.`,
        );
      }
      return cliente;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al buscar cliente. ${error.message}`,
      );
    }
  }

  async update(nif: string, updateClienteDto: UpdateClienteDto) {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { nif },
        relations: { carrito: true },
      });
      if (!cliente) {
        throw new NotFoundException(`Fallo al buscar cliente con NIF ${nif}`);
      }
      this.clienteRepository.merge(cliente, updateClienteDto);
      await this.clienteRepository.save(cliente);

      return cliente;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al actualizar datos del cliente. ${error.message}`,
      );
    }
  }

  async delete(nif: string) {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { nif },
        relations: { carrito: true },
      });

      await this.clienteRepository.remove(cliente);
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al eliminar cliente con NIF ${nif}. ${error.message}`,
      );
    }
  }
}
