import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Orders } from '../Orders/order.entity'; // Asegúrate de importar la entidad Order
import { Products } from '../Products/product.entity'; // Asegúrate de importar la entidad Product

@Entity({ name: 'orderdetails' })
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string; // = uuid(); // UUID generado automáticamente

  @Column({ type: 'decimal', precision: 10, scale: 2 }) //, nullable: false })
  price: number; // Precio del detalle del pedido, con precisión de 10 dígitos y escala de 2

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders; // Relación 1:1 con la entidad Order

  @ManyToMany(() => Products)
  @JoinTable({
    name: 'orderdetails_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderdetail_id',
      referencedColumnName: 'id',
    },
  })
  products: Products[]; // Relación N:M con la entidad Product
}
