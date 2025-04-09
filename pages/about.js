import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
    <Header/>
    <div
      className="mt-16 min-h-screen bg-cream text-brand px-4 md:px-8 py-12"
      style={{
        backgroundImage: 'url("/loom-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-white/80 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-md max-w-7xl mx-auto flex flex-col md:flex-row gap-8 min-h-[80vh]">
        {/* Left: Text */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-bold">About Silk Mantra</h1>
          <p className="text-base leading-relaxed">
            My love affair with sarees began at a tender age, watching in awe as my mother effortlessly draped
            and wore them with grace. As I grew older, I realized that the saree was more than just a piece of
            cloth - it was a symbol of tradition, culture and family heritage. 
            I saw how it connected generations, from my grandmother to my mother and now to me, each one adding
            their own story to its folds. 
            This deep appreciation and reverence for the saree drove me to start my own venture, to share this 
            beauty and significance with others. 
          </p>
          <p className="text-base leading-relaxed">
          At <strong>Silk Mantra</strong>, each piece is handpicked from master artisans across the country — from the rich 
          regal drapes of Kanchipuram to the cultural folds of Kerala Kasavu sarees
          </p>

          <p className="text-logo-gradient leading-relaxed">
           <strong>- Swetha Unnikrishnan</strong>
          </p>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/3 h-auto relative min-h-[300px]">
          <Image
            src="/about-right.png" // 👉 Replace with your image
            alt="Loom or Artisan"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}