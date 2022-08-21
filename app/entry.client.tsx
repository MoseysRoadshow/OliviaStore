import { RemixBrowser } from '@remix-run/react';
import React from 'react';
import { hydrate } from 'react-dom';

hydrate(
    <React.StrictMode>
        <RemixBrowser />
    </React.StrictMode>,
    document,
);
