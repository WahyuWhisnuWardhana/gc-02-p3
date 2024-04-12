import { ObjectId } from "mongodb";

export type UserType = {
  _id: ObjectId;
  name?: string;
  username: string;
  email: string;
  password: string;
};

export type ProductType = {
  _id: ObjectId;
  name: string;
  slug: string;
  description?: string;
  excerpt?: string;
  price?: number;
  tags?: string[];
  thumbnail?: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type WishlistType = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt?: string;
  updatedAt?: string;
  userDetail: UserType[];
  productDetail: ProductType[];
};

export type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};
