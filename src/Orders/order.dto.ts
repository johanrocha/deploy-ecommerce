import { Products } from 'src/Products/product.entity';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

export class OrderDto {

  @IsNotEmpty()
  @IsUUID()
  userId: string;
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products[]>;
}
