import Card from "@/components/Card";
import { ProductType, MyResponse } from "@/types";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import Link from "next/link";
import Footer from "@/components/Footer";

const fetchProducts = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/api/products?limit=8`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const responseJson: MyResponse<ProductType[]> = await response.json();

  if (!response.ok) {
    throw new Error("Internal Server Error");
  }

  return responseJson;
};

const Home = async () => {
  const fetchedProducts = await fetchProducts();
  const products = fetchedProducts.data;

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="px-10">
        <Banner />
        <h2 className="text-2xl py-2">Featured Products</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((prod: ProductType) => (
            <Card product={prod} key={prod.slug} />
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mt-10">
        <Link href="/products">
          <button className="btn bg-orange-500 text-xl text-black hover:bg-orange-700 hover:text-white mt-5">
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
            See All Products
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
