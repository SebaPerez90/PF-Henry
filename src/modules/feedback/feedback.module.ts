import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/database/entities/feedback.entity';
import { UserRepository } from '../users/users.repository';
import { User } from 'src/database/entities/user.entity';
import { ExperienceService } from '../experience/experience.service';
import { Experience } from 'src/database/entities/experience.entity';
import { Credential } from 'src/database/entities/credentials.entity';
import { AuthRepository } from '../auth/auth.repository';
import { ProfesionsRepository } from '../profesions/profesions.repository';
import { Profesion } from 'src/database/entities/profesion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Feedback,
      User,
      Experience,
      Credential,
      Profesion,
    ]),
  ],
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
    UserRepository,
    ExperienceService,
    AuthRepository,
    ProfesionsRepository,
  ],
})
export class FeedbackModule {}
