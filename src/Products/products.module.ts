import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';

import { Products } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { CategoriesModule } from 'src/Categories/categories.module';
//import { CategoriesRepository } from 'src/Categories/category.repository';
import { Categories } from 'src/Categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}
