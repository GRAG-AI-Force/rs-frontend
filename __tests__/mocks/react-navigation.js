/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');

module.exports = {
  NavigationContainer: function NavigationContainer(props) {
    return React.createElement('NavigationContainer', props, props.children);
  },
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
};
