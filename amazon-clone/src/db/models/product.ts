import { Db } from "mongodb";
import { getMongoClientInstance } from "../config";
import { ProductType } from "@/types";

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";
const COLLECTION_USER = "products";

export const getProductCollection = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);
  const collection = db.collection(COLLECTION_USER);
  return collection;
};

export const findAllProducts = async () => {
  const productCollection = await getProductCollection();
  const products = (await productCollection
    .find({})
    .toArray()) as ProductType[];
  return products;
};

export const findProductBySlug = async (slug: string) => {
  const productCollection = await getProductCollection();
  const product = (await productCollection.findOne({
    slug,
  })) as ProductType;

  return product;
};

export const paginationProduct = async (limit: number, search: string) => {
  if (!limit) {
    limit = 10;
  }

  if (!search) {
    search = "";
  }

  let regex = new RegExp(search);
  const productCollection = await getProductCollection();
  const products = (await productCollection
    .find({ name: regex })
    .limit(limit)
    .toArray()) as ProductType[];

  return products;
};
