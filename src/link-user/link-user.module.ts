import { Module } from '@nestjs/common';
import { LinkUserService } from './link-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkUserEntity } from './entities/link.user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LinkUserEntity])],
  providers: [LinkUserService],
  exports: [LinkUserService],
})
export class LinkUserModule {}
