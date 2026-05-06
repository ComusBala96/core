// /* -----------------------------
//    Get Column Data
// ----------------------------- */
// export function getCellValue(cell: HTMLElement): DtValue {
//     const input = cell.querySelector('input, select, textarea') as HTMLInputElement | null;
//     if (input) return input.value;
//     return cell.textContent?.trim() ?? '';
// }

// export function getDtDataAuto(api: Api, colIndex: number): DtValue[] {
//     const result: DtValue[] = [];
//     api.rows().every(function () {
//         const cell = api.cell(this.index(), colIndex).node() as HTMLElement;
//         result.push(getCellValue(cell));
//     });
//     return result;
// }

// export function getDtDataTyped(type: 'input' | 'text', api: Api, colIndex: number): DtValue[] {
//     const result: DtValue[] = [];
//     api.rows().every(function () {
//         const cell = api.cell(this.index(), colIndex).node() as HTMLElement;
//         if (type === 'input') {
//             const input = cell.querySelector('input, select, textarea') as HTMLInputElement | null;
//             result.push(input?.value ?? '');
//         } else {
//             result.push(cell.textContent?.trim() ?? '');
//         }
//     });
//     return result;
// }

// export function resolveUpdateCols(updateCols: UpdateColsOption): UpdateCols | null {
//     if (!updateCols) return null;
//     if (updateCols === true) {
//         return Config.dt_update_cols;
//     }
//     if (Array.isArray(updateCols)) {
//         return {
//             key: `col_${updateCols[0]}`,
//             items: updateCols.map((index) => ({
//                 index,
//                 name: `col_${index}`,
//                 type: 'auto',
//             })),
//         };
//     }
//     return {
//         ...Config.dt_update_cols,
//         ...updateCols,
//         items: updateCols.items ?? Config.dt_update_cols.items,
//     };
// }

// export function getUpdatedTableData(api: Api, updateCols: UpdateColsOption = false): Record<string, any> {
//     const data: Record<string, any> = {};
//     const config = resolveUpdateCols(updateCols);
//     if (!config || !api) return data;
//     const items = config.items.map((col) => ({
//         ...col,
//         data: col.type === 'input' ? getDtDataTyped('input', api, col.index) : col.type === 'text' ? getDtDataTyped('text', api, col.index) : getDtDataAuto(api, col.index), // auto
//     }));
//     const keyItem = items.find((v) => v.name === config.key);
//     if (!keyItem?.data) return data;
//     const keyData = keyItem.data;
//     for (const col of items) {
//         const mapped: Record<string, DtValue> = {};
//         col.data?.forEach((value, i) => {
//             const k = keyData[i];
//             if (k !== undefined) {
//                 mapped[String(k)] = value;
//             }
//         });
//         data[col.name] = mapped;
//     }
//     return data;
// }

// export function bulkUpdate(op: AppConfig = {}) {
//     const { element = '', api, dataType = 'json', type = 'request', success = { alert: 'success' }, payload = {}, updateCols = false } = op;

//     if (Guard.hasElement(element)) {
//         $('#' + element)
//             .off('click')
//             .on('click', () => {
//                 let data = getUpdatedTableData(api, updateCols);
//                 if (Object.keys(payload).length > 0) {
//                     data = Obj.merge(data, payload);
//                 }
//                 Ajax.put(Obj.merge(op, { payload: data, dataType, type, success }));
//             });
//     }
// }