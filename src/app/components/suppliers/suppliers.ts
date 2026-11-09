
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  category: string;
  city: string;
}

interface PurchaseOrder {
  id: number;
  supplier: string;
  product: string;
  quantity: number;
  amount: number;
  date: string;
  status: string;
}

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css'
})
export class Suppliers {

  showForm = false;
  searchText = '';

  newSupplier = {
    name: '',
    contact: '',
    email: '',
    category: '',
    city: ''
  };

  suppliers: Supplier[] = [
    {
      id: 1,
      name: 'Fresh Farm Traders',
      contact: '9876543210',
      email: 'freshfarm@gmail.com',
      category: 'Fruits & Vegetables',
      city: 'Nashik'
    },
    {
      id: 2,
      name: 'Shree Grocery Suppliers',
      contact: '9876543211',
      email: 'shreegrocery@gmail.com',
      category: 'Grocery & Staples',
      city: 'Pune'
    },
    {
      id: 3,
      name: 'Daily Dairy Products',
      contact: '9876543212',
      email: 'dailydairy@gmail.com',
      category: 'Dairy & Bakery',
      city: 'Kopargaon'
    },
    {
      id: 4,
      name: 'Smart Electronics',
      contact: '9876543213',
      email: 'smartelectronics@gmail.com',
      category: 'Electronics',
      city: 'Ahmednagar'
    }
  ];

  purchaseOrders: PurchaseOrder[] = [
    {
      id: 1001,
      supplier: 'Fresh Farm Traders',
      product: 'Fresh Apples',
      quantity: 100,
      amount: 5000,
      date: '02-11-2026',
      status: 'Delivered'
    },
    {
      id: 1002,
      supplier: 'Shree Grocery Suppliers',
      product: 'Basmati Rice',
      quantity: 50,
      amount: 6000,
      date: '02-11-2026',
      status: 'Pending'
    },
    {
      id: 1003,
      supplier: 'Daily Dairy Products',
      product: 'Milk Packets',
      quantity: 80,
      amount: 2400,
      date: '01-11-2026',
      status: 'Pending'
    }
  ];

  get filteredSuppliers(): Supplier[] {
    const search = this.searchText.toLowerCase().trim();

    return this.suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(search) ||
      supplier.category.toLowerCase().includes(search) ||
      supplier.city.toLowerCase().includes(search)
    );
  }

  get pendingOrders(): number {
    return this.purchaseOrders.filter(
      order => order.status === 'Pending'
    ).length;
  }

  get totalOrders(): number {
    return this.purchaseOrders.length;
  }

  get totalSuppliers(): number {
    return this.suppliers.length;
  }

  openForm(): void {
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newSupplier = {
      name: '',
      contact: '',
      email: '',
      category: '',
      city: ''
    };
  }

  addSupplier(): void {
    if (
      !this.newSupplier.name.trim() ||
      !this.newSupplier.contact.trim() ||
      !this.newSupplier.email.trim() ||
      !this.newSupplier.category ||
      !this.newSupplier.city.trim()
    ) {
      alert('Please fill all supplier details!');
      return;
    }

    if (!/^[0-9]{10}$/.test(this.newSupplier.contact)) {
      alert('Please enter a valid 10-digit contact number!');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newSupplier.email)) {
      alert('Please enter a valid email address!');
      return;
    }

    const supplier: Supplier = {
      id: Date.now(),
      ...this.newSupplier
    };

    this.suppliers.unshift(supplier);
    this.closeForm();

    alert('Supplier added successfully!');
  }

  updateOrderStatus(order: PurchaseOrder, status: string): void {
    order.status = status;
  }

  deleteSupplier(id: number): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.suppliers = this.suppliers.filter(
        supplier => supplier.id !== id
      );
    }
  }
}
