import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './category.entity';
import { Repository } from 'typeorm';
//import CategoryDto from './category.dto';
import * as data from '../Utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async addCategories() {
    data?.map(async (element) => {
      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: element.category })
        .orIgnore()
        .execute();
    });
    return 'Categorias agergadas';
  }
}

/*
  async addCategory(category: CategoryDto): Promise<Categories> {
    const { name } = category;
    const existingCategory = await this.categoryRepository.findOne({
      where: { name },
    });
    if (!existingCategory) {
      const category = this.categoryRepository.create({ name });

      const newCategory = await this.categoryRepository.save(category);

      return newCategory;
    }*/
// la carga debe ser automaticamente
