import { IFilter } from "./filter.interface"

export interface CRUD {
    list: (limit: number, page: number, filter?:IFilter) => any,
    create: (resource: any) => any,
    updateById: (resourceId: any) => any,
    readById: (resourceId: any) => any,
    deleteById: (resourceId: any) => any,
    patchById: (resourceId: any) => any,
}