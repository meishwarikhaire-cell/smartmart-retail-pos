
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  barcode: string;
  expiry: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private storageKey = 'smartmart_products';

  private initialProducts: Product[] = [
    { id: 1, name: 'Basmati Rice', category: 'Grocery & Staples', price: 120, stock: 50, barcode: '100001', expiry: '2027-11-05' },
    { id: 2, name: 'Wheat Flour', category: 'Grocery & Staples', price: 45, stock: 40, barcode: '100002', expiry: '2027-12-10' },
    { id: 3, name: 'Cooking Oil', category: 'Grocery & Staples', price: 150, stock: 25, barcode: '100003', expiry: '2027-10-15' },
    { id: 4, name: 'Sugar', category: 'Grocery & Staples', price: 45, stock: 30, barcode: '100004', expiry: '2028-01-10' },
    { id: 5, name: 'Apple', category: 'Fruits & Vegetables', price: 120, stock: 20, barcode: '100005', expiry: '2026-11-10' },
    { id: 6, name: 'Banana', category: 'Fruits & Vegetables', price: 50, stock: 35, barcode: '100006', expiry: '2026-11-05' },
    { id: 7, name: 'Mango', category: 'Fruits & Vegetables', price: 100, stock: 15, barcode: '100007', expiry: '2026-11-08' },
    { id: 8, name: 'Orange', category: 'Fruits & Vegetables', price: 80, stock: 25, barcode: '100008', expiry: '2026-11-12' },
    { id: 9, name: 'Potato', category: 'Fruits & Vegetables', price: 30, stock: 60, barcode: '100009', expiry: '2026-11-20' },
    { id: 10, name: 'Tomato', category: 'Fruits & Vegetables', price: 40, stock: 8, barcode: '100010', expiry: '2026-11-06' },
    { id: 11, name: 'Milk', category: 'Dairy & Bakery', price: 30, stock: 40, barcode: '100011', expiry: '2026-11-05' },
    { id: 12, name: 'Curd', category: 'Dairy & Bakery', price: 40, stock: 20, barcode: '100012', expiry: '2026-11-07' },
    { id: 13, name: 'Butter', category: 'Dairy & Bakery', price: 55, stock: 15, barcode: '100013', expiry: '2026-11-15' },
    { id: 14, name: 'Bread', category: 'Dairy & Bakery', price: 35, stock: 7, barcode: '100014', expiry: '2026-11-04' },
    { id: 15, name: 'Potato Chips', category: 'Snacks & Beverages', price: 20, stock: 50, barcode: '100015', expiry: '2027-05-10' },
    { id: 16, name: 'Orange Juice', category: 'Snacks & Beverages', price: 60, stock: 25, barcode: '100016', expiry: '2027-02-10' },
    { id: 17, name: 'Chocolate', category: 'Snacks & Beverages', price: 40, stock: 30, barcode: '100017', expiry: '2027-04-10' },
    { id: 18, name: 'Cotton T-Shirt', category: 'Clothing & Fashion', price: 499, stock: 20, barcode: '100018', expiry: '2029-01-01' },
    { id: 19, name: 'Denim Jeans', category: 'Clothing & Fashion', price: 999, stock: 12, barcode: '100019', expiry: '2029-01-01' },
    { id: 20, name: 'Bath Soap', category: 'Personal Care', price: 45, stock: 35, barcode: '100020', expiry: '2028-01-01' },
    { id: 21, name: 'Shampoo', category: 'Personal Care', price: 120, stock: 5, barcode: '100021', expiry: '2028-05-10' },
    { id: 22, name: 'Detergent', category: 'Home & Cleaning', price: 150, stock: 25, barcode: '100022', expiry: '2028-06-10' },
    { id: 23, name: 'Floor Cleaner', category: 'Home & Cleaning', price: 110, stock: 18, barcode: '100023', expiry: '2028-08-10' },
    { id: 24, name: 'LED Bulb', category: 'Electronics & Household', price: 100, stock: 30, barcode: '100024', expiry: '2029-01-01' },
    { id: 25, name: 'Electric Kettle', category: 'Electronics & Household', price: 899, stock: 10, barcode: '100025', expiry: '2029-01-01' }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(
    this.loadProducts()
  );

  products$ = this.productsSubject.asObservable();

  getProducts(): Product[] {
    return this.productsSubject.value;
  }

  private loadProducts(): Product[] {
    const savedData = localStorage.getItem(this.storageKey);

    if (savedData) {
      try {
        return JSON.parse(savedData) as Product[];
      } catch {
        localStorage.removeItem(this.storageKey);
      }
    }

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.initialProducts)
    );

    return [...this.initialProducts];
  }

  private saveProducts(products: Product[]): void {
    this.productsSubject.next([...products]);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  addProduct(product: Product): void {
    const products = this.getProducts();

    const newProduct = {
      ...product,
      id: Math.max(0, ...products.map(p => p.id)) + 1
    };

    this.saveProducts([...products, newProduct]);
  }

  updateProduct(updatedProduct: Product): void {
    const products = this.getProducts().map(product =>
      product.id === updatedProduct.id
        ? { ...updatedProduct }
        : product
    );

    this.saveProducts(products);
  }

  deleteProduct(id: number): void {
    const products = this.getProducts().filter(
      product => product.id !== id
    );

    this.saveProducts(products);
  }

  updateStock(id: number, quantitySold: number): boolean {
    const products = this.getProducts();
    const product = products.find(p => p.id === id);

    if (!product || quantitySold <= 0 || product.stock < quantitySold) {
      return false;
    }

    product.stock -= quantitySold;
    this.saveProducts(products);

    return true;
  }
}
