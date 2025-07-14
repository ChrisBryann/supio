import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

export default function BlogSkeleton() {
    return <BentoGrid className="animate-pulse">
        <BentoGridItem className="bg-gray-200"/>
        <BentoGridItem className="bg-gray-200"/>
        <BentoGridItem className="bg-gray-200"/>
        <BentoGridItem className="bg-gray-200"/>
        <BentoGridItem className="bg-gray-200"/>
        <BentoGridItem className="bg-gray-200"/>
        <BentoGridItem className="bg-gray-200"/>
        <BentoGridItem className="bg-gray-200"/>
        <BentoGridItem className="bg-gray-200"/>
    </BentoGrid>
}