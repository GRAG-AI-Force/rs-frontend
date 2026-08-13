/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');

function createNavigator() {
  return {
    Navigator: function Navigator(props) {
      return React.createElement('StackNavigator', props, props.children);
    },
    Screen: function Screen(props) {
      return React.createElement('Screen', props, null);
    },
  };
}

module.exports = {
  createNativeStackNavigator: createNavigator,
};
