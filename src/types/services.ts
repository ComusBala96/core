// Services types

import { SwiperConfig, UpdateColsOption } from './plugins';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type RequestType = 'request' | 'submit';
export type RequestDataType = 'form' | 'json';
export interface AppSuccessConfig {
    reload?: boolean;
    type?: string;
    load_html?: false;
    target?: string;
    [key: string]: any;
}
export interface AppPlugins {
    dataTable?: Record<string, any> | boolean;
    jodit?: Record<string, any> | boolean;
    select?: Record<string, any> | boolean;
    datetimepicker?: Record<string, any> | boolean;
    datepicker?: Record<string, any> | boolean;
    timepicker?: Record<string, any> | boolean;
    colorpicker?: Record<string, any> | boolean;
    summernote?: Record<string, any> | boolean;
    swiper?: SwiperConfig[] | boolean;
    [key: string]: any;
}
export interface AppConfig {
    element?: string | undefined;
    plugin?: AppPlugins;
    confirm?: false;
    validation?: true;
    rules?: Record<string, Record<string, Record<string, any>>>;
    type?: RequestType;
    method?: HttpMethod;
    dataType?: RequestDataType;
    payload?: Record<string, any> | FormData;
    url?: string;
    token?: string;
    success?: AppSuccessConfig;
    updateCols?: UpdateColsOption;
    beforeSend?: (op: AppConfig, callBack: (op: AppConfig) => void) => void;
    [key: string]: any;
}
export interface PdfConfig {
    btn?: string | undefined;
    dataTable?: boolean;
    [key: string]: any;
}
export interface ExcelConfig {
    btn?: string | undefined;
    dataTable?: boolean;
    [key: string]: any;
}

