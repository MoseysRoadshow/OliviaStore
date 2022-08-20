import { useEffect } from 'react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useTransition } from '@remix-run/react';
import NProgress from 'nprogress';
import { CartProvider } from './utils/CartProvider';
import nProgressStyles from 'nprogress/nprogress.css';
import globalStyles from './styles/global.css';
import styles from './tailwind.css';

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: nProgressStyles },
        { rel: 'stylesheet', href: globalStyles },
        { rel: 'stylesheet', href: styles },
    ];
};

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Olivia Store',
    viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
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
            <CartProvider>
                <body id='root'>
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </body>
            </CartProvider>
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
