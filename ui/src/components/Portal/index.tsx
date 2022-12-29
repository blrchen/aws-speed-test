import { createPortal } from 'react-dom'

export interface PortalProps {
  getContainer?: () => Element
  children?: React.ReactNode
}

const Portal = (props: PortalProps) => {
  const { children, getContainer } = props

  const container = getContainer?.()

  if (container) {
    return createPortal(children, container)
  }

  return <></>
}

export default Portal
