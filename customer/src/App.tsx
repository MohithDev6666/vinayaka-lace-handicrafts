import { Route, Routes } from 'react-router-dom';
import { CustomerLayout } from './layouts/CustomerLayout.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ShopPage } from './pages/ShopPage.tsx';
import { ProductPage } from './pages/ProductPage.tsx';
import { CollectionPage } from './pages/CollectionPage.tsx';
import { CollectionsIndexPage } from './pages/CollectionsIndexPage.tsx';
import { WishlistPage } from './pages/WishlistPage.tsx';
import { CartPage } from './pages/CartPage.tsx';
import { InfoPage } from './pages/InfoPage.tsx';

export default function App() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/:categorySlug" element={<ShopPage />} />
        <Route path="collections" element={<CollectionsIndexPage />} />
        <Route path="collections/:slug" element={<CollectionPage />} />
        <Route path="product/:slug" element={<ProductPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="about" element={<InfoPage pageKey="about" />} />
        <Route path="contact" element={<InfoPage pageKey="contact" />} />
        <Route path="shipping" element={<InfoPage pageKey="shipping" />} />
        <Route path="returns" element={<InfoPage pageKey="returns" />} />
        <Route path="faqs" element={<InfoPage pageKey="faqs" />} />
        <Route path="support" element={<InfoPage pageKey="support" />} />
        <Route path="privacy" element={<InfoPage pageKey="privacy" />} />
        <Route path="terms" element={<InfoPage pageKey="terms" />} />
        <Route path="account" element={<InfoPage pageKey="account" />} />
        <Route path="*" element={<InfoPage pageKey="not-found" />} />
      </Route>
    </Routes>
  );
}
