export type Filter = {
    id?: number;
    slug?: string;
  };
export interface IFilter{
    //[name:string] : Filter;
    where?: Filter;
    limit ?: number;
    page ?: number;
}