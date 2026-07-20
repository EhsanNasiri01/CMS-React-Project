
export default function RouteFallback() {
  return (
    <div className="flex h-dvh animate-fade-in overflow-hidden bg-canvas">
      <div className="hidden w-[248px] shrink-0 border-e border-line bg-surface lg:block" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-16 shrink-0 border-b border-line bg-surface" />
        <div className="flex-1 px-4 pt-6 md:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="h-8 w-56 rounded-lg bg-surface" />
            <div className="mt-3 h-4 w-80 rounded bg-surface/70" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="h-[148px] rounded-card bg-surface" />
              ))}
            </div>
            <div className="mt-4 h-[300px] rounded-card bg-surface" />
          </div>
        </div>
      </div>
    </div>
  );
}
