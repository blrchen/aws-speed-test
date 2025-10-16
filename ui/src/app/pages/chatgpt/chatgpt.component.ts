import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-chatgpt',
  standalone: true,
  imports: [RouterModule],
  template: '<router-outlet />',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatGPTComponent {}
