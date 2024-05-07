import React, {useEffect, useState} from 'react';
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
import {
  getProfile,
  imageUpload,
  updateProfile,
} from '../../../hooks/server/useProfile.ts';
import {getPathResource} from '../../../common/utils/string.ts';
import {ENVConfig} from '../../../common/config/env.ts';
import {useFocusEffect} from '@react-navigation/native';
import {UserProps} from '../../../models/user.ts';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserInfo, setIsUpdateProfile} from '../../../stores/authSlice.ts';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
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
const Details = ({navigation}: any) => {
  const user = useSelector(selectUserInfo);
  const [userInfo, setUserInfo] = useState<UserProps>();
  const [selectedGender, setSelectedGender] = useState<number | undefined>();
  const [name, setName] = useState('');
  const [image, setImage] = useState<any>();
  const [imageName, setImageName] = useState<any>();
  const dispatch = useDispatch();
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const handleRadioButtonToggle = (index: number) => {
    setSelectedGender(index);
  };
  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };
    // @ts-ignore
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (
        response.assets &&
        response.assets[0].fileName &&
        response.assets[0].uri
      ) {
        setImage(response.assets[0].fileName);
        setImageName(response.assets[0].uri.replace('file://', ''));

        const formData = new FormData();
        formData.append('file', {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });
        formData.append('entityType', 'USER');
        console.log('File selected:', response.assets[0]);
        try {
          const res = await imageUpload(formData);
          if (res.result) {
            console.log(res.result);
          }
        } catch (err) {
          console.log(JSON.stringify(err));
        }
      }
    });
  };
  const getUserProfile = async () => {
    try {
      const res = await getProfile(user?.id);
      if (res.result) {
        setUserInfo(res.result);
        setName(res.result.name);
        setNumber(res.result.phone);
        setAddress(res.result.address);
        setSelectedGender(res.result.gender ? 0 : 1);
        setImageName(getPathResource(ENVConfig.PATH_USER, res.result.image));
        console.log(
          'IMAGE_FROM_SERVER',
          getPathResource(ENVConfig.PATH_USER, res.result.image),
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUserProfile();
    }, []),
  );
  const handleudpdateProfile = async () => {
    if (!userInfo) {
      return;
    }
    try {
      const res = await updateProfile(
        {
          id: userInfo?.id,
          name: name,
          email: userInfo?.email,
          phone: number,
          address: address,
          gender: selectedGender === 0,
          image: image,
        },
        userInfo?.id,
      );
      if (res) {
        dispatch(setIsUpdateProfile(true));
        console.log('IMAGE_UPDATE_SUCCESS', res.result.image);
        Alert.alert('Thông báo', 'Cập nhật thông tin người dùng thành công', [
          {
            text: 'Đồng ý',
            onPress: () => navigation.goBack(),
          },
        ]);
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
              uri: imageName,
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
              onPress={chooseImage}
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
