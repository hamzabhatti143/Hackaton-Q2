import ProductActions from "@/components/productaction";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";
import { FaFacebookF } from "react-icons/fa";
import { LuTwitter } from "react-icons/lu";
import { LuLinkedin } from "react-icons/lu";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  discountPercentage: number;
  imageUrl: string;
  tags: string[];
}

type Props = {
  params: {
    title: string;
  };
};

const ProductDetailsPage = async ({ params }: Props) => {
  const data: Product[] = await client.fetch(`
    *[_type == "product"]{
      _id,
      title,
      description,
      price,
      discountPercentage,
      tags,
      "imageUrl": productImage.asset->url
    }
  `);

  const decodedTitle = decodeURIComponent(params.title);
  const product = data.find((item) => item.title === decodedTitle);

  if (!product) {
    return notFound(); // Handles 404 if product not found
  }
  const postData = async () => {
    const data = await client.fetch(`*[_type == "product"]{
        title,
        description,
        price,
        dicountPercentage,
        tags,
        "imageUrl": productImage.asset->url
      }`);
    return data;
  };

  const receivedData: Product[] = await postData();
  console.log(receivedData);
  return (
    <>
      <Header />
      <div className="w-full flex bg-[#F9F1E7]  items-center justify-between p-4 md:p-16">
        <h2 className="flex items-center justify-between text-black tracking-wide">
          Home <IoIosArrowForward />
          Shop <IoIosArrowForward />
          <RxDividerVertical className="text-black text-2xl" />
          <span className=" text-black">{product.title}</span>
        </h2>
      </div>
      <div className="w-full p-4 md:p-10 flex flex-col md:flex-row  border-b-2">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={600}
              height={300}
              className="rounded-md w-[500px] h-[530px]"
            />
          )}
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="">
            <h3 className="font-semibold leading-6 text-4xl md:text-[42px]">
              {product.title}
            </h3>
            <p className="text-black font-medium text-2xl mt-4">
              {product.price}$
            </p>
            <div className="flex justify-around items-center w-full md:w-1/2">
              <MdOutlineStarPurple500 className="fill-amber-400" />
              <MdOutlineStarPurple500 className="fill-amber-400" />
              <MdOutlineStarPurple500 className="fill-amber-400" />
              <MdOutlineStarPurple500 className="fill-amber-400" />
              <MdOutlineStarBorderPurple500 />|{" "}
              <p className="text-black">5 Customer Review</p>
            </div>
            <p className="w-full md:w-3/4 text-justify mt-4">
              {product.description.slice(0, 200)}
            </p>
          </div>

          <div>
            <div className="w-full md:w-1/2 mt-4">
              <h2 className="text-black">Colors </h2>
              <div className="w-full md:w-1/2 flex">
                <p className="w-7 h-7 rounded-full border-2 bg-[#816DFA]"></p>
                <p className="w-7 h-7 rounded-full border-2 bg-[#000000]"></p>
                <p className="w-7 h-7 rounded-full border-2 bg-[#B88E2F]"></p>
              </div>
            </div>
          </div>
          <ProductActions />

          <div>
            <p className="text-black mt-4">SKU : SS001</p>
            <p className="text-black mt-4">Category : {product.title}</p>
            <p className="text-black mt-4">
              Tags : Sofa, Chair, Home, Shop
            </p>
            <p className="flex w-1/2 gap-4 mt-4">
              <span className="text-black">Share : </span>
              <Link href="">
                <FaFacebookF />
              </Link>
              <Link href="">
                <LuLinkedin />
              </Link>
              <Link href="">
                <LuTwitter />
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center gap-4 md:gap-10 p-3 md:p-6">
        <h2 className="text-black text-lg md:text-2xl font-medium">
          Description
        </h2>
        <h2 className="text-black text-lg md:text-2xl font-medium">
          Addional Information
        </h2>
        <h2 className="text-black text-lg md:text-2xl font-medium">
          Reviews [5]
        </h2>
      </div>

      <div className="w-full px-2 md:p-0 md:px-60">
        <p className="text-black text-justify text-base">
          {product.description}
        </p>
      </div>
      <div className="flex flex-col md:flex-row p-4 items-center justify-around mt-4 gap-8 w-full">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={200}
            height={100}
            className="w-[272px] h-60 m-auto rounded-md"
          />
        )}

        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={200}
            height={100}
            className="w-[272px] h-60 m-auto rounded-md"
          />
        )}
      </div>
      <h2 className="text-center font-medium text-4xl w-full pt-10">
        Related Products
      </h2>

      <div
        className="w-full flex flex-wrap justify-center gap-4	
               md:justify-around items-center pt-0 p-0 md:p-16"
      >
        {receivedData.slice(0, 3).map((receivedData) => (
          <div
            key={receivedData.title}
            className="w-11/12 flex flex-col justify-center space-y-4 md:w-1/4 mt-10 md:mt-0 "
          >
            <div>
              <Image
                src={receivedData.imageUrl}
                alt="Images"
                width={120}
                height={80}
                className="w-[272px] h-60 m-auto rounded-md"
              />
            </div>

            <Link
              href={`/productdetails/${receivedData.title}`}
              className="font-semibold leading-7 text-2xl"
            >
              {receivedData.title}
            </Link>
            <p className="text-black text-base">
              {receivedData.description.slice(0, 250)}
            </p>
            <h3 className="font-semibold leading-7 text-xl">
              Rs {receivedData.price}
            </h3>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center items-center">
        <button
          className="w-40 p-2 rounded-lg text-center border border-[#B88E2F] bg-white text-[#B88E2F] 
    hover:border-0 hover:bg-[#B88E2F] hover:text-white"
        >
          <Link href="/shop">Shop More</Link>
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
