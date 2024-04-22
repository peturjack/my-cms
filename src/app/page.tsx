import { getSession } from "@auth0/nextjs-auth0";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Hero from "./components/Hero";
import AddProductForm from "./components/Form/form";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default async function ProfileServer() {
  const items = [
    "https://res.cloudinary.com/dtzca3rj5/image/upload/v1693307270/cld-sample-5.jpg",
    "https://res.cloudinary.com/dtzca3rj5/image/upload/v1693307270/cld-sample-4.jpg",
    "https://res.cloudinary.com/dtzca3rj5/image/upload/v1693307269/cld-sample-3.jpg",
    "https://res.cloudinary.com/dtzca3rj5/image/upload/v1711634859/Car%20rental/cars/ales-krivec-N-aTikX-b00-unsplash_o9yujq.jpg",
  ];

  const session = await getSession();
  const user = session?.user;
  // try {
  // const { rows } = await sql`SELECT * FROM hello`;
  //  {rows.map((row) => (
  //  <div className="flex" key={row.id}>
  //  id: {row.id} name: {row.name} email: {row.email}
  // {/* Adjust this line based on your column names */}
  // </div>
  //  ))}

  if (user) {
    return (
      <>
        <div>
          <div className="">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {items.map((item) => {
                  return (
                    <CarouselItem key={item}>
                      <img
                        className=" h-[400px] w-screen object-cover object-center"
                        src={item}
                        alt=""
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="flex flex-col justify-center items-center mb-7">
            <img
              className="h-[60px] w-[60px] rounded-full"
              src={user.picture}
              alt={user.name}
            />
            <h2>Welcome {user.name}</h2>
            <p>{user.email}</p>

            <UserProvider>
              <AddProductForm />
            </UserProvider>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Hero />
    </>
  );
} //catch (error) {
//console.error("Error fetching data:", error);
// return <div>Error fetching data</div>;
// }
//}
