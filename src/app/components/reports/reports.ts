
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Report {
  id: number;
  title: string;
  description: string;
  icon: string;
  records: number;
  type: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports {

  selectedReport = 'All Reports';

  reports: Report[] = [
    {
      id: 1,
      title: 'Daily Sales Report',
      description: 'Daily revenue and transaction summary',
      icon: '💰',
      records: 128,
      type: 'Sales'
    },
    {
      id: 2,
      title: 'Inventory Report',
      description: 'Product stock and available quantity',
      icon: '📦',
      records: 25,
      type: 'Inventory'
    },
    {
      id: 3,
      title: 'Low Stock Report',
      description: 'Products that need restocking',
      icon: '⚠️',
      records: 4,
      type: 'Inventory'
    },
    {
      id: 4,
      title: 'Expiry Report',
      description: 'Products approaching their expiry date',
      icon: '📅',
      records: 5,
      type: 'Expiry'
    },
    {
      id: 5,
      title: 'Top Products Report',
      description: 'Best-selling products and quantities',
      icon: '🏆',
      records: 5,
      type: 'Sales'
    },
    {
      id: 6,
      title: 'Purchase Order Report',
      description: 'Supplier orders and delivery status',
      icon: '🚚',
      records: 3,
      type: 'Supplier'
    }
  ];

  get filteredReports(): Report[] {
    if (this.selectedReport === 'All Reports') {
      return this.reports;
    }

    return this.reports.filter(
      report => report.type === this.selectedReport
    );
  }

  selectFilter(filter: string): void {
    this.selectedReport = filter;
  }

  viewReport(report: Report): void {
    alert(
      report.title +
      '\n\n' +
      report.description +
      '\n\nTotal Records: ' +
      report.records +
      '\n\nNote: This is sample report data.'
    );
  }

  printReport(): void {
    window.print();
  }
}
