const files = [
  {
    name: 'container.less',
    import: true,
    content: `.show-container {
  > .rs-container {
    margin-bottom: 40px;
  }

  .rs-header,
  .rs-content,
  .rs-footer,
  .rs-sidebar {
    background-color: #3498ff;
    color: #fff;
    text-align: center;
  }

  .rs-header,
  .rs-footer {
    line-height: 56px;
    background-color: #59AFFF;
  }
  .rs-content {
    line-height: 120px;
    background-color: #80DDFF;
  }
  .rs-sidebar {
    line-height: 120px;
  }
}

.fake-browser {
  .rs-content,
  .rs-footer {
    padding: 20px;
  }

  &.sidebar-page {
    background: var(--rs-bg-well);

    .page-brand {
      padding: 10px 15px;
      font-size: 20px;
      color: #fff;
      background: #000;

      .rs-text {
        color: #fff;
      }
    }

    .page-header {
      padding: 20px 20px 0 20px;
    }

    .rs-sidebar {
      height: 100%;
      background: var(--rs-body);
    }
    .rs-sidenav {
      flex: 1 1 auto;
      width: 100%;
    }

    .rs-content {
      padding: 0 20px;
    }

    .nav-toggle {
      border-top: 1px solid var(--rs-border-primary);
      padding: 6px;
    }
  }
}
`
  }
];

export default files;
