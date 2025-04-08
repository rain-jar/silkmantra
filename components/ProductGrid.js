import Link from 'next/link';
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: "Banarasi Blue Silk",
    price: "₹8,499",
    image: "/Hero1.png",
  },
  {
    id: 2,
    name: "Soft Kanjivaram Blue",
    price: "₹10,999",
    image: "/Hero2.png",
  },
  {
    id: 3,
    name: "Organza Pastel Pink",
    price: "₹6,799",
    image: "/Hero5.png",
  },
  {
    id: 4,
    name: "Chanderi Gold Beige",
    price: "₹7,250",
    image: "/Hero4.png",
  },
  {
    id: 5,
    name: "Linen Green Woven",
    price: "₹5,499",
    image: "/Hero3.png",
  },
];

export default function ProductGrid() {
  return (
    <section className="px-4 md:px-8 py-10">
      <h2 className="text-2xl font-semibold text-brand mb-6">Curated Collection</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer">
              <div className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-brand truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-accent mt-1">{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
