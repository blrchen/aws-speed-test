import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../shared/shared.module'
import { ChatGPTRoutingModule } from './chatgpt-routing.module'
import { ChatGPTComponent } from './chatgpt.component'
import { ChatGPTAssistantComponent } from './chatgpt-assistant'

@NgModule({
  bootstrap: [],
  declarations: [ChatGPTComponent, ChatGPTAssistantComponent],
  exports: [],
  imports: [CommonModule, ChatGPTRoutingModule, SharedModule, ReactiveFormsModule],
  providers: []
})
export class ChatGPTModule {}
