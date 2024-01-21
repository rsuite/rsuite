import React from 'react';
import { Accordion, Button, ButtonGroup, Placeholder, Stack, Avatar } from 'rsuite';
import DefaultPage from '@/components/Page';
import { FaAngleDoubleDown, FaArrowAltCircleDown, FaArrowDown } from 'react-icons/fa';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Button,
        ButtonGroup,
        Accordion,
        Placeholder,
        Stack,
        Avatar,
        FaAngleDoubleDown,
        FaArrowAltCircleDown,
        FaArrowDown
      }}
    />
  );
}
