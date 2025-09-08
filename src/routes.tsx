import type { RouteObject } from 'react-router-dom'
import App from './App'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', lazy: async () => ({ Component: (await import('./views/Home')).Home }) },
      { path: '/catalog', lazy: async () => ({ Component: (await import('./views/Catalog')).Catalog }) },
      { path: '/catalog/:id', lazy: async () => ({ Component: (await import('./views/Detail')).Detail }) },
    ],
  },
]

