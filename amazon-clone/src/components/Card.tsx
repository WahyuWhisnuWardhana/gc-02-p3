import { ProductType } from "@/types";
import { currencyConverter } from "@/utils/currency";
import Link from "next/link";
import WishlistButton from "./WishlistButton";
type Props = {
  product: ProductType;
};
const Card = (props: Props) => {
  const { _id, slug, name, price, thumbnail } = props.product;
  return (
    <>
      <div data-theme="corporate" className="max-w mx-auto border-solid  m-4">
        <div className="group relative h-full">
          <Link
            href={{
              pathname: "/products/" + slug,
            }}
          >
            <div className="group relative h-full">
              <div className="w-full h-full  flex flex-col">
                <img
                  src={thumbnail}
                  className="w-full h-full object-center object-cover opacity-100 group-hover:opacity-80 rounded-md"
                />

                <div className="h-full flex flex-col bg-slate-300 p-4">
                  <p className="text-xl text-black uppercase inline-block align-start text-left  font-bold">
                    {name}
                  </p>
                  <p className="text-md text-black inline-block align-start text-left ">
                    {currencyConverter(price as number)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <WishlistButton props={_id} />
        </div>
      </div>
    </>
  );
};

export default Card;
