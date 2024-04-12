"use client";
import { useSearchParams } from "next/navigation";

const ClientFlashComponent = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <>
      {errorMessage && (
        <p className="animate-pulse  px-4 py-2 text-center text-red-600">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default ClientFlashComponent;
