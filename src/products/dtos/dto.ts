export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly brand: string;
  readonly price: number;
  readonly quantity: number;
}

export class UpdateProductDto {
  readonly name?: string;
  readonly description?: string;
  readonly brand?: string;
  readonly price?: number;
  readonly quantity?: number;
}
