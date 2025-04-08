import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 → 1.5 → 2 → back to 1


  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      const res = await fetch(`http://localhost:3001/api/sarees/${id}`);
      const data = await res.json();
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-8 text-brand">Loading...</div>;

  return (
    <>
        <Header/>
        <div className="mt-16 min-h-screen px-4 md:px-8 py-12 flex flex-col md:flex-row gap-10 items-start bg-cream">
        {/* Left: Image */}
        <div className="w-full md:w-1/2">
            <div
                onClick={() => setShowModal(true)}
                className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-md cursor-zoom-in"
            >
                <Image
                    src={product.image_url}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-1/2 flex flex-col space-y-6">
            <h1 className="text-2xl font-semibold text-brand">{product.name}</h1>
            <h2 className="text-xl text-accent font-medium">Rs.{product.price}</h2>
            <p className="text-body text-sm leading-relaxed">{product.description}</p>
            <p className="text-body text-sm leading-relaxed">
                Please expect 5% - 10% colour variations due to individual phone displays.
            </p>
            <button className="w-full bg-highlight text-white px-6 py-3 rounded-full font-semibold hover:bg-brand transition-colors duration-300">
            Add to Cart
            </button>
        </div>
        </div>

        {showModal && (
            <div
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                onClick={() => {
                    setZoomLevel(1);
                    setShowModal(false);
                  }}
                  
            >
                <div
                className="relative flex items-center justify-center w-auto h-auto max-w-[90vw] max-h-[90vh] mx-auto"
                onClick={(e) => {
                    e.stopPropagation();
                    setZoomLevel((prev) => (prev >= 2 ? 1 : prev + 0.5));
                }}
                >
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        width={800} // You can tweak this
                        height={1000}
                        className={`transition-transform duration-300 ${zoomLevel > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                        style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'center',
                        }}
                    />
                </div>
            </div>
        )}
        <Footer />
    </>
  );
}
