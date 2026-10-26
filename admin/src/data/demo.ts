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

export const photos = {
  pink: '/images/woman-pink.jpg',
  outfits: '/images/woman-outfits.jpg',
  boho: '/images/woman-boho.jpg',
  table: '/images/tablecloth.jpg',
  setting: '/images/table-setting.jpg',
  coffee: '/images/coffee-cloth.jpg',
  cushions: '/images/cushions.jpg',
  blanket: '/images/blanket.jpg',
  bag: '/images/bag.jpg',
  doily: '/images/doily.jpg',
  lace: '/images/lace-detail.jpg',
  pending: '/images/photo-pending.svg',
} as const;

export const photoChoices = [
  { value: photos.table, label: 'Crochet table cover' },
  { value: photos.setting, label: 'Placemat setting' },
  { value: photos.coffee, label: 'Coffee cloth' },
  { value: photos.outfits, label: 'Crochet tops' },
  { value: photos.pink, label: 'Openwork outfit' },
  { value: photos.boho, label: 'Cream lace dress' },
  { value: photos.cushions, label: 'Crochet cushions' },
  { value: photos.blanket, label: 'Ripple throw' },
  { value: photos.bag, label: 'Crochet bag' },
  { value: photos.doily, label: 'Lace centerpiece' },
  { value: photos.lace, label: 'Lace detail' },
  { value: photos.pending, label: 'Photo coming soon' },
];

export const salesSeries = [
  { day: '20 Apr', revenue: 8200 },
  { day: '23 Apr', revenue: 12400 },
  { day: '26 Apr', revenue: 9800 },
  { day: '29 Apr', revenue: 15600 },
  { day: '02 May', revenue: 13200 },
  { day: '05 May', revenue: 18800 },
  { day: '08 May', revenue: 16450 },
];

export const monthlySeries = [
  { month: 'Jan', revenue: 86000 },
  { month: 'Feb', revenue: 92000 },
  { month: 'Mar', revenue: 101000 },
  { month: 'Apr', revenue: 118000 },
  { month: 'May', revenue: 148560 },
];

export const categories: Category[] = [
  { id: 'cat-women', name: "Women's Garments", slug: 'womens-garments', description: 'Dresses and occasion wear.', image: photos.boho, status: 'Published' },
  { id: 'cat-interior', name: 'Interior Decor', slug: 'interior-decor', description: 'Cushions and room accents.', image: photos.cushions, status: 'Published' },
  { id: 'cat-sofa', name: 'Sofa Covers', slug: 'sofa-covers', description: 'Throws styled for the sofa.', image: photos.blanket, status: 'Published' },
  { id: 'cat-table', name: 'Table Covers', slug: 'table-covers', description: 'Lace covers, runners and placemats.', image: photos.table, status: 'Published' },
  { id: 'cat-fridge', name: 'Fridge Covers', slug: 'fridge-covers', description: 'A studio photo is still needed.', image: photos.pending, status: 'Draft' },
  { id: 'cat-kids', name: 'Kids Dresses', slug: 'kids-dresses', description: 'A kids crochet photo is still needed.', image: photos.pending, status: 'Draft' },
  { id: 'cat-middies', name: 'Middies', slug: 'middies', description: 'Handmade crochet tops.', image: photos.outfits, status: 'Published' },
  { id: 'cat-shrugs', name: 'Shrugs & Ponchos', slug: 'shrugs-ponchos', description: 'Openwork layers.', image: photos.pink, status: 'Published' },
  { id: 'cat-modern', name: 'Modern & More', slug: 'modern-more', description: 'Bags and newer silhouettes.', image: photos.bag, status: 'Published' },
];

