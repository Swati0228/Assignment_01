import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';
import { SensexService } from './services/sensex.service';
import { of } from 'rxjs';

describe('App', () => {
  let mockSensexService: any;

  beforeEach(async () => {
    mockSensexService = {
      getSensexData: () => of([])
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: SensexService, useValue: mockSensexService },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router outlet', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});

