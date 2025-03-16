import { Component } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';

@Component({
    selector: 'app-root',
    imports: [RegistrationComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
}
