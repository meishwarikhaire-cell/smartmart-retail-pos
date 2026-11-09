
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Sale {
  id: number;
  customer: string;
  date: string;
  items: number;
  amount: number;
  payment: string;
}

interface TopProduct {
  name: string;
  quantity: number;
  sales: number;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class Analytics {

  todaySales = 28450;
  totalOrders = 128;
  averageBill = 222.27;
  totalCustomers = 96;

  weeklySales = [
    { day: 'Mon', amount: 12500 },
    { day: 'Tue', amount: 18000 },
    { day: 'Wed', amount: 14500 },
    { day: 'Thu', amount: 22000 },
    { day: 'Fri', amount: 19500 },
    { day: 'Sat', amount: 28450 },
    { day: 'Sun', amount: 24000 }
  ];

  topProducts: TopProduct[] = [
    { name: 'Fresh Milk', quantity: 85, sales: 2550 },
    { name: 'Basmati Rice', quantity: 42, sales: 5040 },
    { name: 'Cooking Oil', quantity: 38, sales: 5700 },
    { name: 'Potato Chips', quantity: 75, sales: 1500 },
    { name: 'Apple', quantity: 30, sales: 3600 }
  ];

  categorySales = [
    { name: 'Grocery & Staples', amount: 18500, percentage: 85 },
    { name: 'Fruits & Vegetables', amount: 12500, percentage: 65 },
    { name: 'Dairy & Bakery', amount: 9800, percentage: 55 },
    { name: 'Snacks & Beverages', amount: 8200, percentage: 45 },
    { name: 'Personal Care', amount: 6500, percentage: 35 }
  ];

  recentSales: Sale[] = [
    { id: 1001, customer: 'Rahul Patil', date: '02 Nov 2026', items: 5, amount: 1250, payment: 'UPI' },
    { id: 1002, customer: 'Priya Sharma', date: '02 Nov 2026', items: 3, amount: 850, payment: 'Cash' },
    { id: 1003, customer: 'Amit Joshi', date: '02 Nov 2026', items: 7, amount: 2100, payment: 'Card' },
    { id: 1004, customer: 'Sneha More', date: '02 Nov 2026', items: 4, amount: 670, payment: 'UPI' },
    { id: 1005, customer: 'Neha Deshmukh', date: '02 Nov 2026', items: 6, amount: 1450, payment: 'Cash' }
  ];

  get maxWeeklySales(): number {
    return Math.max(...this.weeklySales.map(day => day.amount));
  }

  getBarHeight(amount: number): number {
    return (amount / this.maxWeeklySales) * 100;
  }

  get totalWeeklySales(): number {
    return this.weeklySales.reduce((total, day) => total + day.amount, 0);
  }
}
