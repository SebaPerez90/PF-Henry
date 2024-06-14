import { InjectRepository } from '@nestjs/typeorm';
import { Profesion } from 'src/database/entities/profesion.entity';
import { Repository } from 'typeorm';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import * as data from '../../utils/mock-professions.json';
import { UserRepository } from 'src/modules/users/users.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ProfesionsRepository {
  constructor(
    @InjectRepository(Profesion)
    private profesionsRepository: Repository<Profesion>,
    private userRepository: UserRepository,
  ) {}

  async seederProfesions() {
    const users = await this.userRepository.findAll();
    data?.map(async (element) => {
      const profession = new Profesion();
      profession.category = element.category;
      profession.user = users[Math.round(Math.random() * 30)];

      await this.profesionsRepository.save(profession);
    });
  }

  async create(createProfesionDto: CreateProfesionDto, userid) {
    const newProfession = await this.profesionsRepository.create({
      category: createProfesionDto.category,
      user: userid,
    });
    return await this.profesionsRepository.save(newProfession);
  }

  async remove(id: string) {
    const result = await this.profesionsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Profesion with ID ${id} not found`);
    }
    return { message: `Profesion with ID ${id} deleted successfully` };
  }

  async update(id: string, UpdateUserDto: UpdateProfesionDto) {
    await this.profesionsRepository.update(id, UpdateUserDto);
    const updateProfesions = await this.profesionsRepository.findOneBy({ id });
    return updateProfesions;
  }

  async findProfesions(category: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const ProfesionsFind = await this.profesionsRepository.find({
      where: { category: category },
      take: limit,
      skip: skip,
      relations: { user: true, experiences: true },
    });

    if (ProfesionsFind.length == 0)
      throw new BadRequestException(
        `No found professions with category ${category}`,
      );

    return ProfesionsFind;
  }

  async getAllProfessions() {
    return await this.profesionsRepository.find({ relations: { user: true } });
  }
}
