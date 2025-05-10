import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";

function header() {
  return (
    <>
      <div className="w-full bg-white flex flex-col md:flex-row  p-8 md:pt-8 gap-6">
        <div className="w-full md:w-1/3 flex flex-col md:flex-row justify-between">
          <Link href="/">
            <Image
              src={"/images/logo.png"}
              alt="Furniro"
              width={200}
              height={40}
            />
          </Link>
        </div>
        <div className="w-full md:w-1/3 flex flex-col md:flex-row justify-center items-center md:justify-around">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/comparision">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="w-full md:w-1/3 flex justify-around items-center">
          <Link href="/">
            <VscAccount className="w-5 h-5" />
          </Link>

            <IoMdSearch className="w-5 h-5 " />

          <Link href="/">
            <FaRegHeart className="w-5 h-5" />
          </Link>

          <Link href="productcart">
            <FiShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default header;
