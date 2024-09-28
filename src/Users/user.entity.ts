import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from 'src/Orders/order.entity';

@Entity({
  name: 'users',
})
export class Users {
  // @PrimaryGeneratedColumn() no es recomendable para user
  @PrimaryGeneratedColumn('uuid')
  id: string; // = uuid(); // UUID generado automáticamente

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  password: string;

  @Column({ type: 'int' })
  phone: number;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({
    name: 'order_id',
  })
  orders: Orders[]; // Relación 1:N con la entidad Order

  //@Column({ default: false })
  //status: boolean;
}
