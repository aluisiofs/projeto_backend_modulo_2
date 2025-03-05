<<<<<<< HEAD
import {Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ default: true })
  status: boolean;
}
>>>>>>> develop
