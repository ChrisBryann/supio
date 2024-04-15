const UpsertProductSkeleton = () => {
  return (
    <div className="mx-auto pb-12 md:pb-20 grid lg:grid-cols-2 gap-8 animate-pulse">
      <div className="flex flex-col items-center gap-4">
        <div className="h-[500px] w-[450px] mx-auto rounded bg-gray-200" />
        <div className="bg-gray-200 w-[200px] h-[25px]"></div>
      </div>
      <div className="px-4 w-full mx-auto flex flex-col space-y-6">
        <div className=" bg-gray-200 h-[30px] w-full"></div>
        <div className=" bg-gray-200 h-[15px] w-[150px]"></div>
        <div className="bg-gray-200 w-full h-[160px]" />
        <div className=" bg-gray-200 h-[15px] w-[150px]"></div>
        <div className="bg-gray-200 w-full h-[160px]" />
      </div>
    </div>
  );
};
export default UpsertProductSkeleton;
