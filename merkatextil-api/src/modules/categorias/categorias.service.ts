import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    // return 'This action adds a new categoria';
    try {
      const categoria = this.categoriaRepository.create(createCategoriaDto);
      await this.categoriaRepository.save(categoria);
      return categoria;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al crear categoría ${createCategoriaDto.nombre}`,
      );
    }
  }

  async findAll() {
    // return `This action returns all categorias`;
    try {
      const categorias = await this.categoriaRepository.find();
      return categorias;
    } catch (error) {
      throw new InternalServerErrorException('Fallo al listar categorias.');
    }
  }

  async findOne(id: string) {
    // return `This action returns a #${id} categoria`;
    try {
      const categoria = await this.categoriaRepository.findOne({
        where: { id },
      });
      return categoria;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al buscar la categoría con id ${id}.`,
      );
    }
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    // return `This action updates a #${id} categoria`;
    try {
      const categoria = await this.categoriaRepository.findOne({
        where: { id },
      });
      this.categoriaRepository.merge(categoria, updateCategoriaDto);
      await this.categoriaRepository.save(categoria);
      return categoria;
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al buscar la categoría con id ${id}.`,
      );
    }
  }

  async delete(id: string) {
    // return `This action removes a #${id} categoria`;
    try {
      const categoria = await this.categoriaRepository.findOne({
        where: { id },
      });
      await this.categoriaRepository.remove(categoria);
    } catch (error) {
      throw new InternalServerErrorException(
        `Fallo al eliminar categoría con id ${id}.`,
      );
    }
  }
}
