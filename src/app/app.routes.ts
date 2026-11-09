
import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard/dashboard';
import { Products } from './components/products/products';
import { Billing } from './components/billing/billing';
import { Suppliers } from './components/suppliers/suppliers';
import { Inventory } from './components/inventory/inventory';
import { Analytics } from './components/analytics/analytics';
import { Reports } from './components/reports/reports';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'products', component: Products },
  { path: 'billing', component: Billing },
  { path: 'suppliers', component: Suppliers },
  { path: 'inventory', component: Inventory },
  { path: 'analytics', component: Analytics },
  { path: 'reports', component: Reports },
  { path: '**', redirectTo: 'dashboard' }
];
