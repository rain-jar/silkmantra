import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import HeroCarousel from '../components/HeroCarousel';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Header/>
      <HeroCarousel/>
      <ProductGrid/>
      <Footer/>
    </>
  ) 
}
