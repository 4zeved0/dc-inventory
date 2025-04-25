'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import { dataNavbar } from './NavData';

function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="w-full h-[90px] flex items-center bg-gray-100">
      <ul className="max-w-7xl w-full m-auto flex items-center justify-between">
        <li>
          <Link href="/" className="text-xl font-bold">DC Control</Link>
        </li>
        <div className="flex gap-3">
          {session && dataNavbar.map((data) => (
            <li className="hover:underline" key={data.name}>
              <Link href={data.pathname}>{data.name}</Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
