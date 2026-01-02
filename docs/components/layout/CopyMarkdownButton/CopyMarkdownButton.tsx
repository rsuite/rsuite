import React from 'react';
import { Button, ButtonGroup, Menu, Popover, IconButton, Whisper } from 'rsuite';
import Link from '@/components/Link';
import { FaMarkdown, FaCheck } from 'react-icons/fa';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import { MdOpenInNew } from 'react-icons/md';
import { SiOpenai } from 'react-icons/si';
import { TbFileText } from 'react-icons/tb';
import useClipboard from '@/hooks/useClipboard';
import styles from './CopyMarkdownButton.module.scss';

interface CopyMarkdownButtonProps {
  category: string;
  pageName: string;
}

export default function CopyMarkdownButton({ category, pageName }: CopyMarkdownButtonProps) {
  const { copied, copyToClipboard } = useClipboard();

  if (!category || !pageName) return null;

  const handleCopyMarkdown = async () => {
    try {
      const response = await fetch(`/page-md/${category}/${pageName}.md`);
      if (!response.ok) {
        throw new Error('Failed to fetch markdown');
      }

      const markdown = await response.text();
      copyToClipboard(markdown);
    } catch (error) {
      console.error('Failed to copy markdown:', error);
    }
  };

  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = () => {
      onClose?.();
    };

    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Menu onSelect={handleSelect}>
          <Menu.Item
            eventKey="view"
            icon={<MdOpenInNew />}
            as="a"
            href={`/page-md/${category}/${pageName}.md`}
            target="_blank"
          >
            Open markdown file
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item eventKey="mcp" icon={<SiOpenai />} as={Link} href={`/guide/mcp-server`}>
            Use MCP Server
          </Menu.Item>
          <Menu.Item eventKey="llm" icon={<TbFileText />} as={Link} href="/guide/llms">
            Use LLMs.txt
          </Menu.Item>
        </Menu>
      </Popover>
    );
  };

  return (
    <div className={styles['copy-markdown-button']}>
      <ButtonGroup>
        <Button
          size="sm"
          startIcon={copied ? <FaCheck /> : <FaMarkdown />}
          onClick={handleCopyMarkdown}
        >
          Copy Page
        </Button>
        <Whisper placement="bottomEnd" trigger="click" speaker={renderMenu}>
          <IconButton size="sm" icon={<ArrowDownIcon />} />
        </Whisper>
      </ButtonGroup>
    </div>
  );
}
