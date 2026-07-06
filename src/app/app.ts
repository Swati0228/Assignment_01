import { Component, OnInit, signal } from '@angular/core';
import { SensexService } from './services/sensex.service';
import { Sensex } from './models/sensex';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  title = 'sensex-dashboard';

  sensexData = signal<Sensex[]>([]);

  constructor(private sensexService: SensexService) {}

  ngOnInit(): void {

    this.sensexService.getSensexData().subscribe(data => {

      this.sensexData.set(data);

      console.log(this.sensexData());

    });

  }

}