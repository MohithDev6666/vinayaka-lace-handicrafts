import { createTheme, type MantineColorsTuple } from '@mantine/core';

const vinayaka: MantineColorsTuple = [
  '#F4F8F7',
  '#E5EFED',
  '#C5DBD7',
  '#9BBFB8',
  '#6D9C94',
  '#45756D',
  '#24534E',
  '#173F3D',
  '#123330',
  '#0D2422',
];

export const theme = createTheme({
  primaryColor: 'vinayaka',
  primaryShade: 7,
  colors: { vinayaka },
  fontFamily: "'Inter', Arial, sans-serif",
  headings: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontWeight: '500',
  },
  defaultRadius: 'md',
  cursorType: 'pointer',
  white: '#FFFFFF',
});
