function LoadingSmall() {
  return (
      <div className="flex flex-row gap-2 items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-gray-200 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-gray-200 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-gray-200 animate-bounce [animation-delay:-.5s]"></div>
      </div>
  )
}

export default LoadingSmall;