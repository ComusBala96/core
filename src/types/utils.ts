// Utils types

// SweetAlert2 types

import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
export { SweetAlertOptions, SweetAlertResult };
export type SweetBaseOptions = Omit<SweetAlertOptions, 'icon' | 'title' | 'input' | 'inputValidator'>;
export type SweetConfirmOptions = Omit<SweetBaseOptions, 'showCancelButton' | 'confirmButtonText' | 'cancelButtonText'>;
export type SweetDeleteConfirmOptions = Omit<SweetConfirmOptions, 'confirmButtonColor'> & { item: string | number | (string | number)[] | null | Record<string, any> };
export type SweetLoadingOptions = Omit<SweetAlertOptions, 'title' | 'input' | 'inputValidator' | 'allowOutsideClick' | 'allowEscapeKey' | 'showConfirmButton' | 'didOpen'>;
export type SweetAlertToastOptions = Omit<SweetAlertOptions, 'input' | 'inputValidator' | 'toast' | 'timerProgressBar'>;

// Toastr types

export type ToastrPosition =
    | 'toast-top-right'
    | 'toast-bottom-right'
    | 'toast-bottom-left'
    | 'toast-top-left'
    | 'toast-top-center'
    | 'toast-bottom-center'
    | 'toast-top-full-width'
    | 'toast-bottom-full-width';

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
