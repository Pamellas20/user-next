import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-teal-600 p-4">
      <ul className="flex flex-col sm:flex-row sm:space-x-6 text-white text-center">
        <li className="py-2 sm:py-0">
          <Link href="/users/1" className="hover:text-coral-500">
            User 1
          </Link>
        </li>
        <li className="py-2 sm:py-0">
          <Link href="/users/2" className="hover:text-coral-500">
            User 2
          </Link>
        </li>
        <li className="py-2 sm:py-0">
          <Link href="/users/3" className="hover:text-coral-500">
            User 3
          </Link>
        </li>
      </ul>
    </nav>
  );
}