import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { Orders } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderDetails } from 'src/OrdersDetail/orderDetail.entity';
import { Users } from 'src/Users/user.entity';
import { Products } from 'src/Products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Users, Products])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],

  exports: [],
})
export class OrdersModule {}
