import {Themes} from 'assets/themes';
import React from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
interface Props extends ViewProps {
  visible: boolean;
  color?: string;
}
const StyledOverlayLoading = (props: Props) => {
  const {color} = props;
  React.useEffect(() => {
    Keyboard.dismiss();
  }, [props.visible]);

  if (!props.visible) {
    return null;
  }

  const Spinner = () => {
    if (props.children) {
      return <View style={[styles.container]}>{props.children}</View>;
    }
    return (
      <View style={[styles.container]}>
        <View style={styles.background}>
          <View style={styles.circle}>
            <ActivityIndicator
              color={color || Themes.Light.COLORS.white}
              size={42}
              style={[styles.activityIndicator]}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Modal
      supportedOrientations={['portrait']}
      transparent
      visible={props.visible}>
      <Spinner />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000090',
  },
  background: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  textContent: {
    top: 80,
    height: 50,
    fontSize: 20,
    fontFamily: Themes.Fonts.bold,
  },
  activityIndicator: {
    flex: 1,
  },
});

export default React.memo(StyledOverlayLoading);
