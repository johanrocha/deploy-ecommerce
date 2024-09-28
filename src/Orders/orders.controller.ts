import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './order.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() order: OrderDto) {
    console.log('Recibimos el pedido: ', order);
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }

  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return;
    console.log('este es el id: ' + id);
    return this.ordersService.getOrder(id);
  }
}
