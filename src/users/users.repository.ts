import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import * as data from '../utils/mock-users.json';
import { AuthRepository } from 'src/auth/auth.repository';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private authRepository: AuthRepository,
  ) {}

  async removeUsers(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`No found user con id ${id}`);
    return user;
  }
  async updateUser(id: string, UpdateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, UpdateUserDto);
    const updateUser = await this.usersRepository.findOneBy({ id });
    if (!updateUser) throw new NotFoundException(`No found user con id ${id}`);
    return updateUser;
  }
  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`No found user con id ${id}`);
    return user;
  }
  async createUsers(createUserDto) {
    const user = await this.usersRepository.save(createUserDto);
    return user;
  }
  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async seederUser() {
    const promises = data?.map(async (element) => {
      const user = new User();
      user.name = element.name;
      user.lastName = element.lastName;
      user.dni = element.dni;
      user.country = element.country;
      user.city = element.city;
      user.birthdate = element.birthdate;
      user.credential = await this.authRepository.simulateAuthFlow(element);

      await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(user)
        .orUpdate(
          ['name', 'lastName', 'dni', 'country', 'city', 'birthdate'],
          ['dni'],
        )
        .execute();
    });
    await Promise.all(promises);

    return {
      message: 'users was seeder successfully!',
    };
  }
}
