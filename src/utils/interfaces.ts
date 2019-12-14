export enum order {
    ASC = 'ASC',
    DESC = 'DESC',
}
export enum Option {
    equal = '=',
    mayor = '>',
    minor = '<',
    mayorOrEqual = '>=',
    minorOrEqual = '<=',
    between = 'between',
    isNull = 'isnull',
    isNotNull = 'isnotnull'
}

export interface Response {
    body: object;
    data: object;
    message: string;
}

export interface Filter {
    field: string;
    options: FilterOption[];
}
export interface FilterOption {
    option: Option;
    value?: any;
    to?: any;
}
export interface Filters {
    filters: Filter[];
}
export interface Order {
    field: string;
    mode: order;
}
export interface Orders {
    order: Order[];
}

