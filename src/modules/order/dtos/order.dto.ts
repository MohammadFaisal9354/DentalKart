import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  userId: string;

  @IsNumber()
  productId: number[];

  @IsNumber()
  quantity: number;

  @IsString()
  payment_details: string;
}
