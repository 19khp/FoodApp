import React, {useState} from 'react';
import {
  Alert,
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
import {updateProfile, useProfile} from '../../../hooks/server/useProfile.ts';

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
  const {data: userInfo} = useProfile();
  const [selectedGender, setSelectedGender] = useState<number | undefined>(
    userInfo?.gender ? 0 : 1,
  );
  const [name, setName] = useState(userInfo?.name);
  const [number, setNumber] = useState(userInfo?.phone);
  const [address, setAddress] = useState(userInfo?.address);
  const handleRadioButtonToggle = (index: number) => {
    setSelectedGender(index);
  };
  const handleudpdateProfile = async () => {
    try {
      const res = await updateProfile({
        id: userInfo?.id,
        name: name,
        email: userInfo?.email,
        phone: number,
        address: address,
        gender: selectedGender === 0,
        image: userInfo?.image,
        password: userInfo?.password,
      });
      console.log({

        id: userInfo?.id,
        name: name,
        email: userInfo?.email,
        phone: number,
        address: address,
        gender: selectedGender === 0,
        image: userInfo?.image,
        password: userInfo?.password,
      });
      if (res) {
        Alert.alert('Cập nhật thông tin người dùng thành công');
      }
    } catch (err) {
      Alert.alert('Cập nhật thông tin người dùng không thành công');
      console.log(err);
    }
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
              uri: userInfo?.image,
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
          <TextBase text={userInfo?.name} color={colors.color_sub_text} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            columnGap: K_MARGIN_8,
            marginBottom: K_MARGIN_16,
            width: '100%',
          }}>
          <TextBase text="Email" />
          <TextBase text={userInfo?.email} color={colors.color_sub_text} />
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
            value={name}
            onChangeText={setName}
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
            value={number}
            onChangeText={setNumber}
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
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <ButtonBase
          title="Cập nhật"
          style={{marginTop: K_MARGIN_24}}
          onPress={handleudpdateProfile}
        />
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
