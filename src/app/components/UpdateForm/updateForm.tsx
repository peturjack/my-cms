"use client";
import React from "react";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdateProduct } from "@/app/api/products/actions";
import { useState } from "react";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  productid: any;
  image: string;
  title: string;
  description: string;
};

const UpdateForm = ({ productid, image, title, description }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const formSchema = z.object({
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters" })
      .max(50, { message: "Title can't be over 50 characters" }),
    description: z
      .string()
      .min(2, { message: "Description must be at least 2 characters" })
      .max(200, { message: "Description can't be over 20 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      description,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await UpdateProduct(productid, image, values.title, values.description);
  };
  return (
    <>
      <button
        onClick={toggleModal}
        className="hover:bg-primary hover:text-primary-foreground duration-200 border-2 border-primary text-primary font-bold rounded-md py-3 px-4"
      >
        Update
      </button>
      {openModal && (
        <>
          <div
            onClick={toggleModal}
            className="inset-0 absolute bg-black bg-opacity-60 z-10 w-screen h-screen"
          ></div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-popover p-10 rounded-md z-20"
            >
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <span className="font-bold text-2xl mb-3 flex justify-self-center">
                  Update your product
                </span>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <>
                      <FormLabel className="text-primary" htmlFor="picture">
                        Picture
                      </FormLabel>

                      <Input
                        className=" border-2 border-gray-700 bg-input text-primary focus-visible:ring-0"
                        id="picture"
                        type="text"
                      />
                      <FormLabel
                        className="text-primary mt-4"
                        htmlFor="picture"
                      >
                        Title
                      </FormLabel>
                      <Input
                        className=" border-2 border-gray-700 bg-input text-primary focus-visible:ring-0"
                        type="text"
                        placeholder="Title"
                        {...field}
                      />
                      <FormMessage />
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <>
                      <FormLabel
                        className="text-primary mt-4"
                        htmlFor="picture"
                      >
                        Description
                      </FormLabel>
                      <Textarea
                        className=" border-2 border-gray-700 bg-input text-primary focus-visible:ring-0"
                        placeholder="description"
                        {...field}
                      />
                      <FormMessage />
                    </>
                  )}
                />

                <button
                  className="bg-primary text-primary-foreground rounded-md py-2 mt-8 hover:opacity-70 duration-200"
                  type="submit"
                >
                  submit
                </button>
              </div>
            </form>
          </Form>
        </>
      )}
    </>
  );
};

export default UpdateForm;
