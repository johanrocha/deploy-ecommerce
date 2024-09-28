import { Injectable, NotFoundException } from '@nestjs/common';
import { IProduct } from './product.interface';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'moto',
      description: 'moto todo terreno',
      price: 1250,
      stock: true,
      imgUrl: 'http://images.moto.com/',
    },
    {
      id: 2,
      name: 'auto',
      description: 'auto sedan',
      price: 35000,
      stock: true,
      imgUrl: 'http://images.auto.com/',
    },
  ];
  getProducts(page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return this.products.slice(startIndex, endIndex);
  }

  createProduct(product: Omit<IProduct, 'id'>) {
    const id = this.products.length + 1;
    this.products = [...this.products, { id, ...product }];
    return id;
  }

  getById(id: number) {
    return this.products.find((product) => product.id === id);
  }

  updateProduct(id: number, updatedProduct: Omit<IProduct, 'id'>) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }

    // Actualizamos el producto existente con los nuevos datos
    const product = { ...this.products[productIndex], ...updatedProduct };
    console.log(this.products[productIndex]);
    console.log(updatedProduct);
    console.log(product);
    console.log(this.products[productIndex]);
    this.products[productIndex] = product;

    return product.id;
  }

  deleteProduct(id: number) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }

    // Eliminar el producto
    this.products.splice(productIndex, 1);

    return id;
  }
}
