# TravelTrucks – Karavan Kiralama (Frontend)

TravelTrucks için React + Vite ile geliştirilmiş frontend uygulaması. Katalog, detay sayfası, filtreleme, favoriler ve rezervasyon formu içerir.

## Özellikler

- Katalog sayfası: backend tarafında filtreleme parametreleriyle listeleme
- Favoriler: localStorage ile kalıcı
- “Load More” ile sayfalama
- Detay sayfası: galeri, yorumlar, fiyat gösterimi (örn. `8000.00`)
- Rezervasyon formu: başarılı bildirim (demo)
- Router ile `/`, `/catalog`, `/catalog/:id` yönlendirmeleri

## Kurulum

```bash
npm install
npm run dev
```

## Build ve Dağıtım

```bash
npm run build
npm run preview
```

Netlify için `public/_redirects` dosyası ile SPA yönlendirmesi hazırdır. Vercel için ayar gerektirmez.

## Teknolojiler

- React, TypeScript, Vite
- Redux Toolkit, React Router, Axios
- Sass, react-hot-toast

## Geliştirici

- Yazar: Furkan
