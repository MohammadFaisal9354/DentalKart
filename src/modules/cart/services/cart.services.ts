import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { Product } from 'src/modules/products/entities/product.entity';
import { ShoppingCart } from '../entities/cart.entity';
import { User } from 'src/modules/user/entities/user.entity';
@Injectable()
export class CartService {
  async addCart(body: any) {
    const product = await Product.findOne({
      where: { id: body.productId },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    const specificUser = await User.findOne({
      where: { id: body.userId },
    });

    if (!specificUser) {
      throw new Error('User not found, maybe User id is wrong');
    }

    // Check if the product is already in the shopping cart
    const item = await ShoppingCart.findOne({
      where: { productId: body.productId, userId: body.userId },
    });

    if (item) {
      // Update the quantity of the product in the shopping cart
      item.quantity += body.quantity;
      await item.save();
    } else {
      // Add the product to the shopping cart
      await ShoppingCart.create({
        productId: body.productId,
        quantity: body.quantity,
        userId: body.userId,
      });
    }

    return { message: 'Product added to cart' };
  }
  async viewCart(body) {
    // Get all the items in the shopping cart with the product information
    // const items = await ShoppingCart.findAll({

    // });
    const products = await ShoppingCart.findAll({
      //attributes: ['productId'],
      attributes: [],
      where: { userId: body.userId },
      include: [
        {
          model: Product,
          attributes: ['name', 'description', 'brand', 'price'],
        },
      ],
    });
    //const r= products.map((iter) => iter.productId);
    return products;
    // return { cart: r };
  }
  async removeProductFromCart(userId, productId) {
    // Delete the item from the shopping cart
    await ShoppingCart.destroy({
      where: { userId: userId, productId: productId },
    });

    return { message: 'Product removed from cart' };
  }
  async placeOrder() {
    // Logic to place order
    return { message: 'Order placed' };
  }
  async generateReceipt() {
    // Logic to generate receipt
    return { receipt: {} };
  }
}