export const products: Product[] = [
  { id: 'p-top', name: 'Crochet Lace Women Top', sku: 'VL-TOP-01', categoryId: 'cat-middies', price: 3750, stock: 12, sold: 28, status: 'Published', image: photos.outfits, description: 'Sample listing for a light handmade crochet top.', featured: true, trending: false },
  { id: 'p-table', name: 'Handmade Crochet Table Cover', sku: 'VL-TBL-04', categoryId: 'cat-table', price: 5450, stock: 8, sold: 36, status: 'Published', image: photos.table, description: 'Sample listing for a scalloped lace table cover.', featured: true, trending: false },
  { id: 'p-kids', name: 'Crochet Kids Dress', sku: 'VL-KID-02', categoryId: 'cat-kids', price: 3150, stock: 4, sold: 15, status: 'Published', image: photos.pending, description: 'Sample listing. A studio photograph has not been added.', featured: true, trending: false },
  { id: 'p-fridge', name: 'Fridge Cover with Crochet Lace', sku: 'VL-FRD-01', categoryId: 'cat-fridge', price: 2350, stock: 6, sold: 9, status: 'Draft', image: photos.pending, description: 'Sample listing. A fridge-cover photograph has not been added.', featured: true, trending: false },
  { id: 'p-shrug', name: 'Openwork Crochet Shrug', sku: 'VL-SHR-03', categoryId: 'cat-shrugs', price: 4650, stock: 9, sold: 22, status: 'Published', image: photos.pink, description: 'Sample shrug. Replace the photo with a finished Vinayaka shrug.', featured: false, trending: true },
  { id: 'p-bag', name: 'Handmade Crochet Handbag', sku: 'VL-BAG-01', categoryId: 'cat-modern', price: 2850, stock: 11, sold: 18, status: 'Published', image: photos.bag, description: 'Sample cream crochet shoulder bag.', featured: false, trending: true },
  { id: 'p-placemat', name: 'Handmade Crochet Placemat Set', sku: 'VL-PLC-02', categoryId: 'cat-table', price: 1950, stock: 15, sold: 20, status: 'Published', image: photos.setting, description: 'Sample round placemats with a scalloped border.', featured: false, trending: true },
  { id: 'p-throw', name: 'Crochet Ripple Throw', sku: 'VL-SOF-01', categoryId: 'cat-sofa', price: 3200, stock: 3, sold: 11, status: 'Published', image: photos.blanket, description: 'Sample ripple throw. This is not a fitted sofa cover.', featured: false, trending: true },
  { id: 'p-cushion', name: 'Crochet Cushion Cover', sku: 'VL-CSH-02', categoryId: 'cat-interior', price: 1650, stock: 14, sold: 16, status: 'Published', image: photos.cushions, description: 'Sample granny-square cushion cover.', featured: false, trending: false },
  { id: 'p-dress', name: 'Cream Crochet Lace Dress', sku: 'VL-DRS-01', categoryId: 'cat-women', price: 6250, stock: 5, sold: 8, status: 'Published', image: photos.boho, description: 'Sample floor-length cream crochet dress.', featured: false, trending: false },
  { id: 'p-doily', name: 'Crochet Lace Centerpiece', sku: 'VL-CEN-01', categoryId: 'cat-table', price: 980, stock: 2, sold: 6, status: 'Draft', image: photos.doily, description: 'Sample lace piece for a side table.', featured: false, trending: false },
];

export const customers: Customer[] = [
  { id: 'c1', name: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '+91 90000 00001', city: 'Hyderabad', status: 'Active' },
  { id: 'c2', name: 'Anjali Rao', email: 'anjali.rao@example.com', phone: '+91 90000 00002', city: 'Vijayawada', status: 'Active' },
  { id: 'c3', name: 'Meena Nair', email: 'meena.nair@example.com', phone: '+91 90000 00003', city: 'Kochi', status: 'Active' },
  { id: 'c4', name: 'Radhika S', email: 'radhika.s@example.com', phone: '+91 90000 00004', city: 'Bengaluru', status: 'Active' },
  { id: 'c5', name: 'Lakshmi Rao', email: 'lakshmi.rao@example.com', phone: '+91 90000 00005', city: 'Guntur', status: 'Inactive' },
  { id: 'c6', name: 'Kavya Menon', email: 'kavya.menon@example.com', phone: '+91 90000 00006', city: 'Chennai', status: 'Active' },
];

