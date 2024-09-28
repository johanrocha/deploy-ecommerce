import { Controller, Body, Get, Post, Res, HttpStatus } from '@nestjs/common';

import { CategoriesService } from './categories.service';

import CategoryDto from './category.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('seeder')
  addCategories() {
    return this.categoriesService.addCategories();
  }

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }
}

/* @Post()
  async addCategory(@Body() category: CategoryDto, @Res() res: Response) {
    const newCategory = await this.categoriesService.addCategory(category);
    if (newCategory) {
      res.status(HttpStatus.CREATED).json(newCategory);
    } else {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Error al agregar la categoría' });
    }
  }
    */
