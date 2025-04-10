export interface Todo{
    id:number;
    title:string;
    description: string;
    type: "easy" | "normal" | "hard";
    completed: boolean;
}