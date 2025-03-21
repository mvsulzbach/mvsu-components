import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { RegistrationComponent } from './app/registration/registration.component';
import { NgZone } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {provideAnimations} from "@angular/platform-browser/animations";
import {ParticipatingMembersComponent} from "./app/participating-members/participating-members.component";

(async () => {

  const app = await createApplication({
    providers: [
      provideHttpClient(),
      provideAnimations(),
    ],
  });

  const registerElement = createCustomElement(RegistrationComponent, {
    injector: app.injector,
  });

  const membersElement = createCustomElement(ParticipatingMembersComponent, {
    injector: app.injector,
  });

  app.injector.get(NgZone).run(() => {
    customElements.define('mvsu-registration', registerElement)
    customElements.define('mvsu-participating-members', membersElement)
  });

})();
