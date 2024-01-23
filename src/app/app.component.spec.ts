import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

// Describe block for the 'AppComponent'
describe('AppComponent', () => {
  // Configuration setup for TestBed before each test
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Assert that the component is truthy, meaning it is successfully created
    expect(app).toBeTruthy();
  });
  // Test: 'should have as title 'ProgettoTaw''
  it(`should have as title 'ProgettoTaw'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Assert that the title property of the AppComponent is set to 'ProgettoTaw'
    expect(app.title).toEqual('ProgettoTaw');
  });
  // Test: 'should render title'
  it('should render title', () => {
    // Create a fixture for the AppComponent
    const fixture = TestBed.createComponent(AppComponent);
    // Trigger change detection to update the view
    fixture.detectChanges();
    // Access the compiled HTML of the component
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('ProgettoTaw app is running!');
  });
});
