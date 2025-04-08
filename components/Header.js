import { FiMenu, FiSearch, FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-cream shadow-sm z-50 h-16 px-4 flex items-center justify-between">
      {/* Left: Burger Icon */}
      <button className="text-2xl text-brand">
        <FiMenu />
      </button>

      {/* Center: Logo + Store Name */}
        <Link href="/">
        <div className="flex items-center space-x-2">
            <Image
            src="/logo.png"
            alt="Silk Mantra Logo"
            width={32}
            height={32}
            className="rounded-full"
            />
            <span className="font-semibold text-lg text-logo-gradient">Silk Mantra</span>
        </div>
        </Link>


      {/* Right: Search + Cart Icons */}
      <div className="flex items-center space-x-4 text-2xl text-brand">
        <button>
          <FiSearch />
        </button>
        <button>
          <FiShoppingCart />
        </button>
      </div>
    </header>
  );
}
