import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Searchbar} from 'react-native-paper';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {
  K_MARGIN_32,
  K_PADDING_24,
  K_PADDING_32,
  K_SIZE_28,
  K_SIZE_8,
} from '../../common';
import {Typography} from '../../common/constants/typography-foundation';
import {colors} from '../../common/constants/color';
import CombosMenu from './components/CombosMenu';
import {TextBase} from '../../common';

const SecondRoute = () => (
  <View
    style={{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,

      elevation: 11,
    }}>
    <View
      style={{
        backgroundColor: colors.color_white,
        padding: K_PADDING_32,
        borderRadius: K_PADDING_24,
        overflow: 'hidden',
      }}>
      <Text>hi</Text>
    </View>
  </View>
);

const renderScene = SceneMap({
  combo: CombosMenu,
  hot: SecondRoute,
  discount: SecondRoute,
});
const Index = () => {
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
          <TextBase preset="h4">Bữa ăn ngon cho bạn</TextBase>
        </View>
        <View
          style={{width: '30%', alignItems: 'flex-end', paddingTop: K_SIZE_8}}>
          <MaterialCommunityIcons
            name="cart-outline"
            color={colors.color_sub_text}
            size={K_SIZE_28}
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
          renderScene={renderScene}
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
  },
  tabViewWrapper: {
    backgroundColor: colors.color_primary,
    shadowColor: colors.color_primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
});
export default Index;
