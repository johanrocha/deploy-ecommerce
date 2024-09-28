import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './category.repository';

import CategoryDto from './category.dto';
import { Categories } from './category.entity';
import { categoriesData } from './categories.data';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  addCategories() {
    return this.categoriesRepository.addCategories();
  }

  getCategories() {
    return this.categoriesRepository.getCategories();
  }

  async seedCategories() {
    //await this.categoriesRepository.addCategories(category);
  }

  /*
  async seedCategories() {
    for (const category of categoriesData) {
      await this.categoriesRepository.addCategories(category);
    }
    return { message: 'Categorías cargadas correctamente' };
  }
  
  */
}
