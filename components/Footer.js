import { FiInstagram, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-brand text-cream px-4 md:px-8 py-10 mt-10">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        <h2 className="text-xl font-semibold">Silk Mantra</h2>
        <p className="text-sm text-cream/90">
            Weaving the spell of traditional elegance in every drape.
            Handpicked and Handwoven Silk Sarees
        </p>
        <div className="flex justify-center space-x-6 pt-4 text-2xl">
          <a href="https://www.instagram.com/silkmantrabyswethaunnikrishnan/" target="_blank" rel="noopener noreferrer">
            <FiInstagram className="hover:text-accent transition-colors duration-200" />
          </a>
          <a href="https://www.youtube.com/@SilkMantra" target="_blank" rel="noopener noreferrer">
            <FiYoutube className="hover:text-accent transition-colors duration-200" />
          </a>
        </div>
      </div>
    </footer>
  );
}
