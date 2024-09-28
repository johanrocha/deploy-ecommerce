import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from './product.interface';
//import { AuthGuard } from 'src/Auth/auth-guard.guard';
import { Products } from './product.entity';
import { Response } from 'express';
import ProductDto from './product.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { AuthGuard } from 'src/Auth/auth-guard.guard';
import { RolesGuard } from 'src/Auth/roles.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get()
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.productsService.getProducts(page, limit);
  }

  @Post()
  // @UseGuards(AuthGuard)
  async createProduct(@Body() product: ProductDto, @Res() res: Response) {
    // Implement product creation logic here

    const newProduct = await this.productsService.createProduct(product);

    if (newProduct) {
      res.status(HttpStatus.CREATED).json(newProduct);
    } else {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Error al agregar el producto' });
    }
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    //  return this.productsService.getProductById(Number(id));
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(@Param('id') id: string, @Body() product: any) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
    //  return this.productsService.deleteProduct(Number(id));
  }

  @Post('seed')
  async seedCategories() {
    return await this.productsService.seedProducts();
  }
}
//1.54 video del lunes

//25.25
