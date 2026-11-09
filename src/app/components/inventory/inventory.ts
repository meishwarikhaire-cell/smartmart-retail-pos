
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService, Product } from '../../services/store';

interface InventoryProduct extends Product {
  minStock: number;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory {

  constructor(private store: StoreService) {}

  searchText = '';
  selectedFilter = 'All';

  get products(): InventoryProduct[] {
    return this.store.getProducts().map(product => ({
      ...product,
      minStock: this.getMinimumStock(product)
    }));
  }

  getMinimumStock(product: Product): number {
    const minimumStocks: Record<string, number> = {
      'Basmati Rice': 20,
      'Wheat Flour': 15,
      'Cooking Oil': 15,
      'Sugar': 15,
      'Apple': 10,
      'Banana': 15,
      'Mango': 10,
      'Orange': 10,
      'Potato': 20,
      'Tomato': 15,
      'Milk': 15,
      'Curd': 10,
      'Butter': 10,
      'Bread': 10,
      'Potato Chips': 15,
      'Orange Juice': 10,
      'Chocolate': 12,
      'Cotton T-Shirt': 5,
      'Denim Jeans': 5,
      'Bath Soap': 10,
      'Shampoo': 10,
      'Detergent': 10,
      'Floor Cleaner': 10,
      'LED Bulb': 5,
      'Electric Kettle': 5
    };

    return minimumStocks[product.name] ?? 10;
  }

  get totalProducts(): number {
    return this.products.length;
  }

  get totalStock(): number {
    return this.products.reduce(
      (sum, product) => sum + product.stock, 0
    );
  }

  get lowStockCount(): number {
    return this.products.filter(
      product => product.stock > 0 && product.stock <= product.minStock
    ).length;
  }

  get outOfStockCount(): number {
    return this.products.filter(
      product => product.stock === 0
    ).length;
  }

  get nearExpiryCount(): number {
    return this.products.filter(product => {
      const days = this.daysUntilExpiry(product.expiry);
      return days >= 0 && days <= 7;
    }).length;
  }

  daysUntilExpiry(expiry: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiryDate = new Date(expiry + 'T00:00:00');

    return Math.ceil(
      (expiryDate.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
    );
  }

  getDiscount(expiry: string): number {
    const days = this.daysUntilExpiry(expiry);

    if (days < 0) return 0;
    if (days <= 2) return 30;
    if (days <= 4) return 20;
    if (days <= 7) return 10;

    return 0;
  }

  getStockStatus(product: InventoryProduct): string {
    if (product.stock === 0) return 'Out of Stock';
    if (product.stock <= product.minStock) return 'Low Stock';
    return 'In Stock';
  }

  get filteredProducts(): InventoryProduct[] {
    const search = this.searchText.toLowerCase().trim();

    return this.products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.barcode.toLowerCase().includes(search);

      const days = this.daysUntilExpiry(product.expiry);

      const matchesFilter =
        this.selectedFilter === 'All' ||
        (this.selectedFilter === 'Low Stock' &&
          product.stock > 0 &&
          product.stock <= product.minStock) ||
        (this.selectedFilter === 'Out of Stock' &&
          product.stock === 0) ||
        (this.selectedFilter === 'Near Expiry' &&
          days >= 0 && days <= 7);

      return matchesSearch && matchesFilter;
    });
  }

  getExpiryLabel(expiry: string): string {
    const days = this.daysUntilExpiry(expiry);

    if (days < 0) return 'Expired';
    if (days === 0) return 'Expires Today';
    if (days <= 7) return `${days} Days Left`;

    return 'Fresh';
  }

  getReorderQuantity(product: InventoryProduct): number {
    return Math.max(
      0,
      product.minStock * 2 - product.stock
    );
  }
}
