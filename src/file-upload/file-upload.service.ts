import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { Products } from 'src/Products/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    // verificando que le producto exista
    if (!product) {
      throw new NotFoundException(`Product ${productId} not found`);
    }

    const uploadedImage = await this.fileUploadRepository.uploadImage(file);

    // Actualizando la url de la imagen en el producto
    await this.productsRepository.update(productId, {
      imgUrl: uploadedImage.secure_url,
    });
    //encontramos el producto
    const findUpdatedProduct = await this.productsRepository.findOneBy({
      id: productId,
    });
    return findUpdatedProduct;
  }
}
