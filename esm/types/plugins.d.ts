import type HighchartsType from 'highcharts';
export type ChartSeries = HighchartsType.SeriesOptionsType;
export type BarChartOptions = {
    element: string;
    type?: NonNullable<HighchartsType.Options['chart']>['type'];
    title?: string;
    subtitle?: string;
    xAxisTitle?: string;
    yAxisTitle?: string;
    xAxisType?: 'category' | 'linear' | 'datetime' | 'logarithmic';
    series?: ChartSeries[];
    drilldown?: HighchartsType.DrilldownOptions;
};
import { Api } from 'datatables.net';
export interface DataTableOptions {
    glob?: boolean;
    searching?: boolean;
    ordering?: boolean;
    paging?: boolean;
    info?: boolean;
    pageLength?: number;
    responsive?: boolean;
    lengthChange?: boolean;
    stateSave?: boolean;
    url?: string;
    columns?: any[];
    payload?: Record<string, any>;
    disabled?: number[];
    select?: boolean;
    processing?: boolean;
    selected?: number[];
    res?: any;
    dataSrc?: any;
    data?: any;
    onSelectRows?: (dt: Api, op: DataTableOptions) => void;
}
export interface AfterSuccess {
    type: string;
}
import { AjaxDataType, AjaxType } from './http';
export type DtValue = string | number | null;
export type UpdateColItem = {
    index: number;
    name: string;
};
export type UpdateCols = {
    key: string;
    items: UpdateColItem[];
};
export type UpdateColsOption = boolean | number[] | Partial<UpdateCols> | undefined;
export type RowData = Record<string, any> | any[];
export interface DeleteAllOptions {
    element?: string;
    script?: string;
    extra?: any;
    api?: any;
    dataType?: AjaxDataType;
    type?: AjaxType;
    afterSuccess?: AfterSuccess;
    tableLoadType?: RowData[];
}
export type ExcelWidth = number | {
    auto: 1;
};
export interface RenderDataConfig {
    data: string;
    type?: 'text' | 'image';
    imageStyles?: Record<string, any>;
}
export interface FilterColumn {
    title: string;
    data: string;
    excelWidth?: number | 'auto';
    renderData?: RenderDataConfig;
}
export interface ExcelOptions {
    filterColumn?: FilterColumn[];
}
export interface ExcelResult {
    payload: (string | number)[][];
    width: ExcelWidth[];
}
export interface DownloadExcelOptions {
    btn?: string;
    file_name?: string;
    dataTable?: unknown;
    dataSrc?: Record<string, any>[];
    columns?: any[];
    pdf?: number[];
    filterColumn?: any[];
    globLoader?: boolean;
}
export interface JoditOptions {
    element?: string | string[];
    height?: number | string | Array<number | string>;
    placeholder?: string | string[];
    buttons?: string[] | string[][];
    removeButtons?: string[] | string[][];
}
export interface ModalResponse {
    success: boolean;
    data?: {
        extraData?: {
            inflate?: string;
            redirect?: string;
        };
        view?: string;
        [key: string]: any;
    };
}
export interface ActionModalOptions {
    element?: string;
    script?: string;
    payload?: Record<string, any>;
    title?: string;
    modalSize?: string;
    modalCallback?: string;
    globLoader?: boolean;
    response?: ModalResponse;
    [key: string]: any;
}
import { Content, DynamicContent, Margins, PageOrientation, PageSize } from 'pdfmake/interfaces';
export interface MakePdfOptions {
    btn?: string;
    file_name?: string;
    id?: string;
    url?: string;
    payload?: Record<string, unknown> | FormData;
    pdfFonts?: CustomFont[];
    tableLayouts?: CustomTableLayout[];
    dataTable?: string;
    dataSrc?: any[];
    pdf?: number[];
    columns?: any[];
    perPage?: number;
    pageOrientation?: PageOrientation | undefined;
    pageSize?: PageSize | undefined;
    pageMargins?: Margins | undefined;
    header?: DynamicContent | Content | undefined;
    footer?: DynamicContent | Content | undefined;
    bodyStyles?: Record<string, any>;
    globLoader?: boolean;
    [key: string]: any;
}
export interface CustomFont {
    name: string;
    n: string;
    b?: string;
    i?: string;
    bi?: string;
}
export interface PdfMakeWithFonts {
    fonts: {
        [key: string]: any;
    };
}
export interface CustomTableLayout {
    name: string;
    value: any;
}
export interface MultiSelectOptions {
    element?: string;
    tags?: boolean;
    placeholder?: string;
    tokenSeparators?: string[];
    allowClear?: boolean;
    width?: string;
    [key: string]: any;
}
export interface SummernoteOptions {
    element: string;
    height?: number;
    tabSize?: number;
    placeholder?: string;
}
export interface BreakpointConfig {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
}
export interface SwiperConfig {
    element: string;
    direction?: 'horizontal' | 'vertical';
    slidesPerView?: number;
    spaceBetween?: number;
    loop?: boolean;
    autoplay?: any;
    navigation?: any;
    pagination?: any;
    breakpoints?: BreakpointConfig;
    freeMode?: boolean;
    grabCursor?: boolean;
    mousewheel?: any;
}
//# sourceMappingURL=plugins.d.ts.map