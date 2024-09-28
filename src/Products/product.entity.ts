import { Categories } from 'src/Categories/category.entity';
import { OrderDetails } from 'src/OrdersDetail/orderDetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'products' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string; //= uuid();

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'text', default: 'default-image.jpg' })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories; // Relación 1:N con la entidad Category

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  // @JoinTable() // Crea una tabla de unión para la relación N:N
  orderDetails: OrderDetails[]; // Relación N:N con la entidad OrderDetails
}
