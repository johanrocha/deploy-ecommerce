import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './category.repository';
import { CategoriesService } from './categories.service';
import { Categories } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
  exports: [TypeOrmModule],
})
export class CategoriesModule {}
