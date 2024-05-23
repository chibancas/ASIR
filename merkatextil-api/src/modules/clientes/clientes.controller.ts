import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { plainToInstance } from 'class-transformer';
import { Cliente } from './entities/cliente.entity';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = await this.clientesService.create(createClienteDto);
    return plainToInstance(Cliente, cliente);
  }

  @Get()
  async findAll(): Promise<Cliente[]> {
    const clientes = await this.clientesService.findAll();
    return plainToInstance(Cliente, clientes);
  }
  // @Post()
  // create(@Body() createClienteDto: CreateClienteDto) {
  //   return this.clientesService.create(createClienteDto);
  // }

  // @Get()
  // findAll() {
  //   return this.clientesService.findAll();
  // }

  @Get(':nif')
  findOne(@Param('nif') nif: string) {
    return this.clientesService.findOne(nif);
  }

  @Patch(':nif')
  update(
    @Param('nif') nif: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return this.clientesService.update(nif, updateClienteDto);
  }

  @Delete(':nif')
  delete(@Param('nif') nif: string) {
    return this.clientesService.delete(nif);
  }
}
