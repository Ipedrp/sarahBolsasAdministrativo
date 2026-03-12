import Lottie from 'lottie-react'
import loadReadData from "../../assets/loadRed.json"

interface LoadingAnimationProps {
  className?: string
}

export function LoadingAnimation({ className = 'w-24 h-24' }: LoadingAnimationProps) {
  return (
    <Lottie
      animationData={loadReadData}
      loop={true}
      autoplay={true}
      className={className}
    />
  )
}