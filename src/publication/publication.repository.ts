import { InjectRepository } from '@nestjs/typeorm';
import { Publicaction } from 'src/database/entities/publication.entity';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdateProfesionDto } from 'src/profesions/dto/update-profesion.dto';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment';
export class PublicationsRepository {
  constructor(
    @InjectRepository(Publicaction)
    private publicationsRepository: Repository<Publicaction>,
  ) {}

  async create(createPublication: CreatePublicationDto) {
    const datenow = new Date();
    const formatDate = moment(datenow).format('DD-MM-YYYY');
    const formatTime = moment(datenow).format('HH:mm:ss');
    const newPublication = await this.publicationsRepository.create({
      title: createPublication.title,
      description: createPublication.description,
      imgUrl: createPublication.imgUrl,
      date: formatDate,
      time: formatTime,
    });
  

    const publications = await this.publicationsRepository.save(newPublication);
    return publications;
  }
  async findAll() {
    return await this.publicationsRepository.find();
  }
  async findOne(id: string) {
    const publications = await this.publicationsRepository.findOneBy({ id });
    if (!publications)
      throw new NotFoundException(`Not found publication ${id}`);
  }
  async update(id: string, updatePublication: UpdateProfesionDto) {
    return await this.publicationsRepository.update(id, updatePublication);
  }
  async remove(id: string) {
    return await this.publicationsRepository.delete(id);
  }
}
