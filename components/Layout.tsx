import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  title?: string;
  backgroundImage?: string;
};

const Layout: React.FunctionComponent<Props> = ({ children, title = 'Home', backgroundImage }) => {
  const [isMenuVisibile, setMenuVisible] = React.useState(false);

  const menuClasses = `${
    isMenuVisibile ? 'xs:block' : 'hidden'
  } lg:block w-full flex-grow lg:flex lg:items-center lg:w-auto `;

  return (
    <div>
      <style jsx global>{`
        body {
          background: linear-gradient(#000, #000);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-attachment: fixed;
          ${backgroundImage ? 'background-image: url(' + backgroundImage + ');' : ''}
          color: #fff;
        }
      `}</style>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="assets/styles/styles.css"></link>
      </Head>
      <header className="sticky top-0">
        <nav className="flex items-center justify-between flex-wrap bg-green-700 p-6 xs:w-screen sm:w-auto md:w-3/4 mx-auto">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">Colum Ferry</span>
          </div>
          <div className="block lg:hidden">
            <button
              className="flex items-center px-3 py-2 border rounded text-green-200 border-green-400 hover:text-white hover:border-white"
              onClick={() => setMenuVisible(!isMenuVisibile)}
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div className={menuClasses}>
            <div className="text-sm lg:flex-grow">
              <Link href="#responsive-header">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mr-4">
                  Home
                </a>
              </Link>
              <a
                href="https://github.com/Coly010"
                target="_blank"
                className="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mr-4"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com/FerryColum"
                target="_blank"
                className="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mr-4"
              >
                Twitter
              </a>
            </div>
          </div>
        </nav>
      </header>
      <main className="xs:w-screen sm:w-auto md:w-3/4 mx-auto xs:p-1 xs:p1-3 sm:p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
