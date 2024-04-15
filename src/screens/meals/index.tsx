import React, {useState} from 'react';
import {
  K_BORDER_RADIUS_6,
  K_BORDER_WIDTH_1,
  K_MARGIN_10,
  K_MARGIN_16,
  K_MARGIN_32,
  K_MARGIN_4,
  K_MARGIN_6, K_PADDING_10,
  K_PADDING_12,
  K_PADDING_24,
  K_PADDING_32,
  K_PADDING_8,
  K_SIZE_10,
  K_SIZE_20,
  K_SIZE_26,
  K_SIZE_SCALE_10,
  TextBase
} from "../../common";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import {colors} from '../../common/constants/color';
import {Typography} from '../../common/constants/typography-foundation';
import {combosMenu} from '../home/components/CombosMenu';
import Meal from './components/Meals';
import {Searchbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from '../../common/components/modal';
import ButtonBase from '../../common/components/button';
import {RadioButton} from '../../common/components/radio-button';

const FoodMenu = ({navigation}: {navigation: any}) => (
  <View>
    <FlatList
      style={styles.flatListWrapper}
      /* eslint-disable-next-line react-native/no-inline-styles */
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
const StarRating = ({rating}: any) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <MaterialCommunityIcons
            name="star"
            color={'#FFC709'}
            size={K_SIZE_20}
          />,
        );
      } else {
        stars.push(
          <MaterialCommunityIcons
            name="star"
            color={colors.color_sub_text_2}
            size={K_SIZE_20}
          />,
        );
      }
    }
    return stars;
  };

  // eslint-disable-next-line react-native/no-inline-styles
  return <View style={{flexDirection: 'row'}}>{renderStars()}</View>;
};

const ratings = [
  {
    id: 1,
    icon: <StarRating rating={1} />,
  },
  {
    id: 2,
    icon: <StarRating rating={2} />,
  },
  {
    id: 3,
    icon: <StarRating rating={3} />,
  },
  {
    id: 4,
    icon: <StarRating rating={4} />,
  },
  {
    id: 5,
    icon: <StarRating rating={5} />,
  },
];
export const criteriaProduct = [
  {
    id: 1,
    name: 'Sản phẩm bán chạy',
  },
  {
    id: 2,
    name: 'Sản phẩm yêu thích',
  },
  {
    id: 3,
    name: 'Sản phẩm mới',
  },
  {
    id: 4,
    name: 'Giá từ thấp đến cao',
  },
  {
    id: 5,
    name: 'Giá từ cao đến thấp',
  },
];
const Meals = ({navigation}: any) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'food', title: 'Đồ ăn'},
    {key: 'drink', title: 'Đồ uống'},
    {key: 'snack', title: 'Ăn vặt'},
  ]);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRate, setSelectedRate] = useState<number | null>(0);
  const [selectedCriteria, setSelectedCriteria] = useState<number | null>(0);
  return (
    <SafeAreaView>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}>
        <View>
          <View style={{marginBottom: K_MARGIN_16}}>
            <TextBase text="Sắp xếp theo" style={{marginBottom: K_MARGIN_4}} />
            {criteriaProduct.map(criteria => (
              <View
                key={criteria.id}
                /* eslint-disable-next-line react-native/no-inline-styles */
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: K_MARGIN_6,
                }}
                onTouchEnd={() => setSelectedCriteria(criteria.id)}>
                <RadioButton
                  activeColor={colors.color_primary}
                  unActiveColor={colors.color_sub_text}
                  value={selectedCriteria === criteria.id}
                  sizeDot={K_SIZE_SCALE_10}
                />
                <TextBase text={criteria.name} preset="title2" />
              </View>
            ))}
          </View>
          <View style={{marginBottom: K_MARGIN_16}}>
            <TextBase
              text="Theo khoảng giá"
              style={{marginBottom: K_MARGIN_4}}
            />
            <TextInput
              /* eslint-disable-next-line react-native/no-inline-styles */
              style={{
                borderColor: colors.color_sub_text_2,
                borderRadius: K_BORDER_RADIUS_6,
                borderWidth: K_BORDER_WIDTH_1,
                padding: K_PADDING_12,
                width: '70%',
              }}
              placeholder="Từ"
              keyboardType={'numeric'}
              // value={name}
              // onChangeText={handleNameChange}
            />
            <TextInput
              style={{
                borderColor: colors.color_sub_text_2,
                borderRadius: K_BORDER_RADIUS_6,
                borderWidth: K_BORDER_WIDTH_1,
                padding: K_PADDING_12,
                marginTop: K_MARGIN_10,
                width: '70%',
              }}
              placeholder="Đến"
              keyboardType={'numeric'}
              // value={name}
              // onChangeText={handleNameChange}
            />
          </View>
          <View>
            <TextBase text="Theo đánh giá" style={{marginBottom: K_MARGIN_4}} />
            {ratings.map(rating => (
              <View
                key={rating.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: K_MARGIN_6,
                }}
                onTouchEnd={() => setSelectedRate(rating.id)}>
                <RadioButton
                  activeColor={colors.color_primary}
                  unActiveColor={colors.color_sub_text}
                  value={selectedRate === rating.id}
                  sizeDot={K_SIZE_SCALE_10}
                />
                {rating.icon}
              </View>
            ))}
          </View>
          <ButtonBase
            title="Áp dụng"
            style={{marginVertical: K_MARGIN_32}}
            onPress={() => setModalVisible(false)}
          />
        </View>
      </CustomModal>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: K_PADDING_24,
            paddingTop: K_PADDING_10,
          }}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBarWrapper}
          />
          <MaterialCommunityIcons
            name="filter-variant"
            size={K_SIZE_26}
            onPress={() => setModalVisible(true)}
            color={colors.color_black}
          />
        </View>
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
    width: '85%',
    backgroundColor: '#EFEEEE',
    paddingHorizontal: K_PADDING_24,
    shadowColor: colors.color_black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 20,
    shadowOpacity: 0.1,
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
    elevation: 11
  },
  flatListWrapper: {
    backgroundColor: colors.color_background,
    width: '100%',
    marginBottom: 200,
    paddingTop: K_SIZE_10,
  },
});
export default Meals;
