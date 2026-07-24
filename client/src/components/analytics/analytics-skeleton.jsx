export default function AnalyticsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            <div className="mt-4 h-10 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="space-y-4 p-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-10 animate-pulse rounded bg-gray-200"
            />
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, tableIndex) => (
          <div
            key={tableIndex}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="space-y-4 p-6">
              {Array.from({ length: 4 }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="h-10 animate-pulse rounded bg-gray-200"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
