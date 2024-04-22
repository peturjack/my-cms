import { sql } from "@vercel/postgres";
import { DeleteProduct } from "@/app/api/products/actions";
import DeleteButton from "@/app/components/DeleteButton/page";
import UpdateForm from "@/app/components/UpdateForm/updateForm";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const { rows } =
    await sql`SELECT *, products.id FROM products JOIN users2 ON users2.id = products.owner_id WHERE products.id = ${params.productId}`;
  console.log(rows);
  const { id, image, title, description, email } = rows[0];
  return (
    <>
      <div className="m-auto w-[700px]">
        <div className="">
          <img className="h-[400px] w-full object-cover" src={image} />
          <div className="p-4">
            <h1 className="text-4xl font-semibold">{title}</h1>

            <p className="mb-3">{description}</p>

            <div className="flex justify-between items-center">
              <div>
                <Link
                  href={`mailto:${email}`}
                  className="hover:opacity-70  duration-200 bg-primary text-primary-foreground font-bold rounded-md py-4 px-4 mr-3"
                >
                  Contact Seller
                </Link>
                <UpdateForm
                  productid={id}
                  image={image}
                  title={title}
                  description={description}
                />
              </div>

              <DeleteButton productId={params.productId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
