import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/Order-item.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { CreateOrderDto } from '../dtos/order.dto';
import { ShoppingCart } from 'src/modules/cart/entities/cart.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { v2 as cloudinary } from 'cloudinary';
@Injectable()
export class OrderService {
  //constructor(
  //     @InjectModel(Order)
  //     private readonly orderModel: typeof Order,
  //     @InjectModel(OrderItem)
  //     private readonly orderItemModel: typeof OrderItem,
  //     @InjectModel(Product)
  //     private readonly productModel: typeof Product,
  //   ) {}

  async placeOrder(req: CreateOrderDto): Promise<Order> {
    const { userId, productId, quantity, payment_details } = req;

    // Check if all fields are present
    if (!userId || !productId || !quantity || !payment_details) {
      throw new HttpException(
        'All fields are required',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (productId.length != quantity.length)
      throw new HttpException(
        'Product and quantilty length mismatch',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    // Check if all products exist
    for (const prodId of productId) {
      const product = await Product.findByPk(prodId);
      if (!product) {
        throw new HttpException(
          `Product with ID ${prodId} not found`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    let total_cost = 0;
    let order = await Order.create({
      userId,
      total_cost,
      payment_details,
    });
    let i = 0;
    for (const prodId of productId) {
      const product = await Product.findByPk(prodId);
      const qunaty = quantity[i++];
      const price = product.price;
      const cost = price * qunaty;
      total_cost += cost;

      // Create order for each product

      await OrderItem.create({
        orderId: order.id,
        productId: prodId,
        quantity: qunaty,
      });
    }

    // Update the order with total cost
    order.total_cost = total_cost;
    await order.save();

    return order;
  }
  async placeOrderbyCart(id: number): Promise<any> {
    let username = await User.findByPk(id, {
      attributes: ['first_name', 'last_name', 'address'],
    });
    const name = username.first_name + ' ' + username.last_name;
    const address = username.address;
    const cartitems = await ShoppingCart.findAll({
      attributes: ['productId', 'quantity'],
      where: {
        userId: id,
      },
    });

    const productids = cartitems.map((product) => product.productId);
    const productquantity = cartitems.map((product) => product.quantity);
    const prices = await Product.findAll({
      attributes: ['price'],
      where: { id: productids },
    });
    console.log(prices);
    const pricee = prices.map((prices) => prices.price);
    let totalCost = 0;
    console.log(pricee);
    for (let i = 0; i < productquantity.length; i++) {
      // const price: any = prices[i].get('price');
      const price = pricee[i];
      const quantity = productquantity[i];
      const itemCost = price * quantity;
      totalCost += itemCost;
    }
    console.log(totalCost);
    return this.generateBill(
      id,
      name,
      address,
      'orderid',
      productids,
      productquantity,
      pricee,
      totalCost,
    );

    //return name;
    //return products;
  }
  async getOrderById(id: number): Promise<Order> {
    const item = await Order.findByPk(id, {
      attributes: ['id', 'total_cost'],
      include: [
        {
          model: OrderItem,
          attributes: ['productId', 'quantity'],
          include: [
            {
              model: Product,
              attributes: ['name', 'price'],
            },
          ],
        },
      ],
    });
    if (!item) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    try {
      return item;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
  async generateBill(
    userId,
    userName,
    address,
    orderId,
    products: number[],
    quantities: number[],
    prices: number[],
    totalCost,
  ): Promise<string | void> {
    // Your code to generate the bill here
    // create a new PDF document
    console.log('inside generate bill');
    const doc = new PDFDocument();
    console.log('insider generate bill');
    // set the document properties
    doc.title('Order Bill');

    // add content to the document
    doc.font('Helvetica-Bold');
    doc.text(`Order Bill`);
    doc.moveDown();
    doc.font('Helvetica');
    doc.text(`User ID: ${userId}`);
    doc.text(`User Name: ${userName}`);
    doc.text(`Address: ${address}`);
    doc.text(`Date: ${new Date().toLocaleString()}`);
    doc.text(`Order ID: ${orderId}`);
    doc.moveDown();
    doc.text('Products');
    doc.moveDown();
    for (let i = 0; i < products.length; i++) {
      doc.text(
        `${i + 1}. ${products[i]} (quantity: ${quantities[i]}, price: ${
          prices[i]
        })`,
      );
    }
    doc.moveDown();
    doc.font('Helvetica-Bold');
    doc.text(`Total Cost: ${totalCost}`);
    doc.end();
    //return doc;
    //Convert the PDF document to a buffer
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: any[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));
    });

    //Upload the buffer to Cloudinary using the cloudinary library
    cloudinary.config({
      cloud_name: 'devgg8sbw',
      api_key: '221433982336793',
      api_secret: '1HIPnzsVj9AeLUPDBsGs9LtvdUQ',
    });

    return new Promise<string>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: 'raw' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        })
        .end(buffer);
    });

    //  const result = await cloudinary.uploader
    //     .upload_stream(
    //       {
    //         resource_type: 'raw',
    //       },
    //       (error, result) => {
    //         if (error) {
    //           reject(error);
    //         } else {
    //           resolve(result);
    //         }
    //         return result.secure_url,
    //       },
    //     )
    //     .end(buffer);
  }
}
