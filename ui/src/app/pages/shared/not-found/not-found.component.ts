import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="page-container py-3">
      <div class="mx-auto w-full max-w-xl space-y-4 text-center">
        <header class="page-intro items-center text-center">
          <h1 class="page-title page-intro__title">Page Not Found</h1>
          <p class="page-intro__description">
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>
        </header>
        <a
          routerLink="/"
          class="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Go home
        </a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}
