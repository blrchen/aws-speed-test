import { DOCUMENT, isPlatformBrowser } from '@angular/common'
import { ErrorHandler, inject, PLATFORM_ID, Service } from '@angular/core'

const RELOAD_PROMPT_ID = 'app-chunk-load-error-prompt'
const CHUNK_LOAD_ERROR_PATTERNS = [
  /chunk-[\w.-]+\.js/i,
  /ChunkLoadError/i,
  /Loading chunk \d+ failed/i,
  /Failed to fetch dynamically imported module/i,
  /Importing a module script failed/i,
  /error loading dynamically imported module/i,
  /Failed to load module script/i,
]

@Service({ autoProvided: false })
export class CustomErrorHandler implements ErrorHandler {
  private readonly document = inject(DOCUMENT)
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID))
  private reloadPromptVisible = false

  handleError(error: unknown): void {
    const originalError = this.unwrapError(error)
    const isChunkLoadError = this.isChunkLoadError(originalError)

    if (isChunkLoadError) {
      this.openReloadPrompt()
    }

    console.error(error)
  }

  private isChunkLoadError(error: unknown): boolean {
    const errorText = this.getErrorText(error)
    return CHUNK_LOAD_ERROR_PATTERNS.some((pattern) => pattern.test(errorText))
  }

  private openReloadPrompt(): void {
    if (!this.isBrowser || this.reloadPromptVisible) return

    const existingPrompt = this.document.getElementById(RELOAD_PROMPT_ID)
    if (existingPrompt) {
      this.reloadPromptVisible = true
      return
    }

    const container = this.document.createElement('aside')
    container.id = RELOAD_PROMPT_ID
    container.setAttribute('role', 'status')
    container.setAttribute('aria-live', 'polite')
    container.setAttribute('aria-atomic', 'true')
    this.applyContainerStyles(container)

    const title = this.document.createElement('div')
    title.textContent = 'A new version is available'
    title.style.fontWeight = '700'
    title.style.color = 'var(--color-text-strong)'

    const message = this.document.createElement('p')
    message.textContent =
      'This page is using an older cached file. Reload to get the latest version.'
    message.style.margin = '0'
    message.style.fontSize = '0.875rem'
    message.style.lineHeight = '1.45'

    const actions = this.document.createElement('div')
    actions.style.display = 'flex'
    actions.style.flexWrap = 'wrap'
    actions.style.gap = '0.5rem'
    actions.style.justifyContent = 'flex-end'

    const reloadButton = this.document.createElement('button')
    reloadButton.type = 'button'
    reloadButton.className = 'btn btn-primary'
    reloadButton.textContent = 'Reload'
    reloadButton.addEventListener('click', () => this.document.location.reload())

    const dismissButton = this.document.createElement('button')
    dismissButton.type = 'button'
    dismissButton.className = 'btn btn-outline'
    dismissButton.textContent = 'Dismiss'
    dismissButton.addEventListener('click', () => {
      container.remove()
      this.reloadPromptVisible = false
      this.document.getElementById('main-content')?.focus({ preventScroll: true })
    })

    actions.append(reloadButton, dismissButton)
    container.append(title, message, actions)
    this.document.body.appendChild(container)
    this.reloadPromptVisible = true
  }

  private applyContainerStyles(container: HTMLElement): void {
    container.style.position = 'fixed'
    container.style.right = 'max(1rem, env(safe-area-inset-right))'
    container.style.bottom = 'max(1rem, env(safe-area-inset-bottom))'
    container.style.zIndex = '1000'
    container.style.display = 'flex'
    container.style.width = 'min(28rem, calc(100vw - 2rem))'
    container.style.flexDirection = 'column'
    container.style.gap = '0.75rem'
    container.style.border = '1px solid var(--color-border-soft)'
    container.style.borderRadius = 'var(--radius-lg)'
    container.style.backgroundColor = 'var(--color-surface-raised)'
    container.style.boxShadow = 'var(--shadow-card)'
    container.style.color = 'var(--color-text-body)'
    container.style.padding = '1rem'
  }

  private getErrorText(error: unknown): string {
    if (error instanceof Error) {
      return `${error.name}\n${error.message}\n${error.stack ?? ''}`
    }

    if (typeof error === 'string') {
      return error
    }

    if (this.isRecord(error)) {
      const message = typeof error['message'] === 'string' ? error['message'] : ''
      const stack = typeof error['stack'] === 'string' ? error['stack'] : ''
      return `${message}\n${stack}`.trim() || this.stringifyError(error)
    }

    return String(error)
  }

  private stringifyError(error: unknown): string {
    try {
      return JSON.stringify(error)
    } catch {
      return String(error)
    }
  }

  private unwrapError(error: unknown): unknown {
    if (!this.isRecord(error)) return error

    const nestedError =
      error['ngOriginalError'] ?? error['rejection'] ?? error['reason'] ?? error['error']
    return nestedError === undefined || nestedError === error ? error : nestedError
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
  }
}
