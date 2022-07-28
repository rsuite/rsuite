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

.show-fake-browser {
  border: 1px solid #e5e5ea;
  box-shadow: 0 0.1em 0.5em 0 rgba(0, 0, 0, 0.28);
  border-radius: 4px;
  background-color: #f7f7fa;

  &.sidebar-page {
    .rs-sidebar {
      height: 700px;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12), 0 0 10px rgba(0, 0, 0, 0.06);
    }
    .rs-sidenav {
      flex: 1 1 auto;
      width: 100%;

      &-collapse-in {
        overflow-y: auto;
      }
    }
    .rs-header {
      padding: 0 20px;
    }

    .rs-content {
      padding: 20px;
      margin: 20px;
      background-color: #f7f7fa;
    }
    .nav-toggle {
      border-top: 1px solid #e5e5ea;
    }
  }
  &.navbar-page {
    .rs-content {
      padding: 20px;
      margin: 20px;
      height: 500px;
      background-color: #f7f7fa;
    }
    .rs-footer {
      padding: 20px;
    }
  }
  &.login-page {
    .rs-content {
      padding: 20px;
      margin: 20px;
      height: 500px;
    }
    .rs-footer {
      padding: 20px;
    }
    .rs-panel {
      background: #fff;
      margin-top: 70px;
    }
  }
}    
`
  }
];

export default files;
