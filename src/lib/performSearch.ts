import type { Movies } from "@/types";

export default function performSearch(query: string, results: Movies[]) {
    const q = query?.trim().toLowerCase();
    if (!q) return { data: [] as Movies[] };
    const data = results.filter(movie => movie.title.toLowerCase().includes(q));
    return { data };
}