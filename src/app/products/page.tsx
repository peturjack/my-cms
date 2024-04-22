import { sql } from "@vercel/postgres";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";

const getData = async () => {
  const res = await fetch("https://my-cms-alpha.vercel.app/api/products", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const Products = async () => {
  const data = await getData();
  console.log(data);
  //JOIN users2 ON owner_id = users2.id
  //const { rows } = await sql`SELECT * FROM products`;
  //console.log(rows);
  return (
    <>
      <main className="max-w-[900px] m-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-6 overflow-hidden">
        {data.allProducts.map((row: any) => {
          return (
            <Link href={`/products/${row.id}`}>
              <div className="cursor-pointer" key={row.id}>
                <div className="overflow-hidden">
                  <img
                    className="hover:scale-125 backdrop duration-300 cursor-pointer h-[200px] w-full object-cover brightness-[85%] hover:brightness-100 "
                    src={row.image}
                    alt=""
                  />
                </div>
                <h2 className="text-xl font-bold">{row.title}</h2>
                <p className="text-secondary-foreground">{row.description}</p>
              </div>
            </Link>
          );
        })}
      </main>
    </>
  );
};
export default Products;
