import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './order.entity';
import { Users } from '../Users/user.entity';
import { Products } from '../Products/product.entity';
import { OrderDetails } from '../OrdersDetail/orderDetail.entity';

import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  addOrder(userid: string, products: any) {
    return this.ordersRepository.addOrder(userid, products);
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
}
