const Skeleton = () => {
  return (
    <div
      className="mx-auto w-full rounded-md border border-gray-300 p-4 shadow"
      role="progressbar"
    >
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-slate-700" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-slate-700" />
              <div className="col-span-1 h-2 rounded bg-slate-700" />
            </div>
            <div className="h-2 rounded bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Skeleton };
