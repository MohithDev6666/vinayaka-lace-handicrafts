import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  banners as seedBanners,
  benefits as seedBenefits,
  categories as seedCategories,
  collections as seedCollections,
  coupons as seedCoupons,
  customers as seedCustomers,
  inventory as seedInventory,
  orders as seedOrders,
  payments as seedPayments,
  products as seedProducts,
  reviews as seedReviews,
  slides as seedSlides,
  subscribers as seedSubscribers,
} from '../data/demo.ts';
import type {
  Banner,
  Benefit,
  Category,
  Collection,
  Coupon,
  Customer,
  HeroSlide,
  InventoryRow,
  Order,
  Payment,
  Product,
  SampleReview,
  Subscriber,
} from '../types/admin.ts';

interface ListApi<T> {
  items: T[];
  save: (item: T) => void;
  remove: (id: string) => void;
}

interface StoreValue {
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  inventory: InventoryRow[];
  payments: Payment[];
  banners: Banner[];
  coupons: Coupon[];
  slides: HeroSlide[];
  collections: Collection[];
  reviews: SampleReview[];
  benefits: Benefit[];
  subscribers: Subscriber[];
  saveProduct: (item: Product) => void;
  removeProduct: (id: string) => void;
  saveCategory: (item: Category) => void;
  removeCategory: (id: string) => void;
  saveOrder: (item: Order) => void;
  saveCustomer: (item: Customer) => void;
  removeCustomer: (id: string) => void;
  saveInventory: (item: InventoryRow) => void;
  removeInventory: (id: string) => void;
  savePayment: (item: Payment) => void;
  saveBanner: (item: Banner) => void;
  removeBanner: (id: string) => void;
  saveCoupon: (item: Coupon) => void;
  removeCoupon: (id: string) => void;
  saveSlide: (item: HeroSlide) => void;
  removeSlide: (id: string) => void;
  saveCollection: (item: Collection) => void;
  removeCollection: (id: string) => void;
  saveReview: (item: SampleReview) => void;
  removeReview: (id: string) => void;
  saveBenefit: (item: Benefit) => void;
  removeSubscriber: (id: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function useList<T extends { id: string }>(initial: T[]): ListApi<T> {
  const [items, setItems] = useState(initial);
  const save = useCallback((item: T) => {
    setItems((current) => {
      const index = current.findIndex((row) => row.id === item.id);
      if (index === -1) return [item, ...current];
      const next = current.slice();
      next[index] = item;
      return next;
    });
  }, []);
  const remove = useCallback((id: string) => {
    setItems((current) => current.filter((row) => row.id !== id));
  }, []);
  return { items, save, remove };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const products = useList(seedProducts);
  const categories = useList(seedCategories);
  const orders = useList(seedOrders);
  const customers = useList(seedCustomers);
  const inventory = useList(seedInventory);
  const payments = useList(seedPayments);
  const banners = useList(seedBanners);
  const coupons = useList(seedCoupons);
  const slides = useList(seedSlides);
  const collections = useList(seedCollections);
  const reviews = useList(seedReviews);
  const benefits = useList(seedBenefits);
  const subscribers = useList(seedSubscribers);

  const removeProduct = useCallback(
    (id: string) => {
      products.remove(id);
      inventory.remove(id);
    },
    [inventory, products],
  );

  const value = useMemo<StoreValue>(
    () => ({
      products: products.items,
      categories: categories.items,
      orders: orders.items,
      customers: customers.items,
      inventory: inventory.items.filter((row) => products.items.some((product) => product.id === row.productId)),
      payments: payments.items,
      banners: banners.items,
      coupons: coupons.items,
      slides: slides.items,
      collections: collections.items,
      reviews: reviews.items,
      benefits: benefits.items,
      subscribers: subscribers.items,
      saveProduct: products.save,
      removeProduct,
      saveCategory: categories.save,
      removeCategory: categories.remove,
      saveOrder: orders.save,
      saveCustomer: customers.save,
      removeCustomer: customers.remove,
      saveInventory: inventory.save,
      removeInventory: inventory.remove,
      savePayment: payments.save,
      saveBanner: banners.save,
      removeBanner: banners.remove,
      saveCoupon: coupons.save,
      removeCoupon: coupons.remove,
      saveSlide: slides.save,
      removeSlide: slides.remove,
      saveCollection: collections.save,
      removeCollection: collections.remove,
      saveReview: reviews.save,
      removeReview: reviews.remove,
      saveBenefit: benefits.save,
      removeSubscriber: subscribers.remove,
    }),
    [banners, benefits, categories, collections, coupons, customers, inventory, orders, payments, products, removeProduct, reviews, slides, subscribers],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore must be used within StoreProvider');
  return value;
}
