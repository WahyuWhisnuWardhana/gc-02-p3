import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { WishlistType } from "@/types";

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";
const COLLECTION_USER = "wishlists";
export type PayloadAddWishlist = Omit<WishlistType, "_id">;

export const getWishlistCollection = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);
  const collection = db.collection(COLLECTION_USER);
  return collection;
};

export const findWishlistsById = async (userId: ObjectId) => {
  const agg = [
    { $match: { userId: new ObjectId(userId) } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetail",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetail",
      },
    },
  ];
  const wishCollection = await getWishlistCollection();
  const wishlists = (await wishCollection
    .aggregate(agg)
    .toArray()) as WishlistType[];
  return wishlists;
};

export const findDuplicateWish = async (userId: string, prodId: string) => {
  const wishCollection = await getWishlistCollection();
  const duplicate = (await wishCollection.findOne({
    userId: new ObjectId(userId),
    productId: new ObjectId(prodId),
  })) as WishlistType;

  return duplicate;
};

export const addWishlist = async (payload: PayloadAddWishlist) => {
  const fullPayload: PayloadAddWishlist = {
    ...payload,
    userId: new ObjectId(payload.userId),
    productId: new ObjectId(payload.productId),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const wishCollection = await getWishlistCollection();

  const newUser = await wishCollection.insertOne(fullPayload);
  const wishlist = (await wishCollection.findOne({
    _id: newUser.insertedId,
  })) as WishlistType;

  return wishlist;
};

export const deleteWishlist = async (id: string) => {
  const wishCollection = await getWishlistCollection();
  const objId = new ObjectId(id);
  await wishCollection.deleteOne({
    _id: new ObjectId(objId),
  });
};
