import React, { useState } from 'react';
import { Link } from 'gatsby';
import {
  Panel,
  Button,
  ButtonToolbar,
  Stack,
  Heading,
  Text,
  Input,
  InputGroup,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Toggle,
  Slider,
  DatePicker,
  SelectPicker,
  Message,
  toaster,
  Badge,
  Tag,
  TagGroup,
  Avatar,
  AvatarGroup,
  Divider,
} from 'rsuite';
import { FaHome, FaUser, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';
import 'rsuite/dist/rsuite.min.css';

import Layout from '../components/layout';
import SEO from '../components/seo';

const ComponentsDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [toggleValue, setToggleValue] = useState(true);
  const [sliderValue, setSliderValue] = useState(50);
  const [selectValue, setSelectValue] = useState('react');
  const [checkboxValue, setCheckboxValue] = useState(['design']);

  const frameworkData = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ];

  const handleNotify = (type) => {
    toaster.push(
      <Message showIcon type={type} closable>
        <strong>{type.charAt(0).toUpperCase() + type.slice(1)}!</strong> This is a {type}{' '}
        message.
      </Message>,
      { placement: 'topEnd' }
    );
  };

  return (
    <Layout>
      <SEO title="Components Demo" />
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Stack direction="column" spacing={24}>
          {/* Header */}
          <Panel
            bordered
            shaded
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Heading level={1} style={{ color: 'white', margin: 0 }}>
              🎨 React Suite Components Demo
            </Heading>
            <Text size="lg" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Explore the rich collection of UI components
            </Text>
          </Panel>

          {/* Form Components */}
          <Panel bordered header={<Heading level={3}>📝 Form Components</Heading>}>
            <Stack direction="column" spacing={16}>
              <div>
                <Text weight="semibold">Input with Icons</Text>
                <InputGroup style={{ marginTop: 8 }}>
                  <InputGroup.Addon>
                    <FaUser />
                  </InputGroup.Addon>
                  <Input placeholder="Username" />
                </InputGroup>
              </div>

              <div>
                <Text weight="semibold">Search Input</Text>
                <InputGroup inside style={{ marginTop: 8 }}>
                  <Input
                    placeholder="Search..."
                    value={inputValue}
                    onChange={setInputValue}
                  />
                  <InputGroup.Button>
                    <FaSearch />
                  </InputGroup.Button>
                </InputGroup>
              </div>

              <div>
                <Text weight="semibold">Select Picker</Text>
                <SelectPicker
                  data={frameworkData}
                  value={selectValue}
                  onChange={setSelectValue}
                  style={{ width: 224, marginTop: 8 }}
                  placeholder="Select framework"
                />
              </div>

              <div>
                <Text weight="semibold">Date Picker</Text>
                <DatePicker
                  oneTap
                  style={{ width: 224, marginTop: 8 }}
                  placeholder="Select date"
                />
              </div>
            </Stack>
          </Panel>

          {/* Interactive Components */}
          <Panel bordered header={<Heading level={3}>🎛️ Interactive Components</Heading>}>
            <Stack direction="column" spacing={16}>
              <div>
                <Text weight="semibold">Toggle Switch</Text>
                <div style={{ marginTop: 8 }}>
                  <Toggle
                    size="lg"
                    checked={toggleValue}
                    onChange={setToggleValue}
                    checkedChildren={<FaCheck />}
                    unCheckedChildren={<FaTimes />}
                  />
                  <Text muted style={{ marginLeft: 12 }}>
                    Status: {toggleValue ? 'On' : 'Off'}
                  </Text>
                </div>
              </div>

              <div>
                <Text weight="semibold">Slider</Text>
                <div style={{ marginTop: 8 }}>
                  <Slider
                    value={sliderValue}
                    onChange={setSliderValue}
                    graduated
                    progress
                    renderMark={(mark) => {
                      if (mark === 0) return '0%';
                      if (mark === 50) return '50%';
                      if (mark === 100) return '100%';
                      return null;
                    }}
                  />
                  <Text muted>Value: {sliderValue}</Text>
                </div>
              </div>

              <div>
                <Text weight="semibold">Checkbox Group</Text>
                <CheckboxGroup
                  name="checkboxList"
                  value={checkboxValue}
                  onChange={setCheckboxValue}
                  inline
                  style={{ marginTop: 8 }}
                >
                  <Checkbox value="design">Design</Checkbox>
                  <Checkbox value="code">Code</Checkbox>
                  <Checkbox value="test">Test</Checkbox>
                </CheckboxGroup>
              </div>

              <div>
                <Text weight="semibold">Radio Group</Text>
                <RadioGroup name="radioList" inline defaultValue="A" style={{ marginTop: 8 }}>
                  <Radio value="A">Option A</Radio>
                  <Radio value="B">Option B</Radio>
                  <Radio value="C">Option C</Radio>
                </RadioGroup>
              </div>
            </Stack>
          </Panel>

          {/* Display Components */}
          <Panel bordered header={<Heading level={3}>🎯 Display Components</Heading>}>
            <Stack direction="column" spacing={16}>
              <div>
                <Text weight="semibold">Badges</Text>
                <Stack spacing={12} style={{ marginTop: 8 }}>
                  <Badge content="New" color="red" />
                  <Badge content="Hot" color="orange" />
                  <Badge content={99} color="blue" />
                  <Badge content="Sale" color="green" />
                </Stack>
              </div>

              <div>
                <Text weight="semibold">Tags</Text>
                <TagGroup style={{ marginTop: 8 }}>
                  <Tag color="red">React</Tag>
                  <Tag color="blue">Gatsby</Tag>
                  <Tag color="green">React Suite</Tag>
                  <Tag color="violet">TypeScript</Tag>
                </TagGroup>
              </div>

              <div>
                <Text weight="semibold">Avatars</Text>
                <AvatarGroup spacing={6} style={{ marginTop: 8 }}>
                  <Avatar circle style={{ background: '#667eea' }}>
                    A
                  </Avatar>
                  <Avatar circle style={{ background: '#764ba2' }}>
                    B
                  </Avatar>
                  <Avatar circle style={{ background: '#f093fb' }}>
                    C
                  </Avatar>
                  <Avatar circle style={{ background: '#4facfe' }}>
                    D
                  </Avatar>
                </AvatarGroup>
              </div>
            </Stack>
          </Panel>

          {/* Buttons & Messages */}
          <Panel bordered header={<Heading level={3}>🔔 Buttons & Notifications</Heading>}>
            <Stack direction="column" spacing={16}>
              <div>
                <Text weight="semibold">Button Variants</Text>
                <ButtonToolbar style={{ marginTop: 8 }}>
                  <Button appearance="primary">Primary</Button>
                  <Button appearance="default">Default</Button>
                  <Button appearance="subtle">Subtle</Button>
                  <Button appearance="ghost">Ghost</Button>
                  <Button appearance="link">Link</Button>
                </ButtonToolbar>
              </div>

              <div>
                <Text weight="semibold">Notification Messages</Text>
                <ButtonToolbar style={{ marginTop: 8 }}>
                  <Button appearance="primary" onClick={() => handleNotify('success')}>
                    Success
                  </Button>
                  <Button color="orange" appearance="primary" onClick={() => handleNotify('warning')}>
                    Warning
                  </Button>
                  <Button color="red" appearance="primary" onClick={() => handleNotify('error')}>
                    Error
                  </Button>
                  <Button color="blue" appearance="primary" onClick={() => handleNotify('info')}>
                    Info
                  </Button>
                </ButtonToolbar>
              </div>
            </Stack>
          </Panel>

          <Divider />

          {/* Navigation */}
          <Panel bordered>
            <Stack spacing={12} justifyContent="center">
              <Button appearance="primary" startIcon={<FaHome />} as={Link} to="/">
                Back to Home
              </Button>
              <Button
                appearance="ghost"
                href="https://rsuitejs.com/components/overview/"
                target="_blank"
              >
                View All Components
              </Button>
            </Stack>
          </Panel>
        </Stack>
      </div>
    </Layout>
  );
};

export default ComponentsDemo;
