# Uploader 上传文件

`<Uploader>`

## 获取组件

<!--{include:(components/uploader/fragments/import.md)}-->

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

## Props

### `<Uploader>`

| 属性名称           | 类型 `(默认值)`                                                  | 描述                                                                          |
| ------------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| accept             | string                                                           | 接受上传的文件类型                                                            |
| action \*          | string                                                           | 文件上传地址, 必选                                                            |
| autoUpload         | boolean `(true)`                                                 | 选择文件后自动上传                                                            |
| classPrefix        | string `('uploader')`                                            | 组件 CSS 类的前缀                                                             |
| data               | object                                                           | 上传所带的参数                                                                |
| defaultFileList    | FileType[]                                                       | 已经上传的文件列表                                                            |
| disabled           | boolean                                                          | 禁用                                                                          |
| disabledFileItem   | boolean                                                          | 禁用文件列表                                                                  |
| draggable          | boolean                                                          | 允许拖拽上传                                                                  |
| fileList           | FileType[]                                                       | 已经上传的文件列表 （受控）                                                   |
| fileListVisible    | boolean`(true)`                                                  | 显示文件列表                                                                  |
| headers            | object                                                           | 设置上传的请求头部                                                            |
| listType           | menu: 'text' , 'picture-text' , 'picture' `('text')`             | 上传列表的样式                                                                |
| maxPreviewFileSize | number `(5242880)`                                               | 设置预览文件最大限制                                                          |
| multiple           | boolean                                                          | 允许一次选择多个文件上传                                                      |
| name               | string `('file')`                                                | 上传对应文件的参数名                                                          |
| onChange           | (fileList: FileType[]) => void                                   | 上传队列发生改变的回调函数                                                    |
| onError            | (reason: Object, file: FileType) => void                         | 上传出现错误的回调函数                                                        |
| onPreview          | (file: FileType, event) => void                                  | 在文件列表中，点击已上传的文件的回调函数                                      |
| onProgress         | (percent: number, file: FileType) => void                        | 上传进度发生变化的回调函数                                                    |
| onRemove           | (file: FileType) => void                                         | 在文件列表中，点击删除一个文件的回调函数                                      |
| onReupload         | (file: FileType) => void                                         | 在文件列表中，对上传失败的文件，点击重新上传的回调函数                        |
| onSuccess          | (response: Object, file: FileType) => void                       | 上传成功后的回调函数                                                          |
| onUpload           | (file: FileType) => void                                         | 上传文件开始的回调函数                                                        |
| removable          | boolean `(true)`                                                 | 允许删除上传列表中的文件                                                      |
| renderFileInfo     | (file: FileType, fileElement: ReactNode) => ReactNode            | 自定义渲染文件信息                                                            |
| shouldQueueUpdate  | (fileList: FileType[], newFile: FileType[], FileType) => boolean | 允许更新队列。在选择文件后，更新上传文件队列前的校验函数，返回 false 则不更新 |
| shouldUpload       | (file: FileType) => boolean                                      | 允许上传文件。在文件上传前的的校验函数，返回 false 则不上传                   |
| timeout            | number                                                           | 设置上传超时                                                                  |
| toggleAs           | ElementType `('button')`                                         | 为组件自定义元素类型                                                          |
| withCredentials    | boolean                                                          | 上传请求时是否携带 cookie                                                     |
