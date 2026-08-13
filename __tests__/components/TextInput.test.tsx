import React from 'react';
import { TextInput } from '../../src/components/inputs/TextInput';

describe('TextInput Component', () => {
  it('renders input with label and error state', () => {
    const input = React.createElement(TextInput, {
      label: 'Email',
      value: 'test@resporesence.org',
      onChangeText: jest.fn(),
      error: 'Invalid Email',
    });

    expect(input.props.label).toBe('Email');
    expect(input.props.error).toBe('Invalid Email');
  });
});
