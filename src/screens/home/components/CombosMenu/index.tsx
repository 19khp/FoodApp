import React from 'react';
import {
  K_BORDER_RADIUS_26,
  K_FONT_SIZE_15,
  K_FONT_SIZE_17,
  K_MARGIN_12,
  K_MARGIN_32,
  K_PADDING_32,
  K_SIZE_100,
  K_SIZE_120,
  K_SIZE_24,
  TextBase,
} from '../../../../common';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../../common/constants/color';
const combosMenu = [
  {
    id: 1,
    image: '',
    name: 'Veggie tomato mix',
    price: '100,000',
  },
  {
    id: 2,
    image: '',
    name: 'Fried chicken m.',
    price: '100,000',
  },
  {
    id: 3,
    image: '',
    name: 'Moi-moi and ekpa.',
    price: '100,000',
  },
  {
    id: 4,
    image: '',
    name: 'Fishwith mix orange',
    price: '100,000',
  },
];
const CombosMenu = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingVertical: K_PADDING_32,
        paddingRight: K_PADDING_32,
      }}
      scrollEnabled={true}
      horizontal={true}>
      {combosMenu.map(combosMenuItem => (
        <View key={combosMenuItem.id} style={styles.mealWrapper}>
          <View
            style={{
              backgroundColor: colors.color_white,
              height: 280,
              overflow: 'hidden',
              borderRadius: K_BORDER_RADIUS_26,
            }}>
            <Image
              style={{width: 'auto', height: K_SIZE_120}}
              source={{
                uri: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
            />
            <View style={{height: K_SIZE_24}} />
            <View
              style={{
                paddingHorizontal: K_PADDING_32,
                width: 200,
              }}>
              <TextBase
                preset="title1"
                textAlign={'center'}
                fontSize={K_FONT_SIZE_17}>
                {combosMenuItem.name}
              </TextBase>
              <TextBase
                preset="title1"
                textAlign={'center'}
                fontSize={K_FONT_SIZE_15}
                color={colors.color_primary}
                style={{marginTop: K_MARGIN_12}}>
                {combosMenuItem.price} VNĐ
              </TextBase>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mealWrapper: {
    marginRight: K_MARGIN_32,
    shadowColor: colors.color_black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
});
export default CombosMenu;
