import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';

const images = [
  { src: '/Hero1.png', href: '/product/6' },
  { src: '/Hero2.png', href: '/product/5' },
  { src: '/Hero3.png', href: '/product/8' },
  { src: '/Hero4.png', href: '/product/7' },
  { src: '/Hero5.png', href: '/product/4' },
];

export default function HeroCarousel() {
  return (
    <div className="mt-16"> {/* space below header */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        speed={1500} // 👈 fade transition duration
        pagination={{ clickable: true }}
        className="w-full h-[500px] md:h-[650px] lg:h-[700px]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Link href={img.href}>
              <div className="w-full h-full relative animate-zoomOut">
                <Image
                  src={img.src}
                  alt={`Hero ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="cursor-pointer"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
