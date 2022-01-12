import SkeletonLoaderItem from "./SkeletonLoaderItem";
export default function SkeletonLoader() {
    return (
        <>
           <div className="flex md:flex-row flex-col sm:flex-col flex-wrap justify-evenly">
            <SkeletonLoaderItem />
            <SkeletonLoaderItem />
            <SkeletonLoaderItem />
            <SkeletonLoaderItem />
        </div>
        </>
    );  
}