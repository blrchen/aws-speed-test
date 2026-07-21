import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core'
import { provideClientHydration } from '@angular/platform-browser'
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router'

import { routes } from './app.routes'
import { CustomErrorHandler } from './services/errors-handling/error-handler'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling()),
    provideClientHydration(),
  ],
}
