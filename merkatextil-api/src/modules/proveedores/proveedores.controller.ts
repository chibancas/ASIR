import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  create(@Body() createProveedoreDto: CreateProveedoreDto) {
    return this.proveedoresService.create(createProveedoreDto);
  }

  @Get()
  findAll() {
    return this.proveedoresService.findAll();
  }

  @Get(':cif')
  findOne(@Param('cif') cif: string) {
    return this.proveedoresService.findOne(cif);
  }

  @Patch(':cif')
  update(@Param('cif') cif: string, @Body() updateProveedoreDto: UpdateProveedoreDto) {
    return this.proveedoresService.update(cif, updateProveedoreDto);
  }

  @Delete(':cif')
  delete(@Param('cif') cif: string) {
    return this.proveedoresService.delete(cif);
  }
}
