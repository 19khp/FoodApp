import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  K_BORDER_RADIUS_30, K_MARGIN_24,
  K_MARGIN_60,
  K_PADDING_10,
  K_PADDING_60,
  K_SIZE_120,
  TextBase
} from "../../common";
import {colors} from '../../common/constants/color';
import ButtonBase from '../../common/components/button';

const Index = ({navigation}: any) => {
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

        <ButtonBase
          style={{marginTop: K_MARGIN_24}}
          title="Đặt ngay"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  layoutContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
export default Index;
