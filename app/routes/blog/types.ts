export interface ImportedPost {
    title: string;
    publishedDate?: Date;
    canonical?: string;
    tags?: string[];
    image?: string;
    default: () => unknown;
}