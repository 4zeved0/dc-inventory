import ProvidersContextAndSession from './context/ProvidersContextAndSession';
import './globals.css'
import { Roboto } from 'next/font/google'
import ReactQueryProvider from './providers/ReactQueryProviders';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={roboto.className}>
      <ReactQueryProvider>
        <ProvidersContextAndSession>
          <body >{children}</body>
        </ProvidersContextAndSession>
      </ReactQueryProvider>
    </html>
  );
}
