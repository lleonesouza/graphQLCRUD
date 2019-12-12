import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field
} from "type-graphql";
import { Product } from "../entity/Product";

@InputType()
class ProductInput {
  @Field()
  title: string;

  @Field(() => Int)
  minutes: number;
}

@InputType()
class ProductUpdatedInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  minutes?: number;
}

@Resolver()
export class ProductResolver {
  @Mutation(() => Product)
  async createProduct(
    @Arg("options", () => ProductInput) options: ProductInput
  ) {
    const product = await Product.create(options).save();
    return product;
  }

  @Mutation(() => Boolean)
  async updateProduct(
    @Arg("id") id: number,
    @Arg("input", () => ProductUpdatedInput) input: ProductUpdatedInput
  ) {
    await Product.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @Arg("id", () => Int) id: number,
  ) {
    await Product.delete({id})
    return true;
  }

  @Query(() => [Product])
  product() {
    return Product.find();
  }


}
