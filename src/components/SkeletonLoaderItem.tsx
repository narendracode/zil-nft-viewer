export default function SkeletonLoaderItem() {
    return (
        <>
          {/* <!-- card --> */}
          <div className="m-5 md:w-64 sm:w-12 bg-white rounded shadow-2xl">
            {/* <!-- image --> */}
            <div className="md:h-32 bg-gray-200 rounded-tr rounded-tl animate-pulse"></div>
            <div className="p-5">
              {/* <!-- title --> */}
              <div className="md:h-6 rounded-sm bg-gray-200 animate-pulse mb-4"></div>

              {/* <!-- content --> */}
              <div className="grid md:grid-cols-4 gap-1">
                <div className="h-4 sm:h-2 col-span-3 rounded-sm bg-gray-200 animate-pulse"></div>
                <div className="h-4 sm:h-2 rounded-sm bg-gray-200 animate-pulse"></div>
                <div className="h-4 sm:h-2 col-span-2 rounded-sm bg-gray-200 animate-pulse"></div>
                <div className="h-4 sm:h-2 col-span-2 rounded-sm bg-gray-200 animate-pulse"></div>
                <div className="h-4 sm:h-2 rounded-sm bg-gray-200 animate-pulse"></div>
                <div className="h-4 sm:h-2 col-span-3 rounded-sm bg-gray-200 animate-pulse"></div>
                <div className="h-4 sm:h-2 col-span-2 rounded-sm bg-gray-200 animate-pulse"></div>
                <div className="h-4 sm:h-2 rounded-sm bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          </div>
        </>
    );  
}