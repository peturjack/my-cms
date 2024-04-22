import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";

const Hero = () => {
  const items = [
    "https://res.cloudinary.com/dtzca3rj5/image/upload/v1693307270/cld-sample-5.jpg",
    "https://res.cloudinary.com/dtzca3rj5/image/upload/v1693307270/cld-sample-4.jpg",
    "https://res.cloudinary.com/dtzca3rj5/image/upload/v1693307269/cld-sample-3.jpg",
    "https://res.cloudinary.com/dtzca3rj5/image/upload/v1711634859/Car%20rental/cars/ales-krivec-N-aTikX-b00-unsplash_o9yujq.jpg",
  ];
  return (
    <>
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
      <div>Hello</div>
    </>
  );
};

export default Hero;
