const DashboardSkeleton = () => {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
      <div className="h-[350px] w-full bg-gray-200 sm:h-[450px]" />
      <div className="h-[350px] w-full bg-gray-200 sm:h-[450px]" />
      <div className="h-[350px] w-full bg-gray-200 sm:h-[450px]" />
      <div className="h-[350px] w-full bg-gray-200 sm:h-[450px]" />
    </div>
  );
};

export default DashboardSkeleton;
