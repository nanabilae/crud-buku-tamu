import { lazy } from 'react';

const ListRoutes = [
    {
        path: '/tamu',
        component: lazy(() =>
        import('../components/tamu/Tamu')
        )
    }
];

export {ListRoutes};