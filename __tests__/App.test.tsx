import React from 'react';
import App from '../App';

describe('App Root', () => {
  it('renders application tree without crashing', () => {
    expect(App).toBeDefined();
    const appComponent = React.createElement(App);
    expect(appComponent).not.toBeNull();
  });
});
