import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { IProduct } from './product.interface';
//import { Product } from './product.entity';
import { products } from './products.data';
import ProductDto from './product.dto';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  addProducts() {
    return this.productsRepository.addProducts();
  }

  getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }

  createProduct(product: ProductDto) {
    return this.productsRepository.createProduct(product);
  }

  updateProduct(id: string, product: any) {
    return this.productsRepository.updateProduct(id, product);
  }

  async seedProducts() {
    for (const product of products) {
      await this.productsRepository.createProduct(product);
    }
    return { message: 'Categorías cargadas correctamente' };
  }
}
