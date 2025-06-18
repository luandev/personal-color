import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text } from 'react-native';
import { ThemedView } from '../components/ThemedView';

const meta = {
  title: 'DesignSystem/ThemedView',
  component: ThemedView,
  tags: ['autodocs'],
} satisfies Meta<typeof ThemedView>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <ThemedView {...args} style={[{ padding: 16 }, args.style]}>
      <Text>Content goes here</Text>
    </ThemedView>
  ),
};
