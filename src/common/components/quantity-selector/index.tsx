import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  K_BORDER_RADIUS_20,
  K_MARGIN_32,
  K_PADDING_20,
  K_PADDING_5,
  K_SIZE_26,
} from '../../constants';
import {colors} from '../../constants/color';

const QuantitySelector = ({
  size,
  fontInputSize,
  quantity,
  setQuantity,
}: {
  size: number;
  fontInputSize: number;
  quantity: number;
  setQuantity: any;
}) => {
  const handleTextChange = (inputText: string) => {
    const newText = inputText.replace(/[^0-9]/g, '');
    setQuantity(newText);
  };

  const handleCountPlus = () => {
    setQuantity(String(Number(quantity) + 1));
  };

  const handleCountMinus = () => {
    if (Number(quantity) > 1) {
      setQuantity(String(Number(quantity) - 1));
    }
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={handleCountMinus}>
        <View
          // @ts-ignore
          style={styles.counterButton}>
          <MaterialCommunityIcons
            name="minus"
            size={size}
            color={colors.color_white}
          />
        </View>
      </TouchableOpacity>
      <TextInput
        // @ts-ignore
        style={[styles.quantityInput, {fontSize: fontInputSize}]}
        onChangeText={handleTextChange}
        value={String(quantity)}
        keyboardType="numeric"
        maxLength={3}
        textAlign={'center'}
      />
      <TouchableOpacity onPress={handleCountPlus}>
        <View
          // @ts-ignore
          style={styles.counterButton}>
          <MaterialCommunityIcons
            name="plus"
            size={size}
            color={colors.color_white}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = {
  counterButton: {
    backgroundColor: colors.color_primary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  quantityInput: {
    colors: colors.color_black,
    textAlign: 'center',
    marginRight: 10,
  },
  orderButton: {
    backgroundColor: colors.color_primary,
    borderRadius: K_BORDER_RADIUS_20,
    paddingHorizontal: K_PADDING_20,
    paddingVertical: K_PADDING_5,
    alignItems: 'center',
    marginTop: K_MARGIN_32,
  },
};
export default QuantitySelector;
