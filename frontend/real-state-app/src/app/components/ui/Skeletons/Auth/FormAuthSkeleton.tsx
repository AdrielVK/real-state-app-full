export default function FormAuthSkeleton() {
    return (
      <div className="relative z-10 w-96">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-lg rounded-lg" />
        <div className="relative p-8 rounded-lg space-y-6">
          <div className="h-8 bg-gray-300 rounded animate-pulse" />
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-1/4 bg-gray-300 rounded animate-pulse" />
              <div className="h-10 bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-1/4 bg-gray-300 rounded animate-pulse" />
              <div className="h-10 bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="h-10 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="h-10 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-3/4 mx-auto bg-gray-300 rounded animate-pulse" />
        </div>
      </div>
    )
}