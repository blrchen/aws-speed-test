import { Component } from '@angular/core'
import { SeoService } from '../../../services'

interface Card {
  title: string
  text: string
  link: string
}

@Component({
  selector: 'app-chatgpt-assistant',
  templateUrl: './chatgpt-assistant.component.html'
})
export class ChatGPTAssistantComponent {
  textCards: Card[] = [
    {
      title: 'Translate Text',
      text: 'ChatGPT-powered Text Translator that instantly translates text into 20+ languages.',
      link: 'https://www.azurespeed.com/ChatGPT/TranslateText'
    },
    {
      title: 'Polish Text',
      text: "ChatGPT's Text Polisher effortlessly enhances your writing.",
      link: 'https://www.azurespeed.com/ChatGPT/PolishText'
    },
    {
      title: 'Summarize Text',
      text: 'Powered by ChatGPT, the Text Summarizer simplifies lengthy content into concise summaries within seconds.',
      link: 'https://www.azurespeed.com/ChatGPT/SummarizeText'
    },
    {
      title: 'Generate Email',
      text: "ChatGPT's Email Generator saves time by generating medium to long-sized emails for you.",
      link: 'https://www.azurespeed.com/ChatGPT/GenerateEmail'
    }
  ]

  codeCards: Card[] = [
    {
      title: 'Explain Code',
      text: 'ChatGPT Code Explainer is an AI assistant designed to help users understand programming code.',
      link: 'https://www.azurespeed.com/ChatGPT/ExplainCode'
    },
    {
      title: 'Generate Code',
      text: 'ChatGPT Code Generator is an advanced AI-based tool that can generate code from natural language inputs.',
      link: 'https://www.azurespeed.com/ChatGPT/GenerateCode'
    },
    {
      title: 'Convert To Bash',
      text: 'ChatGPT Shell Command generator converts natural language descriptions into shell command that can be executed.',
      link: 'https://www.azurespeed.com/ChatGPT/ConvertToBash'
    }
  ]

  constructor(private seoService: SeoService) {
    this.initializeSeoProperties()
  }

  private initializeSeoProperties(): void {
    this.seoService.setMetaTitle('Explore ChatGPT Assistant for Writing and Coding')
    this.seoService.setMetaDescription(
      'Discover how ChatGPT Assistant can enhance your writing and coding projects with innovative AI technology.'
    )
    this.seoService.setMetaKeywords(
      'ChatGPT, Writing Assistant, Code Assistant, AI Tool, Text Translation, Code Generation'
    )
    this.seoService.setCanonicalUrl('https://awsspeedtest.com/chatgpt/chatgpt-assistant')
  }
}