export const orders: Order[] = [
  { id: 'VNH00124', customerId: 'c1', customerName: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '+91 90000 00001', amount: 5450, payment: 'Paid', method: 'UPI', status: 'Shipped', date: '26 Apr 2026', address: 'Sample flat, Hyderabad. Not a real delivery address.', items: [{ name: 'Handmade Crochet Table Cover', qty: 1, price: 5450 }] },
  { id: 'VNH00123', customerId: 'c2', customerName: 'Anjali Rao', email: 'anjali.rao@example.com', phone: '+91 90000 00002', amount: 4650, payment: 'Pending', method: 'COD', status: 'Pending', date: '25 Apr 2026', address: 'Sample street, Vijayawada. Not a real delivery address.', items: [{ name: 'Openwork Crochet Shrug', qty: 1, price: 4650 }] },
  { id: 'VNH00122', customerId: 'c3', customerName: 'Meena Nair', email: 'meena.nair@example.com', phone: '+91 90000 00003', amount: 1950, payment: 'Paid', method: 'Card', status: 'Delivered', date: '22 Apr 2026', address: 'Sample lane, Kochi. Not a real delivery address.', items: [{ name: 'Handmade Crochet Placemat Set', qty: 1, price: 1950 }] },
  { id: 'VNH00121', customerId: 'c4', customerName: 'Radhika S', email: 'radhika.s@example.com', phone: '+91 90000 00004', amount: 2850, payment: 'Paid', method: 'UPI', status: 'Pending', date: '21 Apr 2026', address: 'Sample block, Bengaluru. Not a real delivery address.', items: [{ name: 'Handmade Crochet Handbag', qty: 1, price: 2850 }] },
  { id: 'VNH00120', customerId: 'c1', customerName: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '+91 90000 00001', amount: 6250, payment: 'Refunded', method: 'Card', status: 'Cancelled', date: '18 Apr 2026', address: 'Sample flat, Hyderabad. Not a real delivery address.', items: [{ name: 'Cream Crochet Lace Dress', qty: 1, price: 6250 }] },
  { id: 'VNH00119', customerId: 'c2', customerName: 'Anjali Rao', email: 'anjali.rao@example.com', phone: '+91 90000 00002', amount: 3750, payment: 'Paid', method: 'UPI', status: 'Delivered', date: '14 Apr 2026', address: 'Sample street, Vijayawada. Not a real delivery address.', items: [{ name: 'Crochet Lace Women Top', qty: 1, price: 3750 }] },
];

export const payments: Payment[] = orders.map((order, index) => ({
  id: `PAY${String(index + 1).padStart(4, '0')}`,
  orderId: order.id,
  customerName: order.customerName,
  amount: order.amount,
  method: order.method,
  status: order.payment,
  date: order.date,
}));

export const inventory: InventoryRow[] = [
  { id: 'inv-1', productId: 'p-table', variant: '4 ft', onHand: 5, reserved: 1 },
  { id: 'inv-2', productId: 'p-table', variant: '6 ft', onHand: 4, reserved: 0 },
  { id: 'inv-3', productId: 'p-shrug', variant: 'Free size', onHand: 9, reserved: 2 },
  { id: 'inv-4', productId: 'p-top', variant: 'M', onHand: 7, reserved: 1 },
  { id: 'inv-5', productId: 'p-top', variant: 'L', onHand: 6, reserved: 0 },
  { id: 'inv-6', productId: 'p-kids', variant: '2–3 Y', onHand: 3, reserved: 1 },
  { id: 'inv-7', productId: 'p-throw', variant: 'One size', onHand: 3, reserved: 0 },
  { id: 'inv-8', productId: 'p-bag', variant: 'Natural', onHand: 11, reserved: 2 },
];

export const banners: Banner[] = [
  { id: 'b1', title: 'Timeless elegance hero', placement: 'Homepage hero', start: '20 Apr 2026', end: '20 May 2026', status: 'Published', image: photos.table },
  { id: 'b2', title: 'Crochet made to be worn', placement: 'Homepage hero', start: '01 May 2026', end: '31 May 2026', status: 'Published', image: photos.pink },
  { id: 'b3', title: 'Newsletter lace note', placement: 'Newsletter', start: '01 Apr 2026', end: '30 Jun 2026', status: 'Draft', image: photos.lace },
];

