import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Credential } from 'src/database/entities/credentials.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Credential])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
