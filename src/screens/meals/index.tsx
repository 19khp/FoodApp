import React from 'react';
import {K_PADDING_24, K_PADDING_32, K_PADDING_8, K_SIZE_10} from '../../common';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import {colors} from '../../common/constants/color';
import {Typography} from '../../common/constants/typography-foundation';
import {combosMenu} from '../home/components/CombosMenu';
import Meal from './components/Meals';
import {Searchbar} from 'react-native-paper';

const FoodMenu = ({navigation}: {navigation: any}) => (
  <View>
    <FlatList
      style={styles.flatListWrapper}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      data={combosMenu}
      renderItem={item => (
        <Meal
          item={item.item}
          onPress={() => navigation.navigate('MealDetail', {item: item.item})}
        />
      )}
      numColumns={2}
    />
  </View>
);

const renderScene = ({route, navigation}: any) => {
  switch (route.key) {
    case 'food':
    case 'drink':
    case 'snack':
      return <FoodMenu navigation={navigation} />;
    default:
      return null;
  }
};
const Meals = ({navigation}: any) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'food', title: 'Đồ ăn'},
    {key: 'drink', title: 'Đồ uống'},
    {key: 'snack', title: 'Ăn vặt'},
  ]);

  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <SafeAreaView>
      <View>
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
    marginTop: K_PADDING_8,
    height: '100%',
  },
  searchBarWrapper: {
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
  flatListWrapper: {
    backgroundColor: colors.color_background,
    width: '100%',
    marginBottom: 200,
    paddingTop: K_SIZE_10,
  },
});
export default Meals;
