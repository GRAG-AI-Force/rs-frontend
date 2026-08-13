/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');

function createComponent(name) {
  return function MockComponent(props) {
    return React.createElement(name, props, props.children);
  };
}

module.exports = {
  View: createComponent('View'),
  Text: createComponent('Text'),
  TouchableOpacity: createComponent('TouchableOpacity'),
  TouchableWithoutFeedback: createComponent('TouchableWithoutFeedback'),
  ScrollView: createComponent('ScrollView'),
  FlatList: createComponent('FlatList'),
  TextInput: createComponent('TextInput'),
  ActivityIndicator: createComponent('ActivityIndicator'),
  Image: createComponent('Image'),
  Modal: createComponent('Modal'),
  Switch: createComponent('Switch'),
  StatusBar: createComponent('StatusBar'),
  KeyboardAvoidingView: createComponent('KeyboardAvoidingView'),
  RefreshControl: createComponent('RefreshControl'),
  StyleSheet: {
    create: styles => styles,
  },
  Platform: {
    OS: 'android',
    select: obj => obj.android || obj.default,
  },
  Dimensions: {
    get: () => ({ width: 375, height: 812, scale: 2, fontScale: 1 }),
    addEventListener: () => ({ remove: () => {} }),
  },
  useWindowDimensions: () => ({ width: 375, height: 812 }),
  AppRegistry: {
    registerComponent: () => {},
  },
};
