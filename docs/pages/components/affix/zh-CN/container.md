### 指定容器

容器在可视范围内才固定元素，当滚动页面容器不在可视范围则取消固定元素。

<!--start-code-->

```js
const containerRef = React.createRef();
const instance = (
  <div>
    <div ref={containerRef} style={{ background: 'black' }}>
      <Paragraph rows={6} />
      <Affix
        top={0}
        container={() => {
          return containerRef.current;
        }}
      >
        <Button appearance="primary" style={{ marginLeft: 100 }}>
          Top 0
        </Button>
      </Affix>
      <Paragraph rows={6} />
    </div>
    <Paragraph rows={20} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
