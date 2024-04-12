import WishlistButton from "@/components/WishlistButton";
import { MyResponse, ProductType } from "@/types";
import { currencyConverter } from "@/utils/currency";

type Props = {
  params: { slug: string };
};

const DetailPage = async (props: Props) => {
  const slug = props.params.slug;

  const fetchProducts = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${slug}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const responseJson: MyResponse<ProductType> = await response.json();

    if (!response.ok) {
      throw new Error("Internal Server Error");
    }

    return responseJson;
  };

  const fetchedProducts = await fetchProducts();
  const product = fetchedProducts.data as ProductType;

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1">
              <div className="h-[460px] mb-3">
                <img
                  className="w-full h-full object-cover"
                  src={product.thumbnail}
                  alt="Product Image"
                />
              </div>
              <div className="flex snap-mandatory snap-x  gap-x-4 max-w-max">
                {product.images?.map((img, idx) => (
                  <div
                    className="w-24 snap-always snap-start rounded-2xl "
                    key={`detail-${slug}-${idx}`}
                  >
                    <img src={img} />
                  </div>
                ))}
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {product.excerpt}
              </p>
              <div className="flex mb-2">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
              </div>
              <span className="text-gray-600 dark:text-gray-300">
                {currencyConverter(product.price as number)}
              </span>
              <div className="mb-8 mt-5">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Tags:
                </span>
                <div className="flex items-center mt-2">
                  {product.tags?.map((tag) => (
                    <button
                      key={`tags-${tag}`}
                      className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-justify mt-2">
                  {product.description}
                </p>
              </div>
              <div className="flex -mx-2 mt-8">
                <div className="w-1/2 px-2">
                  <WishlistButton props={product._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
