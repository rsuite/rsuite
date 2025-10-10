export interface ErrorStatus {
    type: 'timeout' | 'server_error' | 'xhr_error';
    response?: any;
}
interface Options {
    name: string;
    timeout?: number;
    data?: any;
    withCredentials?: boolean;
    disableMultipart?: boolean;
    headers?: any;
    file: File;
    url: string;
    method?: string;
    onError?: (status: ErrorStatus, event: ProgressEvent, xhr: XMLHttpRequest) => void;
    onSuccess?: (response: any, event: ProgressEvent, xhr: XMLHttpRequest) => void;
    onProgress?: (percent: number, event: ProgressEvent, xhr: XMLHttpRequest) => void;
}
export default function ajaxUpload(options: Options): {
    xhr: XMLHttpRequest;
    data: File | FormData;
};
export {};
