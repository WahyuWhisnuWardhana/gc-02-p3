"use client";
import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const WishlistButton = ({ props }: { props: ObjectId }) => {
  const productId = props.toString();
  const navigation = useRouter();

  const payload = {
    userId: "",
    productId: productId,
    createdAt: "",
    updatedAt: "",
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/wishlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw toast.error("You already Wishlisted this product!");
    }

    navigation.push("/wishlists");
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <Toaster />
      <div className="border-2 border-black w-full">
        <button
          type="submit"
          className="btn w-full bg-gray-900  text-white py-2 px-4 text-bold hover:text-red-500 hover:bg-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Add to Wishlist
        </button>
      </div>
    </form>
  );
};

export default WishlistButton;
