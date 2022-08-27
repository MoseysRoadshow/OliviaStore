import { useEffect } from 'react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useTransition } from '@remix-run/react';
import NProgress from 'nprogress';
import nProgressStyles from 'nprogress/nprogress.css';
import styles from './tailwind.css';
import Cart from './components/Cart';
import { useShoppingCart } from './utils/shoppingCart';

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: nProgressStyles },
        { rel: 'stylesheet', href: styles },
    ];
};

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Olivia Store',
    viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
    const setShowCart = useShoppingCart((state) => state.setShowCart);
    const transition = useTransition();
    useEffect(() => {
        if (transition.state === 'idle') {
            NProgress.done();
        } else {
            NProgress.start();
        }
    }, [transition.state]);

    return (
        <html lang='en'>
            <head>
                <Meta />
                <Links />
            </head>
            <body id='root'>
                <Cart />
                <header className='fixed top-0 flex w-full justify-between bg-orange-50 p-4 text-3xl'>
                    <div>Menu</div>
                    <Link to='/'>Store Name</Link>
                    <button onClick={() => setShowCart(true)}>Cart</button>
                </header>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div>
            <h1>Error</h1>
            <p>{error.message}</p>
            <p>The stack trace is:</p>
            <pre>{error.stack}</pre>
        </div>
    );
}