export const coupons: Coupon[] = [
  { id: 'cp1', code: 'WELCOME10', detail: '10% off a sample order', status: 'Draft', expires: '30 Jun 2026' },
  { id: 'cp2', code: 'TABLE500', detail: '₹500 off table covers', status: 'Published', expires: '31 May 2026' },
  { id: 'cp3', code: 'HANDMADE', detail: 'Free shipping sample over ₹4,000', status: 'Draft', expires: '31 Dec 2026' },
];

export const slides: HeroSlide[] = [
  { id: 's1', eyebrow: 'Handmade crochet lace', title: 'Timeless Elegance in Every Stitch', description: 'Table covers in a warm interior.', image: photos.table, active: true },
  { id: 's2', eyebrow: 'Handmade crochet lace', title: 'Crochet Made to Be Worn', description: 'Modern openwork clothing.', image: photos.pink, active: true },
  { id: 's3', eyebrow: 'Handmade crochet lace', title: 'Warmth for the Table', description: 'Lace dressed for coffee and conversation.', image: photos.coffee, active: true },
  { id: 's4', eyebrow: 'Handmade crochet lace', title: 'Delicate Patterns, Made by Hand', description: 'Stitch detail. A kids-dress photo is still to be added.', image: photos.lace, active: true },
];

export const collections: Collection[] = [
  { id: 'col-1', title: "Women's Garments", description: 'Elegant & comfortable', image: photos.boho, active: true },
  { id: 'col-2', title: 'Home & Interior', description: 'Add a touch of handmade charm', image: photos.cushions, active: true },
  { id: 'col-3', title: 'Table & Sofa Covers', description: 'Perfect for special occasions', image: photos.table, active: true },
  { id: 'col-4', title: 'Kids Collection', description: 'Cute styles for little ones', image: photos.pending, active: false },
  { id: 'col-5', title: 'Shrugs & Ponchos', description: 'Stay cozy, stay stylish', image: photos.pink, active: true },
  { id: 'col-6', title: 'Modern & More', description: 'Trendy crochet for modern living', image: photos.bag, active: true },
];

export const reviews: SampleReview[] = [
  { id: 'r1', name: 'Sample Customer A', productName: 'Handmade Crochet Table Cover', rating: 5, text: 'Sample note about the lace edge and even stitches. Not a verified review.', sample: true },
  { id: 'r2', name: 'Sample Customer B', productName: 'Openwork Crochet Shrug', rating: 5, text: 'Sample note about comfort and finishing. Not a verified review.', sample: true },
  { id: 'r3', name: 'Sample Customer C', productName: 'Crochet Lace Centerpiece', rating: 4, text: 'Sample note about packing and a handmade gift. Not a verified review.', sample: true },
];

export const benefits: Benefit[] = [
  { id: 'bn1', title: 'Free Shipping', description: 'On orders over ₹4,000. Illustrative until the policy is confirmed.', active: true },
  { id: 'bn2', title: 'Secure Payments', description: 'Protected checkout. Payments are not connected in this preview.', active: true },
  { id: 'bn3', title: 'Purely Handmade', description: 'Crafted with love.', active: true },
  { id: 'bn4', title: 'Customer Support', description: "We're here to help. Support hours are not published yet.", active: true },
];

export const subscribers: Subscriber[] = [
  { id: 'sub1', email: 'guest.one@example.com', joined: '02 May 2026' },
  { id: 'sub2', email: 'guest.two@example.com', joined: '18 Apr 2026' },
  { id: 'sub3', email: 'studio.preview@example.com', joined: '09 Apr 2026' },
  { id: 'sub4', email: 'buyer.sample@example.com', joined: '28 Mar 2026' },
];

export const previewAccount = {
  email: 'admin@vinayaka.local',
  password: 'lace1234',
  name: 'Vinayaka Admin',
  role: 'Studio admin',
};
