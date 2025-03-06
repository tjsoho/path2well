import localFont from "next/font/local";

export const kiona = localFont({
  src: [
    {
      path: '../../public/fonts/Kiona-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Kiona-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-kiona'
});

export const ttNorms = localFont({
  src: [
    {
      path: '../../public/fonts/TT Norms Pro Trial Compact ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
  ],
  variable: '--font-tt-norms'
}); 