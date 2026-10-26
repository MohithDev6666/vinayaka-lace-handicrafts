export type PublishStatus = 'Published' | 'Draft';
export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Pending' | 'Refunded';
export type CustomerStatus = 'Active' | 'Inactive';

export interface Product {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  price: number;
  stock: number;
  sold: number;
  status: PublishStatus;
  image: string;
  description: string;
  featured: boolean;
  trending: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: PublishStatus;
}

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  amount: number;
  payment: PaymentStatus;
  method: string;
  status: OrderStatus;
  date: string;
  address: string;
  items: OrderItem[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: CustomerStatus;
}

export interface InventoryRow {
  id: string;
  productId: string;
  variant: string;
  onHand: number;
  reserved: number;
}

export interface Payment {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  date: string;
}

export interface Banner {
  id: string;
  title: string;
  placement: string;
  start: string;
  end: string;
  status: PublishStatus;
  image: string;
}

export interface Coupon {
  id: string;
  code: string;
  detail: string;
  status: PublishStatus;
  expires: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  active: boolean;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  active: boolean;
}

export interface SampleReview {
  id: string;
  name: string;
  productName: string;
  rating: number;
  text: string;
  sample: true;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  active: boolean;
}

export interface Subscriber {
  id: string;
  email: string;
  joined: string;
}

export interface AdminSession {
  name: string;
  email: string;
  role: string;
}
