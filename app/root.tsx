import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { CartProvider } from './hooks/useCart';

import globalStyles from './styles/global.css';

export function links() {
    return [{ rel: 'stylesheet', href: globalStyles }];
}

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Olivia Store',
    viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
    return (
        <html lang='en'>
            <head>
                <Meta />
                <Links />
            </head>
            <CartProvider>
                <body>
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </body>
            </CartProvider>
        </html>
    );
}
