import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Searchbar} from 'react-native-paper';
import {TabBar, TabView} from 'react-native-tab-view';
import {
  K_MARGIN_32,
  K_PADDING_24,
  K_PADDING_32,
  K_SIZE_26,
  K_SIZE_28,
} from '../../common';
import {Typography} from '../../common/constants/typography-foundation';
import {colors} from '../../common/constants/color';
import CombosMenu from './components/CombosMenu';

// const renderScene = SceneMap({
//   combo: CombosMenu,
//   hot: CombosMenu,
//   discount: CombosMenu,
// });
// @ts-ignore
import logo from '../../assets/images/logo.png';

const renderScene = ({route, navigation}: any) => {
  switch (route.key) {
    case 'combo':
    case 'hot':
    case 'discount':
      return <CombosMenu navigation={navigation} />;
    default:
      return null;
  }
};
const Index = ({navigation}: any) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'combo', title: 'Combo'},
    {key: 'hot', title: 'Bán chạy'},
    {key: 'discount', title: 'Siêu giảm giá'},
  ]);
  const [searchQuery, setSearchQuery] = React.useState('');
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
          <MaterialCommunityIcons
            name="cart-outline"
            color={colors.color_sub_text}
            size={K_SIZE_28}
            onPress={() => navigation.navigate('Cart')}
          />
        </View>
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBarWrapper}
      />
      <View style={styles.menuWrapper}>
        <TabView
          navigationState={{index, routes}}
          renderScene={props => renderScene({...props, navigation})}
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
    shadowOpacity: 0.05,
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
