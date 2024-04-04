import Image from "next/image";
import Time from "@/components/navbar/time";
import MyAvatar from "@/components/navbar/my-avatar";
import Link from "next/link";
import { Routes } from "../../../routes";

export default function Navbar() {
  return (
    <div className="flex w-full items-center justify-between bg-sky-50 p-5 dark:bg-gray-800">
      <Link href={Routes.MAIN}>
        <Image
          src="/logo.png"
          alt="Video platform"
          width={40}
          height={38}
          quality={100}
        />
      </Link>
      <div className="flex items-center gap-x-5">
        <Time />
        <MyAvatar />
      </div>
    </div>
  );
}
