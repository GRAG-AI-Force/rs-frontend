import React from 'react';
import { PrimaryButton } from '../../src/components/buttons/PrimaryButton';

describe('PrimaryButton Component', () => {
  it('instantiates correctly with title prop', () => {
    const onPressMock = jest.fn();
    const btn = React.createElement(PrimaryButton, {
      title: 'Submit Telemetry',
      onPress: onPressMock,
    });
    expect(btn.props.title).toBe('Submit Telemetry');
  });

  it('handles loading state prop', () => {
    const btn = React.createElement(PrimaryButton, {
      title: 'Loading',
      onPress: jest.fn(),
      loading: true,
    });
    expect(btn.props.loading).toBe(true);
  });
});
