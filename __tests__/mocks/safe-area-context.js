/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');

module.exports = {
  SafeAreaProvider: function SafeAreaProvider(props) {
    return React.createElement('SafeAreaProvider', props, props.children);
  },
  SafeAreaView: function SafeAreaView(props) {
    return React.createElement('SafeAreaView', props, props.children);
  },
  useSafeAreaInsets: () => ({ top: 20, bottom: 0, left: 0, right: 0 }),
};
