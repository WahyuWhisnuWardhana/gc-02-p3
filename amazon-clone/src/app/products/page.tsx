"use client";
import { ProductType, MyResponse } from "@/types";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "@/components/Card";
import { useSearchParams } from "next/navigation";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(5);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  async function fetchProducts() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/api/products?search=${search}&limit=${limit}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const responseJson: MyResponse<ProductType[]> = await response.json();
    if (!response.ok) {
      throw new Error("Internal Server Error");
    }
    const data = responseJson.data as ProductType[];
    if (data.length < 50) {
      setTimeout(() => {
        setLimit(limit + 10);
        setProducts(data);
      }, 500);
    } else {
      setHasMore(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (products.length > 0) {
    return (
      <div className="bg-gray-100">
        <div className="px-10">
          <h2 className="text-2xl py-5 text-center">Products List</h2>
          <InfiniteScroll
            className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8"
            dataLength={products.length}
            next={fetchProducts}
            hasMore={hasMore}
            loader={<h4 className="bold">Loading...</h4>}
          >
            {products.map((product: ProductType) => (
              <Card product={product} key={product.slug} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
};

export default ProductsPage;
