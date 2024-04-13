import React, {useRef} from 'react';
import {
  Modal,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  K_BORDER_RADIUS_20,
  K_PADDING_12,
  K_PADDING_24,
  K_SIZE_3,
  K_SIZE_30,
} from '../../constants';
import {colors} from '../../constants/color';

const CustomModal = ({
  visible,
  onClose,
  children,
}: {
  visible?: boolean;
  onClose: () => void;
  children?: any;
}) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          onClose();
        }
      },
    }),
  ).current;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPress={onClose}>
        <View {...panResponder.panHandlers} style={styles.modalView}>
          <View style={styles.topLine} />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={K_SIZE_30} />
          </TouchableOpacity>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: K_BORDER_RADIUS_20,
    paddingHorizontal: K_PADDING_24,
    paddingTop: K_PADDING_12,
    elevation: 5,
    width: '100%',
  },
  closeButton: {
    alignItems: 'flex-end',
  },
  topLine: {
    backgroundColor: 'black',
    height: K_SIZE_3,
    width: '30%',
    top: 0,
    borderColor: colors.color_black,
    borderRadius: K_BORDER_RADIUS_20,
    alignSelf: 'center',
  },
});

export default CustomModal;
