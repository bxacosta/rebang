// This file was (mostly) ripped from https://duckduckgo.com/bang.js

export type Bang = {
    title: string;
    trigger: string;
    url: string;
    domain: string;
    category: string;
    subCategory?: string;
};

export const bangs: Bang[] = [
    {
        title: "T3 Chat",
        trigger: "t3",
        domain: "www.t3.chat",
        category: "AI",
        subCategory: "AI",
        url: "https://www.t3.chat/new?q={{{s}}}",
    },
    {
        title: "Google Translate to English",
        trigger: "gten",
        category: "Translation",
        domain: "translate.google.com",
        subCategory: "Google",
        url: "https://translate.google.com/?sl=auto&tl=en&op=translate&text={{{s}}}",
    },
    {
        title: "Google Translate to Spanish",
        trigger: "gtes",
        category: "Translation",
        domain: "translate.google.com",
        subCategory: "Google",
        url: "https://translate.google.com/?sl=auto&tl=es&op=translate&text={{{s}}}",
    },
    {
        title: "Google",
        trigger: "g",
        domain: "www.google.com",
        category: "Search Engine",
        subCategory: "Google",
        url: "https://www.google.com/search?q={{{s}}}",
    },
    {
        title: "YouTube",
        trigger: "yt",
        domain: "www.youtube.com",
        category: "Multimedia",
        subCategory: "Video",
        url: "https://www.youtube.com/results?search_query={{{s}}}",
    },
    {
        title: "GitHub",
        trigger: "ghr",
        domain: "github.com",
        category: "Development",
        subCategory: "Programming",
        url: "https://github.com/{{{s}}}",
    },
]