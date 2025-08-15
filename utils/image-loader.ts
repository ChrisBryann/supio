import type { ImageLoader, ImageLoaderProps } from "next/image";

export default function gumletLoader({src, width, quality}: ImageLoaderProps) {
    console.log(src)
    if(src.includes(process.env.BACKEND_URL || 'localhost')) {
        let parsedUrl = new URL(src);
        parsedUrl.hostname = process.env.GUMLET_API_DOMAIN || 'localhost';
        parsedUrl.searchParams.set('w', `${width}`);
        parsedUrl.searchParams.set('q', `${quality || 80}`);    
        return parsedUrl.toString();
    }
        return src;

}