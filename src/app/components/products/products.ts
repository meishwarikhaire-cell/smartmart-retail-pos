
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService, Product } from '../../services/store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {

  constructor(private store: StoreService) {}

  categories: string[] = [
    'Grocery & Staples',
    'Fruits & Vegetables',
    'Dairy & Bakery',
    'Snacks & Beverages',
    'Clothing & Fashion',
    'Personal Care',
    'Home & Cleaning',
    'Electronics & Household'
  ];

  get products(): Product[] {
    return this.store.getProducts();
  }

  searchText = '';
  selectedCategory = 'All';
  showForm = false;
  editMode = false;

  newProduct: Product = this.emptyProduct();

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  get lowStockCount(): number {
    return this.products.filter(product => product.stock < 10).length;
  }

  get filteredProducts(): Product[] {
    const search = this.searchText.trim().toLowerCase();

    return this.products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.barcode.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);

      const matchesCategory =
        this.selectedCategory === 'All' ||
        product.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  emptyProduct(): Product {
    return {
      id: 0,
      name: '',
      category: '',
      price: 0,
      stock: 0,
      barcode: '',
      expiry: ''
    };
  }

  openAddForm(): void {
    this.editMode = false;
    this.newProduct = this.emptyProduct();
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.newProduct = this.emptyProduct();
  }

  addProduct(): void {
    if (
      !this.newProduct.name.trim() ||
      !this.newProduct.category ||
      !this.newProduct.barcode.trim() ||
      !this.newProduct.expiry ||
      this.newProduct.price <= 0 ||
      this.newProduct.stock < 0
    ) {
      alert('Please enter valid product details.');
      return;
    }

    if (this.editMode) {
      this.store.updateProduct({ ...this.newProduct });
      alert('Product updated successfully!');
    } else {
      this.store.addProduct({ ...this.newProduct });
      alert('Product added successfully!');
    }

    this.closeForm();
  }

  editProduct(product: Product): void {
    this.editMode = true;
    this.newProduct = { ...product };
    this.showForm = true;
  }

  deleteProduct(id: number): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete this product?'
    );

    if (confirmDelete) {
      this.store.deleteProduct(id);
    }
  }
}
