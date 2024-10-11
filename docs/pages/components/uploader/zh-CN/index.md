# Uploader 上传文件

通过点击或者拖拽上传文件的组件，对上传图片支持预览。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 图片

<!--{include:`picture.md`}-->

### 图片加文本

<!--{include:`picture-text.md`}-->

### 头像

<!--{include:`avatar.md`}-->

### 拖拽上传

<!--{include:`drag-and-drop.md`}-->

### 初始文件列表

<!--{include:`file-list.md`}-->

### 自定义文件描述

<!--{include:`file-list-custom.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 手动上传

<!--{include:`manually.md`}-->

### 受控的

<!--{include:`controlled.md`}-->

### 文件检查校验

<!--{include:`check.md`}-->

## Props

### `<Uploader>`

继承 [Button](/zh/components/button/) 组件的 Props。

| 属性名称           | 类型 `(默认值)`                                                                                                              | 描述                                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| accept             | string                                                                                                                       | 接受上传的文件类型，详见：[HTML attribute: accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)       |
| action \*          | string                                                                                                                       | 文件上传地址, 必选                                                                                                            |
| autoUpload         | boolean `(true)`                                                                                                             | 选择文件后自动上传                                                                                                            |
| classPrefix        | string `('uploader')`                                                                                                        | 组件 CSS 类的前缀                                                                                                             |
| data               | object                                                                                                                       | 上传所带的参数                                                                                                                |
| defaultFileList    | [FileType][file][]                                                                                                           | 已经上传的文件列表                                                                                                            |
| disableMultipart   | boolean                                                                                                                      | 如果为 true 则禁用使用 FormData 进行文件上传，而是传输文件流。 某些 API（例如 Amazon S3）可能希望文件流传输而不是通过表单发送 |
| disabled           | boolean                                                                                                                      | 禁用                                                                                                                          |
| disabledFileItem   | boolean                                                                                                                      | 禁用文件列表                                                                                                                  |
| draggable          | boolean                                                                                                                      | 允许拖拽上传                                                                                                                  |
| fileList           | [FileType][file][]                                                                                                           | 已经上传的文件列表 （受控）                                                                                                   |
| fileListVisible    | boolean`(true)`                                                                                                              | 显示文件列表                                                                                                                  |
| headers            | object                                                                                                                       | 设置上传的请求头部                                                                                                            |
| listType           | menu: 'text' , 'picture-text' , 'picture' `('text')`                                                                         | 上传列表的样式                                                                                                                |
| locale             | [UploaderLocaleType](/zh/guide/i18n/#uploader)                                                                               | 定义本地化设置，使组件文本根据用户地区显示相应语言                                                                            |
| maxPreviewFileSize | number `(5242880)`                                                                                                           | 设置预览文件最大限制                                                                                                          |
| method             | string `('POST')`                                                                                                            | 上传请求的 http method                                                                                                        |
| multiple           | boolean                                                                                                                      | 允许一次选择多个文件上传                                                                                                      |
| name               | string `('file')`                                                                                                            | 上传对应文件的参数名                                                                                                          |
| onChange           | (fileList: [FileType][file][], event: ChangeEvent \| MouseEvent) => void                                                     | 上传队列发生改变的回调函数                                                                                                    |
| onError            | (reason: Object, file: [FileType][file]) => void                                                                             | 上传出现错误的回调函数                                                                                                        |
| onPreview          | (file: [FileType][file], event) => void                                                                                      | 在文件列表中，点击已上传的文件的回调函数                                                                                      |
| onProgress         | (percent: number, file: [FileType][file]) => void                                                                            | 上传进度发生变化的回调函数                                                                                                    |
| onRemove           | (file: [FileType][file]) => void                                                                                             | 在文件列表中，点击删除一个文件的回调函数                                                                                      |
| onReupload         | (file: [FileType][file]) => void                                                                                             | 在文件列表中，对上传失败的文件，点击重新上传的回调函数                                                                        |
| onSuccess          | (response: Object, file: [FileType][file]) => void                                                                           | 上传成功后的回调函数                                                                                                          |
| onUpload           | (file: [FileType][file]) => void                                                                                             | 上传文件开始的回调函数                                                                                                        |
| removable          | boolean `(true)`                                                                                                             | 允许删除上传列表中的文件                                                                                                      |
| renderFileInfo     | (file: [FileType][file], fileElement: ReactNode) => ReactNode                                                                | 自定义渲染文件信息                                                                                                            |
| renderThumbnail    | (file: [FileType][file], thumbnail: ReactNode) => ReactNode                                                                  | 自定义渲染缩略图                                                                                                              |
| shouldQueueUpdate  | (fileList: [FileType][file][], newFile: [FileType][file][] &#124; [FileType][file]) => boolean &#124; Promise&lt;boolean&gt; | 允许更新队列。在选择文件后，更新上传文件队列前的校验函数，返回 false 则不更新                                                 |
| shouldUpload       | (file: [FileType][file]) => boolean &#124; Promise&lt;boolean&gt;                                                            | 允许上传文件。在文件上传前的的校验函数，返回 false 则不上传                                                                   |
| timeout            | number                                                                                                                       | 设置上传超时                                                                                                                  |
| toggleAs           | ElementType ([Button](/zh/components/button/))                                                                               | 为组件自定义元素类型                                                                                                          |
| withCredentials    | boolean                                                                                                                      | 上传请求时是否携带 cookie                                                                                                     |

<!--{include:(_common/types/file-type.md)}-->

[file]: #code-ts-file-type-code
