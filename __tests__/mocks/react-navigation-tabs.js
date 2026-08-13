/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');

function createTabNavigator() {
  return {
    Navigator: function Navigator(props) {
      return React.createElement('TabNavigator', props, props.children);
    },
    Screen: function Screen(props) {
      return React.createElement('Screen', props, null);
    },
  };
}

module.exports = {
  createBottomTabNavigator: createTabNavigator,
};
