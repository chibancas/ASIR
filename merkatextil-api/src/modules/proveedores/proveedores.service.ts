import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedore } from './entities/proveedore.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedore)
    private proveedorerepository: Repository<Proveedore>
  ) { }
  async create(createProveedoreDto: CreateProveedoreDto) {
    // return 'This action adds a new proveedore';
    try {
      const proveedor = this.proveedorerepository.create(createProveedoreDto)
      await this.proveedorerepository.save(proveedor)
      return proveedor
    } catch (error) {
      throw new InternalServerErrorException(`Fallo al registrar proveedor con CIF ${createProveedoreDto.cif}.`)
    }
  }

  async findAll() {
    // return `This action returns all proveedores`;
    try {
      const proveedores = await this.proveedorerepository.find()
      return proveedores
    } catch (error) {
      throw new InternalServerErrorException('Fallo al listar proveedores.')
    }
  }

  async findOne(cif: string) {
    // return `This action returns a #${id} proveedore`;
    try {
      const proveedor = await this.proveedorerepository.findOne({
        where: { cif }
      })
      return proveedor
    } catch (error) {
      throw new NotFoundException(`Fallo al buscar proveedor con CFI ${cif}.`)
    }
  }

  async update(cif: string, updateProveedoreDto: UpdateProveedoreDto) {
    // return `This action updates a #${id} proveedore`;
    try {
      const provvedor = await this.proveedorerepository.findOne({
        where: { cif }
      })
      this.proveedorerepository.merge(provvedor, updateProveedoreDto)
      await this.proveedorerepository.save(provvedor)
      return provvedor
    } catch (error) {
      throw new InternalServerErrorException(`Fallo al actualizar proveedor con CIF ${cif}.`)
    }
  }

  async delete(cif: string) {
    // return `This action removes a #${id} proveedore`;
    try {
      const proveedor=await this.proveedorerepository.findOne({
        where:{cif}
      })
      await this.proveedorerepository.remove(proveedor)
      // return `Proveedor eliminado con CIF ${cif} .`
    } catch (error) {
      throw new InternalServerErrorException(`Fallo al eliminar proveedor con CIF ${cif} .`)
    }
  }
}
