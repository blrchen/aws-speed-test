import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChatGPTAssistantComponent } from './chatgpt-assistant'
import { ChatGPTComponent } from './index'

const routes: Routes = [
  {
    path: '',
    component: ChatGPTComponent,
    children: [
      {
        path: 'chatgpt-assistant',
        component: ChatGPTAssistantComponent,
        data: { title: 'ChatGPT Assistant' }
      },
      {
        path: '**',
        redirectTo: 'Latency',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatGPTRoutingModule {}
