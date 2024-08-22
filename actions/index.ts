"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getCategories = () => {
  return db.category.findMany();
};

export const getProductsByCategory = (category_id: string) => {
  return db.product.findMany({
    where: {
      category_id,
    },
  });
};

export const getProductsById = (product_id: string) => {
  return db.product.findFirst({
    where: {
      id: product_id,
    },
  });
};

export const createOrder = (name?: string) => {
  return db.order.create({
    data: {
      num_table: 1,
      delivery: false,
      name,
    },
    select: {
      id: true,
    },
  });
};

export const createOrderItems = (
  order_id: string,
  product_id: string,
  amount: number
) => {
  return db.item.create({
    data: {
      order_id,
      product_id,
      amount,
    },
  });
};

export const getOrderDetails = (order_id: string) => {
  return db.item.findMany({
    where: {
      order_id,
    },
    include: {
      order: true,
      product: true,
    },
  });
};

export const deleteOrder = async (order_id: string) => {
  await db.item.deleteMany({
    where: {
      order_id,
    },
  });

  await db.order.delete({
    where: {
      id: order_id,
    },
  });

  revalidatePath("/print");
};
