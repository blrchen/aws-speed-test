import { Routes } from '@angular/router'

export const chatgptRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./chatgpt.component').then((m) => m.ChatGPTComponent),
    children: [
      {
        path: 'chatgpt-assistant',
        loadComponent: () =>
          import('./chatgpt-assistant/chatgpt-assistant.component').then(
            (m) => m.ChatGPTAssistantComponent
          ),
        data: { title: 'ChatGPT Assistant' }
      },
      {
        path: '**',
        redirectTo: 'chatgpt-assistant',
        pathMatch: 'full'
      }
    ]
  }
]
