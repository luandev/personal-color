import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ThemedText } from '../components/ThemedText';

const meta = {
  title: 'DesignSystem/ThemedText',
  component: ThemedText,
  args: {
    children: 'Sample text',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemedText>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Title: Story = {
  args: { type: 'title', children: 'Title text' },
};
