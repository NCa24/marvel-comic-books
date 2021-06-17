type Character = {
    name: string;
}

type Characters = {
    available: number;
    items: Character[]
}

type Image = {
    path: string;
    extension: string;
}

export type ComicBook = {
    id: number;
    title: string;
    characters: Characters;
    images: Image[];
}

export type ComicResponse = {
    count: number;
    limit: number;
    offset: number;
    results: ComicBook[];
}