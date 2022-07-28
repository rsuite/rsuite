const files = [
  {
    name: 'grid.less',
    import: true,
    content: `.show-col {
  background: #3498ff;
  color: #fff;
  padding: 10px;
}

.show-grid {
  [class*='rs-col-'] {
    padding: 10px 5px;
    color: #fff;
    background-color: #3498ff;
    text-align: center;
    margin-top: 6px;
    margin-bottom: 6px;
    [class*='rs-col-'] {
      background-color: #1675e0;

      [class*='rs-col-'] {
        background-color: #004299;

        &:nth-child(even) {
          opacity: 0.9;
        }
      }
    }

    [class*='rs-col-']:nth-child(2n) {
      opacity: 0.9;
    }
  }

  [class*='rs-col-']:nth-child(2n) {
    opacity: 0.8;
  }
}

// Flex grid box
.show-grid {
  .rs-flex-box-grid {
    &-item {
      margin-top: 6px;
      margin-bottom: 6px;
      padding: 10px 5px;
      color: #fff;
      text-align: center;
      background-color: #3498ff;
    }

    &-item:nth-child(2n) {
      opacity: 0.8;
    }
  }
}
`
  }
];

export default files;
