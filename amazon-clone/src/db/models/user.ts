import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { hashPassword } from "@/utils/bcrypt";
import { UserType } from "@/types";

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";
const COLLECTION_USER = "users";

export const getUserCollection = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);
  const collection = db.collection(COLLECTION_USER);
  return collection;
};

export const findAllUsers = async () => {
  const userCollection = await getUserCollection();
  const users = (await userCollection
    .find(
      {},
      {
        projection: {
          password: 0,
        },
      }
    )
    .toArray()) as UserType[];
  return users;
};

export const findUserById = async (id: string) => {
  const userCollection = await getUserCollection();
  const user = (await userCollection.findOne(
    {
      _id: new ObjectId(id),
    },
    {
      projection: {
        password: 0,
      },
    }
  )) as UserType;

  return user;
};

export const findUserByEmail = async (email: string) => {
  const userCollection = await getUserCollection();
  const user = (await userCollection.findOne({
    email,
  })) as UserType;

  return user;
};

export const findUserByUsername = async (username: string) => {
  const userCollection = await getUserCollection();
  const user = (await userCollection.findOne(
    {
      username,
    },
    {
      projection: {
        password: 0,
      },
    }
  )) as UserType;

  return user;
};

type PayloadRegister = Omit<UserType, "_id">;

export const createUser = async (payload: PayloadRegister) => {
  const hashedPayload: PayloadRegister = {
    ...payload,
    password: hashPassword(payload.password),
  };

  const userCollection = await getUserCollection();
  const newUser = await userCollection.insertOne(hashedPayload);
  const user = (await userCollection.findOne(
    {
      _id: newUser.insertedId,
    },
    {
      projection: {
        password: 0,
      },
    }
  )) as UserType;

  return user;
};
