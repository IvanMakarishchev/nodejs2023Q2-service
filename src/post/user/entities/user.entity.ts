import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  login: string;

  @Column({ nullable: false })
  password: string;

  @VersionColumn({
    nullable: false,
  })
  version: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  get createdTimeStamp(): number {
    return new Date(this.createdAt).getTime();
  }

  get udatedTimeStamp(): number {
    return new Date(this.updatedAt).getTime();
  }
}
