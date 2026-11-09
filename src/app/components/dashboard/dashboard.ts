
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  stats = [
    { title: 'Total Products', value: '1,250', icon: '📦', color: 'blue', change: '+12%' },
    { title: "Today's Revenue", value: '₹25,450', icon: '💰', color: 'green', change: '+8.5%' },
    { title: 'Total Orders', value: '186', icon: '🛒', color: 'orange', change: '+15%' },
    { title: 'Low Stock Items', value: '12', icon: '⚠️', color: 'red', change: 'Needs attention' },
    { title: 'Expiring Soon', value: '08', icon: '⏳', color: 'purple', change: 'Check products' },
    { title: 'Waste Reduction', value: '₹4,500', icon: '🌱', color: 'teal', change: '+18%' }
  ];

  activities = [
    { name: 'Fresh Milk 500ml', action: 'Expiring soon', time: '10 min ago', icon: '🥛' },
    { name: 'Basmati Rice 5kg', action: 'Stock updated', time: '25 min ago', icon: '🍚' },
    { name: 'Fresh Apples', action: 'New product added', time: '1 hour ago', icon: '🍎' },
    { name: 'Order #1025', action: 'Sale completed', time: '2 hours ago', icon: '🛍️' }
  ];

  topProducts = [
    { name: 'Milk', sales: 85, percentage: 85 },
    { name: 'Rice', sales: 70, percentage: 70 },
    { name: 'Cooking Oil', sales: 60, percentage: 60 },
    { name: 'Biscuits', sales: 45, percentage: 45 }
  ];
}
