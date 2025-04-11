import localFont from "next/font/local";

export const ethnocentric = localFont({
  src: [
    {
      path: '../../public/fonts/Ethnocentric Rg.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Ethnocentric Rg It.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-ethnocentric'
});

export const ttChocolates = localFont({
  src: [
    {
      path: '../../public/fonts/TT Chocolates Trial Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT Chocolates Trial Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/TT Chocolates Trial Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT Chocolates Trial Light Italic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/TT Chocolates Trial Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT Chocolates Trial Medium Italic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/TT Chocolates Trial Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT Chocolates Trial Bold italic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-tt-chocolates'
});

export const beauty = localFont({
  src: [
    {
      path: '../../public/fonts/BeautyDemo.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/BeautyDemo.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-beauty'
});

