"use server"
import { sql } from "@vercel/postgres";
import { getSession } from "@auth0/nextjs-auth0";
import { revalidatePath } from "next/cache";


export async function GetAllProducts() {
  try {
    
    const { rows} = await sql`SELECT * FROM products`;
    console.log(rows)
    return rows;
    
  } catch (error) {
    console.error("cant get all products", error)
  }
}


export async function AddProduct(userid: any, image:string, title:string, description:string ) {
  try {
    await sql`INSERT INTO products(image, title, description, owner_id) VALUES (${image}, ${title}, ${description}, ${userid})`;

    console.log("Product added successfully");
    
    
  } catch (error) {
    console.error("Error adding product:", error );
  }
  
 
}

export async function UpdateProduct( productid:any,image:string, title:string, description:string ){
  const session = await getSession();
  const user = session?.user;
  try {
 
console.log(user?.nickname)
    const dataUpdate = await sql`UPDATE products SET image = ${image}, title = ${title}, description = ${description} WHERE owner_id = ${user?.nickname} AND id =${productid}`
    console.log("updated products successfully", dataUpdate)
  } catch (error) {
    console.error("error updating product", error)
  }
}


export async function DeleteProduct( productid:any) {
  const session = await getSession();
  const user = session?.user;
  try {
    const dataDelete = await sql`DELETE FROM products WHERE owner_id = ${user?.nickname} AND id =${productid}`;
    if(dataDelete.rowCount == 1)
    console.log("Product deleted successfully", dataDelete);
  } catch (error) {
    console.error("Error deleting product", error);
  }
}
