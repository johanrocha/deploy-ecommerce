import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Products } from '../Products/product.entity';

@Entity({ name: 'categories' })
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string; // = uuid(); // UUID generado automáticamente

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string; // Nombre de la categoría, máximo 50 caracteres

  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[]; // Relación N:1 con la entidad Product
}
