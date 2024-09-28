import { Injectable, NotFoundException } from '@nestjs/common';
import { IProduct } from './product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './product.entity';
import ProductDto from './product.dto';
import { Categories } from 'src/Categories/category.entity';
import * as data from '../Utils/data.json';
@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    // Obtiene los productos aplicando paginación
    let products = await this.productsRepository.find({
      relations: { category: true },
    });
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    products = products.slice(startIndex, endIndex);
    return products;
  }
  async getProduct(id: string) {
    const product = await this.categoriesRepository.findOneBy({ id });
    if (!product) {
      return `Prodcuto con id: ${id} no encontrado`;
    }

    return product;
  }
  async addProducts() {
    const categories = await this.categoriesRepository.find();

    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.imgUrl = element.imgUrl;
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
    });

    return 'productos agregados';
  }

  async updateProduct(id: string, product: Products) {
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    return updatedProduct;
  }

  async createProduct(product: ProductDto) {
    const { name: productname, category: categoryname } = product;

    console.log('Buscando categoría con nombre:', categoryname);
    const existingProduct = await this.productsRepository.findOne({
      where: { name: productname },
    });
    console.log('product', existingProduct);
    if (!existingProduct) {
      const existingCategory = await this.categoriesRepository.findOne({
        where: { name: categoryname },
      });
      console.log('category', { name: categoryname });
      console.log('verifica category', existingCategory);

      const newProduct = this.productsRepository.create({
        ...product, // Esto incluye las demás propiedades del product DTO
        category: existingCategory, // Asigna la categoría si es encontrada
      });

      const saveProduct = await this.productsRepository.save(newProduct);

      return saveProduct;
    }
  }
}
