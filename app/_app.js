import localFont from 'next/font/local'
 
const dystopia = localFont({ src: '/fonts/Sddystopiandemo-GO7xa.otf'})
 
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={`${dystopia.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}