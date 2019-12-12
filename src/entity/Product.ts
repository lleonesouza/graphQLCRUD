import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'
import {Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class Product extends BaseEntity{
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    title: string

    @Field(() => Int)
    @Column('int', {default:60, nullable:true})
    minutes: number
}