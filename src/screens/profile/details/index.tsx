import React, {useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  K_BORDER_RADIUS_100,
  K_BORDER_RADIUS_6,
  K_BORDER_WIDTH_1,
  K_MARGIN_10,
  K_MARGIN_16,
  K_MARGIN_24,
  K_MARGIN_8,
  K_PADDING_14,
  K_PADDING_20,
  K_PADDING_24,
  K_PADDING_32,
  K_PADDING_8,
  K_SIZE_16,
  K_SIZE_80,
  K_SIZE_SCALE_15,
  TextBase,
} from '../../../common';
import {colors} from '../../../common/constants/color';
import {RadioButton} from '../../../common/components/radio-button';
import ButtonBase from '../../../common/components/button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const genders = [
  {
    id: 1,
    name: 'Nam',
  },
  {
    id: 2,
    name: 'Nữ',
  },
];
const Details = () => {
  const [selectedGender, setSelectedGender] = useState<number | null>();

  const handleRadioButtonToggle = (index: number) => {
    setSelectedGender(index);
  };
  return (
    <SafeAreaView>
      <View style={{padding: K_PADDING_32}}>
        <View style={{alignItems: 'center', position: 'relative'}}>
          <Image
            style={{
              width: K_SIZE_80,
              height: K_SIZE_80,
              borderRadius: K_BORDER_RADIUS_100,
            }}
            source={{
              uri: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
          />
          <View
            style={{
              backgroundColor: colors.color_white,
              padding: K_PADDING_8,
              borderRadius: K_BORDER_RADIUS_100,
              left: K_PADDING_24,
              bottom: K_PADDING_24,
            }}>
            <MaterialCommunityIcons
              name={'upload'}
              size={K_SIZE_16}
              color={colors.color_primary}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            columnGap: K_MARGIN_8,
            marginBottom: K_MARGIN_16,
            width: '100%',
          }}>
          <TextBase text="Tên đăng nhập" />
          <TextBase text="khoapham" color={colors.color_sub_text} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            columnGap: K_MARGIN_8,
            marginBottom: K_MARGIN_16,
            width: '100%',
          }}>
          <TextBase text="Email" />
          <TextBase text="khoapham@gmail.com" color={colors.color_sub_text} />
        </View>
        <View
          style={{
            columnGap: K_MARGIN_8,
            width: '100%',
          }}>
          <TextBase text="Tên" />
          <TextInput
            style={[
              styles.inputWrapper,
              Platform.OS === 'ios'
                ? {padding: K_PADDING_20}
                : {paddingHorizontal: K_PADDING_14},
            ]}
            keyboardType={'numeric'}
            value={'Khoa'}
            // onChangeText={handleNameChange}
          />
        </View>
        <View
          style={{
            columnGap: K_MARGIN_8,
            width: '100%',
          }}>
          <TextBase text="Số điện thoại" />
          <TextInput
            style={[
              styles.inputWrapper,
              Platform.OS === 'ios'
                ? {padding: K_PADDING_20}
                : {paddingHorizontal: K_PADDING_14},
            ]}
            keyboardType={'numeric'}
            value={'1201219'}
            // onChangeText={handleNameChange}
          />
        </View>
        <View
          style={{
            columnGap: K_MARGIN_8,
            marginBottom: K_MARGIN_16,
          }}>
          <TextBase text="Giới tính" />
          <View style={{flexDirection: 'row', columnGap: K_MARGIN_24}}>
            {genders.map((item, index) => (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: K_MARGIN_10,
                  // borderBottomColor: colors.color_background,
                  // borderBottomWidth:
                  //   index === paymentMethods.length - 1 ? 0 : K_BORDER_WIDTH_1,
                  // paddingBottom:
                  //   index === paymentMethods.length - 1 ? 0 : K_PADDING_16,
                }}
                onTouchEnd={() => handleRadioButtonToggle(index)}>
                <RadioButton
                  activeColor={colors.color_primary}
                  unActiveColor={colors.color_sub_text}
                  value={selectedGender === index}
                  sizeDot={K_SIZE_SCALE_15}
                />
                <TextBase preset="caption1" color={colors.color_black}>
                  {item.name}
                </TextBase>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{
            columnGap: K_MARGIN_8,
            width: '100%',
          }}>
          <TextBase text="Địa chỉ" />
          <TextInput
            style={[
              styles.inputWrapper,
              Platform.OS === 'ios'
                ? {padding: K_PADDING_20}
                : {paddingHorizontal: K_PADDING_14},
            ]}
            value={'số 12 thái hà'}
            // onChangeText={handleNameChange}
          />
        </View>
        <ButtonBase title="Cập nhật" style={{marginTop: K_MARGIN_24}} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inputWrapper: {
    color: colors.color_black,
    borderColor: colors.color_sub_text_2,
    borderRadius: K_BORDER_RADIUS_6,
    borderWidth: K_BORDER_WIDTH_1,
    width: '100%',
    marginBottom: K_MARGIN_16,
  },
});
export default Details;
