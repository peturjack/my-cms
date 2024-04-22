"use client";
import React from "react";
import { DeleteProduct } from "@/app/api/products/actions";
import { useRouter } from "next/navigation";

export default function DeleteButton({ productId }: any) {
  const router = useRouter();
  const handleDelete = async () => {
    await DeleteProduct(productId);

    router.push("/products");

    // handle what happens after deletion here
  };
  return (
    <>
      <svg
        className="h-6 w-6 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        onClick={handleDelete}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </>
  );
}
