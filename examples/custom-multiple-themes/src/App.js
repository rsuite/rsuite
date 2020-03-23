import React from 'react';
import {
  FlexboxGrid,
  ButtonToolbar,
  Button,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Toggle,
  Slider,
  Input,
  Panel,
  Dropdown
} from 'rsuite';

const styles = {
  marginTop: {
    marginTop: 20
  }
};

class App extends React.Component {
  static LoadCssFile = (href, theme) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.theme = theme;
    document.head.appendChild(link);
    return link;
  };
  constructor(props) {
    super(props);
    this.state = {
      themes: process.env.themes,
      currentLink: null
    };
  }

  remove = el => el && el.parentNode.removeChild(el);

  changeTheme = theme => {
    if (theme === 'default') {
      this.resetTheme();
      return;
    }
    const { currentLink } = this.state;
    if (theme === (currentLink && currentLink.dataset.theme)) {
      return;
    }
    const link = App.LoadCssFile(`./theme-${theme}.css`, theme);
    link.onload = () => {
      this.removeTheme();
      this.setState({
        currentLink: link
      });
    };
  };

  removeTheme = () => {
    const { currentLink } = this.state;
    this.remove(currentLink);
  };

  resetTheme = () => {
    this.removeTheme();
    this.setState({
      currentLink: null
    });
  };

  render() {
    const { themes } = this.state;
    return (
      <FlexboxGrid justify="center" style={styles.marginTop}>
        <FlexboxGrid.Item colspan={10}>
          <Dropdown title="Change Theme Color" onSelect={this.changeTheme}>
            {themes.map(theme => (
              <Dropdown.Item key={theme} eventKey={theme}>
                {theme}
              </Dropdown.Item>
            ))}
          </Dropdown>
          <hr />
          <Panel header={<h3>Preview</h3>} bordered>
            <ButtonToolbar>
              <Button appearance="default">Default</Button>
              <Button appearance="primary">Primary</Button>
              <Button appearance="link">Link</Button>
              <Button appearance="ghost">Ghost</Button>
            </ButtonToolbar>
            <hr />
            <CheckboxGroup name="check" defaultValue={['1', '2']} inline>
              <Checkbox value="1">Javascript</Checkbox>
              <Checkbox value="2">CSS</Checkbox>
              <Checkbox value="3">HTML</Checkbox>
            </CheckboxGroup>
            <hr />
            <RadioGroup name="radio" defaultValue="1" inline>
              <Radio value="1">Front End</Radio>
              <Radio value="2">Back End </Radio>
            </RadioGroup>
            <hr />
            <Input />
            <hr />
            <Toggle defaultChecked />
            <hr />
            <Slider progress defaultValue={50} />
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  }
}

export default App;
