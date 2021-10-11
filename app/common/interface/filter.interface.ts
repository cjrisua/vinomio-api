export type Filter = {
    [name:string] : any
};
export interface IFilter{
    //[name:string] : Filter;
    where?: Filter;
    limit?: number;
    page ?: number;
}
export interface WhereKey{
    id?: number;
    slug?: string;
}