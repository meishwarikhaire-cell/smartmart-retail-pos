
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService, Product } from '../../services/store';

interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billing.html',
  styleUrl: './billing.css'
})
export class Billing {

  constructor(private store: StoreService) {}

  searchText = '';
  discount = 0;
  gstRate = 5;

  customerName = '';
  customerMobile = '';
  paymentMethod = 'Cash';

  billNumber = 'SM-' + Date.now();
  billDate = new Date().toLocaleString('en-IN');

  cart: CartItem[] = [];

  get products(): Product[] {
    return this.store.getProducts();
  }

  get filteredProducts(): Product[] {
    const search = this.searchText.trim().toLowerCase();

    return this.products.filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.barcode.toLowerCase().includes(search)
    );
  }

  get totalItems(): number {
    return this.cart.reduce(
      (total, item) => total + item.quantity, 0
    );
  }

  get subtotal(): number {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity, 0
    );
  }

  get discountAmount(): number {
    const validDiscount = Math.min(100, Math.max(0, this.discount));
    return this.subtotal * validDiscount / 100;
  }

  get taxableAmount(): number {
    return Math.max(0, this.subtotal - this.discountAmount);
  }

  get gstAmount(): number {
    return this.taxableAmount * this.gstRate / 100;
  }

  get grandTotal(): number {
    return this.taxableAmount + this.gstAmount;
  }

  addToCart(product: Product): void {
    const currentProduct = this.products.find(
      item => item.id === product.id
    );

    if (!currentProduct || currentProduct.stock <= 0) {
      alert('Product is out of stock!');
      return;
    }

    const existingItem = this.cart.find(
      item => item.id === product.id
    );

    if (existingItem) {
      if (existingItem.quantity >= currentProduct.stock) {
        alert('Available stock limit reached!');
        return;
      }

      existingItem.quantity++;
    } else {
      this.cart.push({
        ...currentProduct,
        quantity: 1
      });
    }
  }

  increaseQuantity(item: CartItem): void {
    const currentProduct = this.products.find(
      product => product.id === item.id
    );

    if (!currentProduct || item.quantity >= currentProduct.stock) {
      alert('Available stock limit reached!');
      return;
    }

    item.quantity++;
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(item.id);
    }
  }

  removeItem(id: number): void {
    this.cart = this.cart.filter(item => item.id !== id);
  }

  clearCart(): void {
    if (this.cart.length === 0) return;

    if (confirm('Are you sure you want to clear the cart?')) {
      this.cart = [];
      this.discount = 0;
    }
  }

  generateInvoice(): void {
    if (this.cart.length === 0) {
      alert('Please add products to the cart first!');
      return;
    }

    if (!this.customerName.trim()) {
      alert('Please enter customer name!');
      return;
    }

    if (!/^[0-9]{10}$/.test(this.customerMobile.trim())) {
      alert('Please enter a valid 10-digit mobile number!');
      return;
    }

    // Check stock for every cart item before updating anything.
    for (const item of this.cart) {
      const currentProduct = this.products.find(
        product => product.id === item.id
      );

      if (!currentProduct || currentProduct.stock < item.quantity) {
        alert(`Insufficient stock for ${item.name}. Please update your cart.`);
        return;
      }
    }

    // Reduce stock after successful validation.
    for (const item of this.cart) {
      const success = this.store.updateStock(item.id, item.quantity);

      if (!success) {
        alert(`Could not update stock for ${item.name}. Please try again.`);
        return;
      }
    }

    this.billDate = new Date().toLocaleString('en-IN');

    alert('Invoice generated! Stock has been updated.');

    window.print();

    this.cart = [];
    this.discount = 0;
    this.billNumber = 'SM-' + Date.now();
    this.customerName = '';
    this.customerMobile = '';
    this.paymentMethod = 'Cash';
  }
}
