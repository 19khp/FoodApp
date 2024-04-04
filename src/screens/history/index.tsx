import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  K_BORDER_RADIUS_30,
  K_MARGIN_60,
  K_PADDING_10,
  K_PADDING_60,
  K_SIZE_120,
  TextBase,
} from '../../common';
import {colors} from '../../common/constants/color';

const Index = () => {
  return (
    <SafeAreaView style={styles.layoutContainer}>
      <View style={{alignItems: 'center'}}>
        <MaterialCommunityIcons
          name={'calendar-text'}
          size={K_SIZE_120}
          color={colors.color_sub_text_2}
        />
        <TextBase
          preset="title1"
          color={colors.color_sub_text}
          style={{fontWeight: '600'}}>
          Không có lịch sử
        </TextBase>

        <View
          style={{
            backgroundColor: colors.color_primary,
            borderRadius: K_BORDER_RADIUS_30,
            marginTop: K_MARGIN_60,
            paddingHorizontal: K_PADDING_60,
            paddingVertical: K_PADDING_10,
          }}>
          <Button title="Đặt ngay" color={colors.color_white} />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  layoutContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
export default Index;
