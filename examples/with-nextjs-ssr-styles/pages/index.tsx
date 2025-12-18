import React from 'react';
import { Button, Panel, Stack, Heading, Text, Divider, Badge, Tag } from 'rsuite';
import Box from 'rsuite/Box';

export default function Home() {
  return (
    <Box
      minHeight="100vh"
      backgroundColor="#f5f5f5"
      padding={{ xs: '20px', md: '40px' }}
    >
      <Box
        maxWidth="1200px"
        margin="0 auto"
        backgroundColor="white"
        padding={{ xs: '20px', md: '40px' }}
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.1)"
      >
        <Stack direction="column" spacing={40}>
          {/* Header Section */}
          <Box textAlign="center">
            <Heading level={1}>RSuite SSR Styles Example</Heading>
            <Text muted size="lg" style={{ marginTop: 10 }}>
              Next.js Pages Router with Server-Side Rendering
            </Text>
            <Stack
              justifyContent="center"
              spacing={10}
              style={{ marginTop: 20 }}
              wrap
            >
              <Badge content="SSR Ready" color="green" />
              <Badge content="Zero FOUC" color="blue" />
              <Badge content="CSS-in-JS" color="violet" />
            </Stack>
          </Box>

          <Divider />

          {/* Feature Overview */}
          <Panel header="✨ Features" bordered>
            <Stack direction="column" spacing={15}>
              <Box display="flex" alignItems="center" gap="10px">
                <Tag color="green">✓</Tag>
                <Text>Server-side style collection and injection</Text>
              </Box>
              <Box display="flex" alignItems="center" gap="10px">
                <Tag color="green">✓</Tag>
                <Text>No Flash of Unstyled Content (FOUC)</Text>
              </Box>
              <Box display="flex" alignItems="center" gap="10px">
                <Tag color="green">✓</Tag>
                <Text>Dynamic CSS-in-JS with scoped variables</Text>
              </Box>
              <Box display="flex" alignItems="center" gap="10px">
                <Tag color="green">✓</Tag>
                <Text>Responsive design with breakpoint support</Text>
              </Box>
            </Stack>
          </Panel>

          {/* Standard Components */}
          <Panel header="🎨 Standard RSuite Components" bordered>
            <Text muted style={{ marginBottom: 15 }}>
              These components use RSuite&apos;s built-in styling system.
            </Text>
            <Stack spacing={10} wrap>
              <Button appearance="primary">Primary</Button>
              <Button appearance="ghost">Ghost</Button>
              <Button appearance="link">Link</Button>
              <Button appearance="subtle">Subtle</Button>
              <Button color="red" appearance="primary">
                Danger
              </Button>
              <Button color="green" appearance="primary">
                Success
              </Button>
            </Stack>
          </Panel>

          {/* Box Component Examples */}
          <Panel header="📦 Box Component with SSR Styles" bordered>
            <Text muted style={{ marginBottom: 20 }}>
              The Box components below use dynamic CSS-in-JS styles that are collected
              during SSR and injected into the HTML <code>&lt;head&gt;</code>.
            </Text>

            <Stack direction="column" spacing={20}>
              {/* Example 1: Basic Box */}
              <Box>
                <Text weight="semibold" size="md" style={{ marginBottom: 10 }}>
                  1. Basic Styled Box
                </Text>
                <Box
                  width="100%"
                  padding="20px"
                  backgroundColor="#f0f0f0"
                  borderRadius="8px"
                >
                  <Text weight="bold">Fixed Width Box</Text>
                  <Text size="sm" muted>
                    Width: 100%, Padding: 20px, Background: #f0f0f0
                  </Text>
                </Box>
              </Box>

              {/* Example 2: Responsive Box */}
              <Box>
                <Text weight="semibold" size="md" style={{ marginBottom: 10 }}>
                  2. Responsive Box (Resize window to see changes)
                </Text>
                <Box
                  width={{ xs: '100%', md: '75%', lg: '50%' }}
                  padding="20px"
                  backgroundColor="#e3f2fd"
                  borderRadius="8px"
                >
                  <Text weight="bold">Responsive Width Box</Text>
                  <Text size="sm" muted>
                    Width: 100% (xs), 75% (md), 50% (lg)
                  </Text>
                </Box>
              </Box>

              {/* Example 3: Flex Layout */}
              <Box>
                <Text weight="semibold" size="md" style={{ marginBottom: 10 }}>
                  3. Flex Layout with Box
                </Text>
                <Box
                  display="flex"
                  gap="10px"
                  padding="10px"
                  backgroundColor="#fff3e0"
                  borderRadius="4px"
                >
                  <Box
                    flex="1"
                    padding="10px"
                    backgroundColor="#ffccbc"
                    textAlign="center"
                    borderRadius="4px"
                  >
                    Flex Item 1
                  </Box>
                  <Box
                    flex="1"
                    padding="10px"
                    backgroundColor="#ffab91"
                    textAlign="center"
                    borderRadius="4px"
                  >
                    Flex Item 2
                  </Box>
                  <Box
                    flex="1"
                    padding="10px"
                    backgroundColor="#ff8a65"
                    textAlign="center"
                    borderRadius="4px"
                  >
                    Flex Item 3
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Panel>

          {/* Verification Instructions */}
          <Panel header="✅ Verification Instructions" bordered>
            <Stack direction="column" spacing={10}>
              <Text>
                <strong>To verify SSR styles are working:</strong>
              </Text>
              <ol style={{ paddingLeft: 20 }}>
                <li>View page source (right-click → View Page Source)</li>
                <li>
                  Look for <code>&lt;style data-rs-style-manager&gt;</code> in the{' '}
                  <code>&lt;head&gt;</code>
                </li>
                <li>
                  Verify it contains CSS variables like <code>--rs-box-w</code>,{' '}
                  <code>--rs-box-p</code>, etc.
                </li>
                <li>
                  Check that Box components render with correct styles immediately (no
                  flash of unstyled content)
                </li>
              </ol>
            </Stack>
          </Panel>
        </Stack>
      </Box>
    </Box>
  );
}
