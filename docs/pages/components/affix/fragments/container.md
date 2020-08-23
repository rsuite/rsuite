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
