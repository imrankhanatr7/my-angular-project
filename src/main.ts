import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, {
  providers: [
    // Add any global providers here if needed
  ]
}).catch(err => console.error(err));
