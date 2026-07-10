import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SensexService } from '../services/sensex.service';
import { Sensex } from '../models/sensex';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  sensexData = signal<Sensex[]>([]);

  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalRecords = signal<number>(0);
  // Compute total pages dynamically
  totalPages = computed(() => Math.ceil(this.totalRecords() / this.pageSize()));
  constructor(
    private sensexService: SensexService,
    private router: Router
  ) { }
  ngOnInit(): void {
    const token = localStorage.getItem('jwt');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadPageData(this.currentPage(), this.pageSize());
  }
  loadPageData(page: number, limit: number): void {
    this.sensexService.getSensexData(page, limit).subscribe({
      next: (res) => {
        this.sensexData.set(res.data);
        this.totalRecords.set(res.totalCount);
        this.currentPage.set(res.page);
        this.pageSize.set(res.limit);
      },
      error: (err) => {
        console.error("Error fetching data:", err);
        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('jwt');
          this.router.navigate(['/login']);
        }
      }
    });
  }
  // Pagination navigation helpers
  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.loadPageData(this.currentPage() + 1, this.pageSize());
    }
  }
  prevPage(): void {
    if (this.currentPage() > 1) {
      this.loadPageData(this.currentPage() - 1, this.pageSize());
    }
  }
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadPageData(page, this.pageSize());
    }
  }

  getHighestClose(): number {
    return Math.max(...this.sensexData().map(item => Number(item.close)));
  }

  getLowestClose(): number {
    return Math.min(...this.sensexData().map(item => Number(item.close)));
  }

  getAverageClose(): number {

    const data = this.sensexData();

    if (data.length === 0) {
      return 0;
    }

    const total = data.reduce((sum, item) => sum + Number(item.close), 0);

    return total / data.length;
  }

  logout(): void {

    localStorage.removeItem('jwt');

    this.router.navigate(['/login']);

  }

}