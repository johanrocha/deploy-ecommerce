import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThan, Repository } from 'typeorm';

// entidasdes
import { Users } from 'src/Users/user.entity';
import { Products } from 'src/Products/product.entity';
import { OrderDetails } from 'src/OrdersDetail/orderDetail.entity';
import { Orders } from './order.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private ordersDetailRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {} //

  async addOrder(userId: string, products: any) {
    let total = 0;
    // obtiene le usuario
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user)
      throw new NotFoundException(`1 Usuario con id ${userId} no encontardo`);

    // ---> instancia Order
    const order = new Orders();
    order.date = new Date();
    order.user = user;
    // ---> save Order
    const newOrder = await this.ordersRepository.save(order);

    // asociar cada id que recibimos con la entidad producto
    // promise.all permite ejecutar multiple promesas
    const productsArray = await Promise.all(
      products.map(async (element) => {
        //obiene el producto
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });
        // si no existe el id del producto
        if (!product)
          throw new NotFoundException(
            `Producto id ${element.id} no encontardo`,
          );
        //return `product con id ${element.id} not found`;
        // va sumando los precios del producto
        total += Number(product.price);
        // actuliza el stock del producto
        await this.productsRepository.update(
          {
            id: element.id,
          },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );
    // ---> OrderDetails
    const orderDetail = new OrderDetails();

    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;

    await this.ordersDetailRepository.save(orderDetail);

    return await this.ordersRepository.find({
      where: {
        id: newOrder.id,
      },
      relations: {
        orderDetails: true,
      },
    });
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.find({
      where: {
        id,
      },
      relations: {
        orderDetails: { products: true },
      },
    });

    if (!order) throw new NotFoundException(`Order con id ${id} no encontardo`);

    return order;
  }
}
