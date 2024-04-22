import { NextResponse } from "next/server";
import { AddProduct, GetAllProducts } from "@/app/api/products/actions";


export async function GET(request: Request) {
    
    const allProducts = await GetAllProducts();
    console.log(allProducts)
    return NextResponse.json({allProducts, status: 200})
}

export async function POST(request: Request) {
    const productBody = await request.json()
    console.log(productBody + "Hello")
   await AddProduct(productBody.userid, productBody.image, productBody.title, productBody.description )
    
    return NextResponse.json({productBody, status: 200}, )
}

