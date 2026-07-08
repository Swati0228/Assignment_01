import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { SensexService } from '../services/sensex.service';
import { Sensex } from '../models/sensex';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private _sensexData = signal<Sensex[]>([]);

  constructor(
    private sensexService: SensexService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sensexService.getSensexData().subscribe({
      next: (data) => {
        console.log('Successfully fetched sensex data:', data);
        this._sensexData.set(data);
      },
      error: (err) => {
        console.error('Error fetching sensex data:', err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  sensexData(): Sensex[] { return this._sensexData(); }

  getHighestClose(): number {
    const data = this._sensexData();
    if (!data.length) return 0;
    return Math.max(...data.map(d => d.close));
  }

  getLowestClose(): number {
    const data = this._sensexData();
    if (!data.length) return 0;
    return Math.min(...data.map(d => d.close));
  }

  getAverageClose(): number {
    const data = this._sensexData();
    if (!data.length) return 0;
    return data.reduce((acc, d) => acc + d.close, 0) / data.length;
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
