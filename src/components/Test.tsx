<div className="h-screen w-screen overflow-hidden grid grid-cols-main grid-rows-footer">
<div className="bg-slate-500">
  <h1>Side</h1>
</div>
<div className="flex min-h-0 w-full flex-col">
  <div className="h-full flex-1">
    <div className="flex h-full flex-col">
      <div className="flex-[0_0_59px] flex items-center">
        <h1>h1</h1>
      </div>
      <div className="overflow-y-auto">
        <div className="bg-red-200" style={{ height: "2000px" }}>
          simulated big element
        </div>
      </div>
    </div>
  </div>
</div>
<div className="bg-stone-900 col-span-2 text-white">footer</div>
</div>
);