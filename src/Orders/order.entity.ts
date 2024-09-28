import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
//import { v4 as uuid } from 'uuid';
import { Users } from '../Users/user.entity'; // Asegúrate de importar la entidad User
import { OrderDetails } from '../OrdersDetail/orderDetail.entity'; // Asegúrate de importar la entidad OrderDetails
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'orders',
})
export class Orders {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string; // = uuid(); // UUID generado automáticamente

  @ApiProperty({
    description: 'debe ser fecha de tipo dd/mm/yyyy',
    example: '20/06/1986',
  })
  @Column()
  date: Date; // Fecha del pedido

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails; // Relación 1:1 con la entidad OrderDetails

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users; // Relación 1:N con la entidad User
}
