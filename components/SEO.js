import Head from 'next/head';

export default function SEO({
  title = 'Silk Mantra – Handpicked Heritage Sarees',
  description = 'Weaving the spell of traditional elegance in every drape',
  image = '../public/logo.png',
  url = 'https://silkmantra.vercel.app/',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
