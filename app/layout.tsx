import ProvidersContextAndSession from './context/ProvidersContextAndSession';
import './globals.css'
import { Roboto } from 'next/font/google'
import ReactQueryProvider from './providers/ReactQueryProviders';
import Navbar from './components/(Navbar)/Navbar';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <ReactQueryProvider>
        <ProvidersContextAndSession>
          <body className="flex">
            <Navbar />
            <div className="flex-1 min-h-screen"> {/* Conteúdo */}
              {children}
            </div>
          </body>
        </ProvidersContextAndSession>
      </ReactQueryProvider>
    </html>
  );
}
