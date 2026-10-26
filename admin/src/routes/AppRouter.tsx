import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/auth.tsx';
import { AdminLayout } from '../layouts/AdminLayout.tsx';
import { BannersPage } from '../pages/BannersPage.tsx';
import { BenefitsPage } from '../pages/BenefitsPage.tsx';
import { CarouselPage } from '../pages/CarouselPage.tsx';
import { CategoriesPage } from '../pages/CategoriesPage.tsx';
import { CollectionsPage } from '../pages/CollectionsPage.tsx';
import { CustomersPage } from '../pages/CustomersPage.tsx';
import { DashboardPage } from '../pages/DashboardPage.tsx';
import { InventoryPage } from '../pages/InventoryPage.tsx';
import { LoginPage } from '../pages/LoginPage.tsx';
import { NewsletterPage } from '../pages/NewsletterPage.tsx';
import { NotFoundPage } from '../pages/NotFoundPage.tsx';
import { OrderDetailsPage } from '../pages/OrderDetailsPage.tsx';
import { OrdersPage } from '../pages/OrdersPage.tsx';
import { PaymentsPage } from '../pages/PaymentsPage.tsx';
import { PicksPage } from '../pages/PicksPage.tsx';
import { ProductFormPage } from '../pages/ProductFormPage.tsx';
import { ProductsPage } from '../pages/ProductsPage.tsx';
import { ReportsPage } from '../pages/ReportsPage.tsx';
import { ReviewsPage } from '../pages/ReviewsPage.tsx';

function RequireAuth() {
  const { session } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function LoginRoute() {
  const { session } = useAuth();
  if (session) return <Navigate to="/" replace />;
  return <LoginPage />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="carousel" element={<CarouselPage />} />
          <Route path="banners" element={<BannersPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="picks" element={<PicksPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="benefits" element={<BenefitsPage />} />
          <Route path="newsletter" element={<NewsletterPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<ProductFormPage />} />
          <Route path="products/:productId" element={<ProductFormPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
