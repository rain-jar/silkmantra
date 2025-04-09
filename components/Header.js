import { useState } from 'react';
import { FiMenu, FiSearch, FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '../stores/cartStore';


export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <>
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
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <FiSearch />
          </button>
          <Link href="/cart" passHref>
            <div className="relative">
              <button>
                <FiShoppingCart />
              </button>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-highlight text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </header>
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-start justify-center pt-20 px-4">
          <form onSubmit={handleSearchSubmit} className="bg-white w-full max-w-md rounded-lg shadow-lg flex">
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a saree..."
              className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none"
            />
            <button
              type="submit"
              className="bg-brand text-white px-4 py-2 rounded-r-lg hover:bg-accent"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </>
  );
}
