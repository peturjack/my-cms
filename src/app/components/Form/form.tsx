"use client";
import React from "react";

import { AddProduct } from "@/app/api/products/actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const AddProductForm = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  //console.log(user);
  //if (!user.nickname) return <div>No user id</div>;
  //const formAction = async (userid: {}, formData: FormData) =>
  // await AddProduct(userid, formData);

  //const addProduct = formAction.bind(null, user.nickname);

  const formSchema = z.object({
    image: z
      .string()
      .min(10, { message: "Please insert a full URL" })
      .max(300, { message: "Please insert a less full URL" }),
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
      image: "",
      title: "",
      description: "",
    },
  });
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) return <div>No user found</div>;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("test");
    await AddProduct(
      user.nickname,
      values.image,
      values.title,
      values.description
    );
    alert("Added product successfully!");
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className=" duration-200 border-2 border-primary text-primary-foreground bg-primary font-bold hover:opacity-70 rounded-md py-3 px-4"
      >
        ADD Product
      </button>
      {modal && (
        <>
          <div
            onClick={toggleModal}
            className="inset-0 absolute bg-black bg-opacity-60 z-10 w-full h-full"
          ></div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-popover p-10 rounded-md z-20"
            >
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <span className="font-bold text-2xl mb-3 flex justify-self-center">
                  Add your product
                </span>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <>
                      <FormLabel className="text-primary" htmlFor="picture">
                        Picture
                      </FormLabel>

                      <Input
                        {...field}
                        className=" border-2 border-gray-700 bg-input text-primary focus-visible:ring-0"
                        type="text"
                      />
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <>
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
                  Add
                </button>
              </div>
            </form>
          </Form>
        </>
      )}
    </>
  );
};

export default AddProductForm;
