import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { RegistrationComponent } from './app/registration/registration.component';
import { NgZone } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

(async () => {

  const app = await createApplication({
    providers: [
      provideHttpClient()
    ],
  });

  const registerElement = createCustomElement(RegistrationComponent, {
    injector: app.injector,
  });

  app.injector.get(NgZone).run(() => {
    customElements.define('mvsu-registration', registerElement)
  });

})();