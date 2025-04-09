import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;

  const [products, setProducts] = useState([]);

  const [sort, setSort] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [loading, setLoading] = useState(false);



  function buildQueryParams() {
    const params = new URLSearchParams();
  
    if (q) params.set('q', q);
    if (selectedCategories.length > 0) params.set('category', selectedCategories.join(','));
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (sort) params.set('sort', sort);
  
    return params.toString();
  }
  

    useEffect(() => {
    async function fetchData() {
        setLoading(true);
        const query = buildQueryParams();
        const res = await fetch(`/api/sarees?${query}`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }

    fetchData();
    }, [q, selectedCategories, minPrice, maxPrice, sort]);


  return (
    <>
    <Header/>
    <div className="mt-16 min-h-screen px-4 md:px-8 py-10 bg-cream">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold text-brand">Search</h1>
        <p className="text-sm text-body">{products.length} results for “{q}”</p>

        {/* Search Bar */}
        <div className="mt-4 max-w-md">
          <input
            type="text"
            placeholder="Search again..."
            defaultValue={q}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push(`/search?q=${encodeURIComponent(e.target.value)}`);
              }
            }}
          />
        </div>
      </div>
      <div className="border-b border-gray-300 pb-4 mb-6" />

      <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Filters Column */}
            <aside className="w-full md:w-1/4 space-y-6 pr-4 md:border-r border-gray-300">
                <div>
                    <label className="text-sm text-brand block mb-1">Craft / Fabric</label>
                    <div className="flex flex-col gap-2">
                        {['Cotton', 'Linen', 'Silk'].map((category) => (
                        <label key={category} className="flex items-center gap-2 text-sm">
                            <input
                            type="checkbox"
                            value={category}
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                setSelectedCategories((prev) => [...prev, category]);
                                } else {
                                setSelectedCategories((prev) =>
                                    prev.filter((item) => item !== category)
                                );
                                }
                            }}
                            />
                            {category}
                        </label>
                        ))}
                    </div>
                </div>
                <hr className="border-t border-gray-200" />
                <div>
                    <label className="text-sm text-brand block mb-1">Price Range</label>
                    <div className="flex gap-2">
                        <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        />
                        <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        />
                    </div>
                    {/* Slider */}
                    <input
                        type="range"
                        min="0"
                        max="20000"
                        step="100"
                        value={maxPrice || 20000}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full"
                    />
                    <p className="text-xs text-body mt-1">Slide to set max price (₹{maxPrice || '20,000'})</p>
                </div>
            </aside>

            {/* Right: Results Column */}
            <div className="w-full md:w-3/4 space-y-4">
                {/* Sort + Applied Filters */}
                <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex gap-2 flex-wrap">
                    {selectedCategories.map((cat) => (
                    <span
                        key={cat}
                        onClick={() =>
                            setSelectedCategories((prev) =>
                              prev.filter((item) => item !== cat)
                            )
                        }
                        className="text-sm bg-accent text-white px-3 py-1 rounded-full"
                    >
                        {cat}
                    </span>
                    ))}

                    {(minPrice || maxPrice) && (
                    <button
                        onClick={() => {
                            setMinPrice('');
                            setMaxPrice('');
                        }}
                        className="text-sm bg-accent text-white px-3 py-1 rounded-full"
                    >
                        ₹{minPrice || '0'} – ₹{maxPrice || '∞'} <span className="text-xs font-bold">×</span>
                    </button>
                    )}
                </div>

                <div>
                    <label className="text-sm text-brand mr-2">Sort</label>
                    <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border border-gray-300 px-3 py-1 rounded-md"
                    >
                    <option value="">Default</option>
                    <option value="price_asc">Price low to high</option>
                    <option value="price_desc">Price high to low</option>
                    </select>
                </div>
                </div>
                <div className="border-b border-gray-300 mb-4" />

                {/* Product Grid */}
                {loading ? (
                <div className="text-center text-brand py-10">Loading results...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {products.length === 0 ? (
                        <p className="text-sm text-brand col-span-full">No matching results found.</p>
                        ) : (
                        products.map((product) => (
                            <Link href={`/product/${product.id}`} key={product.id}>
                            <div className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer">
                                <div className="relative w-full h-48">
                                <Image
                                    src={product.image_url}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                                </div>
                                <div className="p-3">
                                <h3 className="text-sm font-medium text-brand truncate">{product.name}</h3>
                                <p className="text-sm text-accent mt-1">{product.price}</p>
                                </div>
                            </div>
                            </Link>
                        ))
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
    <Footer/>
    </>
  );
}
