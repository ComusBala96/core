import { Api } from 'datatables.net';
import { DataTableOptions, DtValue, RowData, UpdateColsOption } from '../../types';
export declare function selectAction(table: string, dt: Api, op: DataTableOptions): void;
export declare function showSelected(dt: Api, op?: DataTableOptions): void;
export declare function getUpdatedTableData(element: string, api: Api, updateCols?: UpdateColsOption): Record<string, Record<string, DtValue>>;
export declare function getSelectedTableData(element: string, selected: RowData[], tableLoadType?: 'ajax' | 'dom'): Record<string, any>;
//# sourceMappingURL=datatable.d.ts.map