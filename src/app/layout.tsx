import type { Metadata } from 'next';
import { Oswald, Roboto, Roboto_Condensed } from 'next/font/google';
import localFont from 'next/font/local';
import '../styles/globals.css';

const oswaldSans = Oswald({
  variable: '--font-oswald-sans',
  subsets: ['cyrillic'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['cyrillic'],
});

const robotoCondensed = Roboto_Condensed({
  variable: '--font-roboto',
  subsets: ['cyrillic'],
});

const proximaNova = localFont({
  src: '../fonts/Proxima Nova Regular.ttf',
  variable: '--font-proxima-nova',
  weight: '400',
  style: 'normal',
});

export const metadata: Metadata = {
  title: 'Podcast Job',
  description: 'Create and find jobs in the podcast industry',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${oswaldSans.variable} ${roboto.variable} ${robotoCondensed.variable} ${proximaNova.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
