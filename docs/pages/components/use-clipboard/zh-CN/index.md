# useClipboard

复制文本并获取成功或失败状态。可搭配 Button、IconButton 或自定义控件，用于复制业务 ID、链接及配置值。

## 导入

<!--{include:<import-guide>}-->

## 示例

### 复制文本

只有在剪贴板写入成功后，才会显示成功状态。保持状态区域挂载，让辅助技术能够播报复制结果。

<!--{include:`basic.md`}-->

### 反馈时长

通过 `timeout` 设置复制成功后 `copied` 保持为 true 的时长，默认 2000 毫秒。设为 `0` 时，成功状态会持续到下一次复制或调用 `reset()`。

```tsx
const { copied, error, copy, reset } = useClipboard({ timeout: 5000 });
```

## 浏览器支持

复制使用 [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)，需要 HTTPS 或 localhost 等安全上下文，浏览器也可能要求用户主动触发操作。请在点击或键盘操作中调用 `copy()`。

当 API 不可用或浏览器拒绝写入时，`copy()` 返回的 Promise 会解析为 `false`，`copied` 保持为 false，`error` 包含失败信息。服务端渲染不会访问浏览器 API，初始状态为 `copied: false` 和 `error: null`。无需 CustomProvider 或样式文件。

## API

### `useClipboard(options?)`

```ts
interface UseClipboardOptions {
  timeout?: number;
}

interface UseClipboardReturn {
  copied: boolean;
  error: Error | null;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}
```

| 选项    | 类型   | 默认值 | 描述                                             |
| ------- | ------ | ------ | ------------------------------------------------ |
| timeout | number | 2000   | 成功反馈的持续时长，单位为毫秒；`0` 禁用自动重置 |

| 返回值     | 描述                                                                 |
| ---------- | -------------------------------------------------------------------- |
| copied     | 最近一次复制请求是否成功；开始新的请求时重置                         |
| error      | 最近一次请求的失败信息，或 `null`；开始新请求或调用 `reset()` 时清除 |
| copy(text) | 写入文本，支持空字符串；Promise 解析为本次写入是否成功               |
| reset()    | 清除反馈并忽略尚未完成的请求结果；不会修改系统剪贴板内容             |

请求重叠时，只有最近发起的请求会更新反馈状态，每次 `copy()` 的 Promise 仍返回各自的写入结果。卸载时会清理反馈定时器。该 Hook 无法取消浏览器已经开始的剪贴板写入。
