"use client";
import { WishlistType, MyResponse } from "@/types";
import { currencyConverter } from "@/utils/currency";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ObjectId } from "mongodb";

const WishlistPage = () => {
  const [wishlists, setWishlists] = useState<WishlistType[]>([]);

  async function fetchWishlists() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlists`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const responseJson: MyResponse<WishlistType[]> = await response.json();
    if (!response.ok) {
      throw new Error("Internal Server Error");
    }
    const data = responseJson.data as WishlistType[];
    setWishlists(data);
  }

  async function deleteWishlist(wishId: ObjectId) {
    const stringId = wishId.toString();
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlists/${stringId}`,
      {
        method: "DELETE",
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Internal Server Error");
    }
    fetchWishlists();
  }

  useEffect(() => {
    fetchWishlists();
  }, []);
  return (
    <>
      {wishlists && wishlists.length > 0 ? (
        <>
          <div className="py-12">
            <div className="hidden sm:flex flex-col justify-start items-start">
              <div className="pl-4 px-20 flex flex-row justify-center items-end space-x-4">
                <h1 className="text-4xl font-semibold leading-9 text-gray-800  dark:text-white">
                  My Wishlists
                </h1>
                <p className="text-base leading-4 text-gray-600 dark:text-white pb-1">
                  ( {wishlists.length} items)
                </p>
              </div>
              <table
                className="w-full mt-16 whitespace-nowrap"
                data-theme="corporate"
              >
                <thead
                  aria-label="table heading"
                  className="w-full h-16 text-left py-6 bg-gray-50 border-gray-200"
                >
                  <tr className="text-center">
                    <th className="text-base font-medium leading-4 text-gray-600 ">
                      NO.
                    </th>
                    <th className="text-base font-medium leading-4 text-gray-600 ">
                      PRODUCT IMAGE
                    </th>
                    <th className="text-base font-medium leading-4 text-gray-600 dark:text-white ">
                      PRODUCT NAME
                    </th>
                    <th className="text-base font-medium leading-4 text-gray-600 dark:text-white ">
                      PRICE
                    </th>
                    <th className="  items-center justify-center text-center text-base font-medium leading-4 text-gray-600 dark:text-white ">
                      MORE OPTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full ">
                  {wishlists.map((wishlist: WishlistType, idx: number) => (
                    <>
                      <tr className=" border-gray-200 border-b text-center">
                        <th className="my-10 text-base font-medium leading-4 text-gray-600 ">
                          <p className="text-base leading-4 text-gray-800 dark:text-white">
                            {idx + 1}
                          </p>
                        </th>
                        <th
                          key={
                            `wishlist` +
                            wishlist.productDetail[0].thumbnail +
                            idx
                          }
                          className="flex justify-center items-center"
                        >
                          <img
                            className=" my-10 4 h-32 w-32"
                            src={wishlist.productDetail[0].thumbnail}
                            alt="shoes"
                          />
                        </th>
                        <th className="my-10 text-base font-medium leading-4 text-gray-600 ">
                          <p className="text-base  text-gray-800 dark:text-white">
                            {wishlist.productDetail[0].name}
                          </p>
                        </th>
                        <th className="mt-10 ">
                          <p className="dark:text-white">
                            {currencyConverter(
                              wishlist.productDetail[0].price as number
                            )}
                          </p>
                        </th>
                        <th>
                          <div>
                            <Link
                              href={{
                                pathname:
                                  "/products/" + wishlist.productDetail[0].slug,
                              }}
                            >
                              <button className="btn bg-blue-500 text-xl text-black hover:bg-blue-700 hover:text-white mt-5 w-72">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                  />
                                </svg>
                                See Product Details
                              </button>
                            </Link>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                deleteWishlist(wishlist._id);
                              }}
                              className="btn bg-red-500 text-xl text-black hover:bg-red-700 hover:text-white mt-5 w-72"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                              </svg>
                              Delete From Wishlists
                            </button>
                          </div>
                        </th>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex h-screen items-center justify-center text-2xl">
            <p className=" font-bold">You have no wishlisted items yet</p>
          </div>
        </>
      )}
    </>
  );
};

export default WishlistPage;
