import React, {useEffect, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Searchbar} from 'react-native-paper';
import {TabBar, TabView} from 'react-native-tab-view';
import {
  CategoryTypes,
  K_BORDER_RADIUS_100,
  K_FONT_SIZE_10,
  K_MARGIN_32,
  K_PADDING_12,
  K_PADDING_24,
  K_PADDING_32,
  K_PADDING_40,
  K_PADDING_8,
  K_SIZE_26,
  K_SIZE_28,
  TextBase,
} from '../../common';
import {Typography} from '../../common/constants/typography-foundation';
import {colors} from '../../common/constants/color';
import CombosMenu from './components/CombosMenu';

// @ts-ignore
import logo from '../../assets/images/logo.png';
import {useProductList} from '../../hooks/server/useProduct.ts';
import {useDispatch, useSelector} from 'react-redux';
import {setCartUser} from '../../stores/authSlice.ts';
import {useCart} from '../../hooks/server/useCart.ts';
import { selectIsUpdateCart, setIsUpdateCart } from "../../stores/checkoutSlice.ts";

const Index = ({navigation}: any) => {
  const {data: newMealList, isLoading: newLoading} = useProductList({
    sortType: CategoryTypes.NEW,
    size: 8,
  });
  console.log(newMealList);
  const {data: bestSellerMealList, isLoading: bestSellerLoading} =
    useProductList({
      sortType: CategoryTypes.BEST_SELLER,
      size: 8,
    });
  const {data: favMealList, isLoading: favLoading} = useProductList({
    sortType: CategoryTypes.FAVORITE,
    size: 8,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: CategoryTypes.NEW, title: 'Mới'},
    {key: CategoryTypes.BEST_SELLER, title: 'Bán chạy'},
    {key: CategoryTypes.FAVORITE, title: 'Được yêu thích'},
  ]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const {data: cart, refetch: refetchCart} = useCart();
  const dispatch = useDispatch();

  // @ts-ignore
  const searchbarRef = useRef<Searchbar>(null);
  const isUpdateCart = useSelector(selectIsUpdateCart);
  useEffect(() => {
    if (cart) {
      dispatch(setCartUser(cart));
    }
    if (isUpdateCart) {
      refetchCart();
      dispatch(setIsUpdateCart(false));
    }
  }, [isUpdateCart, dispatch, cart, refetchCart]);
  return (
    <SafeAreaView style={{backgroundColor: colors.color_background}}>
      <View style={styles.appBarWrapper}>
        <View style={{width: '70%'}}>
          <Image
            source={logo}
            style={{height: 100, aspectRatio: 2.2}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{width: '30%', alignItems: 'flex-end', paddingTop: K_SIZE_26}}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <View style={{alignItems: 'center', position: 'relative'}}>
              <MaterialCommunityIcons
                name="cart-outline"
                size={K_SIZE_28}
                color={colors.color_sub_text}
              />
              <View
                style={{
                  backgroundColor: colors.color_primary,
                  paddingHorizontal: K_PADDING_8,
                  borderRadius: K_BORDER_RADIUS_100,
                  left: K_PADDING_12,
                  bottom: K_PADDING_40,
                }}>
                <TextBase
                  text={cart?.cartDetailDtos.length.toString()}
                  color={colors.color_white}
                  fontSize={K_FONT_SIZE_10}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBarWrapper}
        onFocus={() => {
          if (searchbarRef.current) {
            searchbarRef.current.blur();
          }
          navigation.navigate('meals');
        }}
        ref={searchbarRef}
      />
      <View style={styles.menuWrapper}>
        <TabView
          navigationState={{index, routes}}
          renderScene={({route}: any) => {
            switch (route.key) {
              case CategoryTypes.NEW:
                return (
                  <CombosMenu navigation={navigation} mealList={newMealList} />
                );
              case CategoryTypes.BEST_SELLER:
                return (
                  <CombosMenu
                    navigation={navigation}
                    mealList={bestSellerMealList}
                  />
                );
              case CategoryTypes.FAVORITE:
                return (
                  <CombosMenu navigation={navigation} mealList={favMealList} />
                );
              default:
                return null;
            }
          }}
          onIndexChange={setIndex}
          initialLayout={{width: 100}}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={styles.tabViewWrapper}
              scrollEnabled={true}
              activeColor={colors.color_primary}
              inactiveColor={colors.color_sub_text}
              style={{backgroundColor: 'transparent'}}
              labelStyle={Typography.caption1}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  appBarWrapper: {
    flexDirection: 'row',
    padding: K_PADDING_32,
    marginTop: K_PADDING_24,
    justifyContent: 'space-between',
  },
  menuWrapper: {
    paddingLeft: K_PADDING_32,
    marginTop: K_PADDING_24,
    height: '100%',
  },
  searchBarWrapper: {
    margin: K_MARGIN_32,
    backgroundColor: '#EFEEEE',
    paddingHorizontal: K_PADDING_24,
    shadowColor: colors.color_black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 20,
    shadowOpacity: 0.1,
    elevation: 6,
  },
  tabViewWrapper: {
    backgroundColor: colors.color_primary,
    shadowColor: colors.color_primary,
    shadowOffset: {
      width: 6,
      height: 4,
    },
    shadowRadius: 7,
    shadowOpacity: 0.3,
  },
});
export default Index;
