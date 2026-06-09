import { SweetAlertOptions } from 'sweetalert2';
export type SweetDeleteConfirmOptions = SweetAlertOptions & {
    item: string | number | (string | number)[] | null | Record<string, any>;
};
export type ToastrPosition = 'toast-top-right' | 'toast-bottom-right' | 'toast-bottom-left' | 'toast-top-left' | 'toast-top-center' | 'toast-bottom-center' | 'toast-top-full-width' | 'toast-bottom-full-width';
export interface ToastrConfig {
    closeButton?: boolean;
    progressBar?: boolean;
    newestOnTop?: boolean;
    preventDuplicates?: boolean;
    timeOut?: number;
    extendedTimeOut?: number;
    positionClass?: ToastrPosition;
    showDuration?: number;
    hideDuration?: number;
    showMethod?: string;
    hideMethod?: string;
}
//# sourceMappingURL=utils.d.ts.map