# Uploader

Upload files by clicking or drag-and-drop, it supports previewing the uploaded image.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Picture

<!--{include:`picture.md`}-->

### Picture & text

<!--{include:`picture-text.md`}-->

### Avatar

<!--{include:`avatar.md`}-->

### Drag and drop

<!--{include:`drag-and-drop.md`}-->

### Initial file list

<!--{include:`file-list.md`}-->

### Custom file description

<!--{include:`file-list-custom.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Manually

<!--{include:`manually.md`}-->

### Controlled

<!--{include:`controlled.md`}-->

### File check

<!--{include:`check.md`}-->

## Props

### `<Uploader>`

Extends the props of the [Button](/components/button/) component.

| Property           | Type `(Default)`                                                                                                             | Description                                                                                                                                                                      |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept             | string                                                                                                                       | File types that can be accepted. See [HTML attribute: accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) Attribute                                     |
| action \*          | string                                                                                                                       | Uploading URL                                                                                                                                                                    |
| autoUpload         | boolean `(true)`                                                                                                             | Automatically upload files after selecting them                                                                                                                                  |
| classPrefix        | string `('uploader')`                                                                                                        | The prefix of the component CSS class                                                                                                                                            |
| data               | Object                                                                                                                       | Upload the parameters with                                                                                                                                                       |
| defaultFileList    | [FileType][file][]                                                                                                           | List of uploaded files                                                                                                                                                           |
| disableMultipart   | boolean                                                                                                                      | If 'true', disable using a multipart form for file upload and instead stream the file. Some APIs (e.g. Amazon S3) may expect the file to be streamed rather than sent via a form |
| disabled           | boolean                                                                                                                      | Disabled upload button                                                                                                                                                           |
| disabledFileItem   | boolean                                                                                                                      | Disabled the file list                                                                                                                                                           |
| draggable          | boolean                                                                                                                      | Enabled drag and drop to upload.                                                                                                                                                 |
| fileList           | [FileType][file][]                                                                                                           | List of uploaded files （Controlled）                                                                                                                                            |
| fileListVisible    | boolean`(true)`                                                                                                              | The file list is visible                                                                                                                                                         |
| headers            | Object                                                                                                                       | Set Upload request Header                                                                                                                                                        |
| listType           | menu: 'text' , 'picture-text' , 'picture' `('text')`                                                                         | Upload list Style                                                                                                                                                                |
| locale             | [UploaderLocaleType](/guide/i18n/#uploader)                                                                                  | Define localization settings to show component text in the user's regional language                                                                                              |
| maxPreviewFileSize | number `(5242880)`                                                                                                           | Set the maximum limit for preview files                                                                                                                                          |
| method             | string `('POST')`                                                                                                            | The http method of upload request                                                                                                                                                |
| multiple           | boolean                                                                                                                      | Allow multiple file uploads to be selected at a time                                                                                                                             |
| name               | string `('file')`                                                                                                            | Upload the parameter name of the corresponding file                                                                                                                              |
| onChange           | (fileList: [FileType][file][], , event: ChangeEvent \| MouseEvent) => void                                                   | callback function that the upload queue has changed                                                                                                                              |
| onError            | (reason: object, file: [FileType][file]) => void                                                                             | Upload callback function with error                                                                                                                                              |
| onPreview          | (file: [FileType][file], event) => void                                                                                      | In the file list, click the callback function for the uploaded file                                                                                                              |
| onProgress         | (percent: number, file: [FileType][file]) => void                                                                            | Callback functions that upload progress changes                                                                                                                                  |
| onRemove           | (file: [FileType][file]) => void                                                                                             | In the file list, click the callback function to delete a file                                                                                                                   |
| onReupload         | (file: [FileType][file]) => void                                                                                             | In the file list, for uploading failed files, click the callback function to upload                                                                                              |
| onSuccess          | (response: object, file: [FileType][file]) => void                                                                           | callback function after successful upload                                                                                                                                        |
| onUpload           | (file: [FileType][file]) => void                                                                                             | The callback function that starts the upload file                                                                                                                                |
| removable          | boolean `(true)`                                                                                                             | Removable list file                                                                                                                                                              |
| renderFileInfo     | (file: [FileType][file], fileElement: ReactNode) => ReactNode                                                                | Custom render file information                                                                                                                                                   |
| renderThumbnail    | (file: [FileType][file], thumbnail: ReactNode) => ReactNode                                                                  | Custom render thumbnail                                                                                                                                                          |
| shouldQueueUpdate  | (fileList: [FileType][file][], newFile: [FileType][file][] &#124; [FileType][file]) => boolean &#124; Promise&lt;boolean&gt; | Allow the queue to be updated. After you select a file, update the checksum function before the upload file queue, and return false to not update                                |
| shouldUpload       | (file:[FileType][file] ) => boolean &#124; Promise&lt;boolean&gt;                                                            | Allow uploading of files. Check function before file upload, return false without uploading                                                                                      |
| timeout            | number                                                                                                                       | Set upload timeout                                                                                                                                                               |
| toggleAs           | ElementType ([Button](/components/button/))                                                                                  | You can use a custom element for this component                                                                                                                                  |
| withCredentials    | boolean                                                                                                                      | Whether to carry cookies when uploading requests                                                                                                                                 |

<!--{include:(_common/types/file-type.md)}-->

[file]: #code-ts-file-type-code
