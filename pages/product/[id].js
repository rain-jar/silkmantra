import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCartStore } from '../../stores/cartStore';


export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 → 1.5 → 2 → back to 1
  const offset = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const imgRef = useRef(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);

  const addToCart = useCartStore((state) => state.addToCart);


  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
        const res = await fetch(`/api/sarees/${id}`);
        const data = await res.json();
        setProduct(data);
    }
    fetchProduct();
  }, [id]);

  function handlePointerDown(e) {
    if (zoomLevel === 1) return;
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    };
    if (imgRef.current) {
        imgRef.current.setPointerCapture(e.pointerId);
    }
  }
  
  function handlePointerMove(e) {
    if (!isDragging.current || zoomLevel === 1) return;
    offset.current = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    hasDragged.current = true;

    if (imgRef.current) {
      imgRef.current.style.transform = `scale(${zoomLevel}) translate(${offset.current.x}px, ${offset.current.y}px)`;
    }
  }
  
  function handlePointerUp(e) {
    hasDragged.current = false;
    isDragging.current = false;
    if (imgRef.current) {
        imgRef.current.releasePointerCapture(e.pointerId);
    }
  }


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
            <button 
              onClick={() => {
                addToCart(product);
                console.log(useCartStore.getState().cart);
              }}
              className="w-full bg-gradient-to-r from-brand via-accent to-brand text-white px-6 py-3 rounded-full font-semibold hover:bg-brand transition-colors duration-300"
            >
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
                    className="relative max-w-[90vw] max-h-[90vh] overflow-hidden select-none"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (hasDragged.current) return; // ✅ Skip zoom toggle if dragged
                        setZoomLevel((prev) => {
                          const next = prev >= 2 ? 1 : prev + 0.5;
                          offset.current = { x: 0, y: 0 };
                          if (imgRef.current) {
                            imgRef.current.style.transform = `scale(${next}) translate(0px, 0px)`;
                          }
                          return next;
                        });
                      }}
                >
                    <img
                        ref={imgRef}
                        src={product.image_url}
                        alt={product.name}
                        width={800}
                        height={1000}
                        className={`transition-transform duration-300 ${
                            zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
                        }`}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        style={{
                            transform: `scale(${zoomLevel}) translate(${offset.current.x}px, ${offset.current.y}px)`,
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
