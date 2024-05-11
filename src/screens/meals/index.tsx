import React, {useEffect, useRef, useState} from 'react';
import {
  CategoryTypes,
  K_BORDER_RADIUS_6,
  K_BORDER_WIDTH_1,
  K_MARGIN_10,
  K_MARGIN_16,
  K_MARGIN_32,
  K_MARGIN_4,
  K_MARGIN_6,
  K_PADDING_10,
  K_PADDING_12,
  K_PADDING_24,
  K_PADDING_32,
  K_PADDING_8,
  K_SIZE_10,
  K_SIZE_20,
  K_SIZE_26,
  K_SIZE_SCALE_10,
  TextBase,
} from '../../common';
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
import Meal from './components/Meals';
import {ActivityIndicator, Searchbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from '../../common/components/modal';
import ButtonBase from '../../common/components/button';
import {RadioButton} from '../../common/components/radio-button';
import {getProductList, useProductList} from '../../hooks/server/useProduct.ts';
import {MealProps} from '../../models/meal.ts';
import {Utils} from '../../common/utils';
import {useCategory} from '../../hooks/server/useCategory.ts';

const FoodMenu = ({
  navigation,
  mealList,
}: {
  navigation: any;
  mealList?: MealProps[];
}) => {
  return (
    <View>
      <FlatList
        style={styles.flatListWrapper}
        /* eslint-disable-next-line react-native/no-inline-styles */
        contentContainerStyle={{
          alignItems: 'center',
        }}
        data={mealList}
        renderItem={item => (
          <Meal
            key={item.item.productId}
            item={item.item}
            onPress={() => navigation.navigate('MealDetail', {item: item.item})}
          />
        )}
        numColumns={2}
      />
    </View>
  );
};

const StarRating = ({rating}: any) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <MaterialCommunityIcons
            key={i}
            name="star"
            color={'#FFC709'}
            size={K_SIZE_20}
          />,
        );
      } else {
        stars.push(
          <MaterialCommunityIcons
            key={i}
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
    type: CategoryTypes.BEST_SELLER,
  },
  {
    id: 2,
    name: 'Sản phẩm yêu thích',
    type: CategoryTypes.FAVORITE,
  },
  {
    id: 3,
    name: 'Sản phẩm mới',
    type: CategoryTypes.NEW,
  },
  {
    id: 4,
    name: 'Giá từ thấp đến cao',
    type: CategoryTypes.PRICE_LOW_TO_HIGH,
  },
  {
    id: 5,
    name: 'Giá từ cao đến thấp',
    type: CategoryTypes.PRICE_HIGH_TO_LOW,
  },
];
const Meals = ({navigation}: any) => {
  const {data: newMealList} = useProductList({
    sortType: CategoryTypes.NEW,
    size: 20,
  });
  const {data: bestSellerMealList} = useProductList({
    sortType: CategoryTypes.BEST_SELLER,
    size: 20,
  });
  const {data: favMealList} = useProductList({
    sortType: CategoryTypes.FAVORITE,
    size: 20,
  });
  const [index, setIndex] = React.useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRate, setSelectedRate] = useState<number | null>(0);
  const [selectedCriteria, setSelectedCriteria] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MealProps[] | null>(null);
  const [showTabView, setShowTabView] = useState(true);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [mealLists, setMealLists] = useState<any>(null);
  const [routes, setRoutes] = useState<any>([]);
  // const [mealList, setMealList] = useState<MealProps[] | undefined>(undefined);
  const {data: category} = useCategory();
  console.log(category);
  const filterMealLists = (query: string) => {
    const filteredNewMealList = newMealList?.filter(meal =>
      meal.name.toLowerCase().includes(query.toLowerCase()),
    );
    const filteredBestSellerMealList = bestSellerMealList?.filter(meal =>
      meal.name.toLowerCase().includes(query.toLowerCase()),
    );
    const filteredFavMealList = favMealList?.filter(meal =>
      meal.name.toLowerCase().includes(query.toLowerCase()),
    );
    if (
      filteredNewMealList &&
      filteredBestSellerMealList &&
      filteredFavMealList
    ) {
      const mergedResults = [
        ...filteredNewMealList,
        ...filteredBestSellerMealList,
        ...filteredFavMealList,
      ];
      setSearchResults(mergedResults);
    }
  };

  const handleSearch = (query: string) => {
    if (query.length > 0) {
      setSearchQuery(query);
      filterMealLists(query);
      setShowTabView(false);
    } else {
      setShowTabView(true);
    }
  };
  const handleAdvanceSearch = async () => {
    setModalVisible(false);
    setShowTabView(false);
    const res = await getProductList({
      sortType: selectedCriteria,
      startPrice: Number(fromAmount),
      endPrice: Number(toAmount),
      numberVote: selectedRate,
    });
    if (res?.result?.content) {
      setSearchResults(res.result.content);
    }
  };
  const onReset = () => {
    setShowTabView(true);
    setModalVisible(false);
    setSelectedCriteria('');
    setToAmount('');
    setFromAmount('');
    setSelectedRate(null);
  };
  const getMeals = async (categoryId: number) => {
    console.log('categoryIdddddddd', categoryId);
    try {
      const res = await getProductList({
        categoryId,
        sortType: CategoryTypes.NEW,
        page: 1,
        size: 5,
      });
      if (res.result.content) {
        console.log('MEAL_LIST:', res.result.content);
        setMealLists(res.result.content);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };
  const renderScene = () => {
    return <FoodMenu navigation={navigation} mealList={mealLists} />;
  };
  useEffect(() => {
    if (category) {
      const route = category?.map(cat => ({
        key: cat.categoryId,
        title: cat.categoryName,
      }));
      setRoutes(route);
      getMeals(route[0].key);
    }
  }, [category]);
  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
    const categoryId = routes[newIndex].key;
    getMeals(categoryId);
  };
  // @ts-ignore
  const searchbarRef = useRef<Searchbar>(null);
  useEffect(() => {
    if (searchbarRef.current) {
      searchbarRef.current.focus();
    }
  }, []);
  const renderUI = () => {
    if (!mealLists) {
      return <ActivityIndicator />;
    }
    if (mealLists && showTabView) {
      return (
        <TabView
          // @ts-ignore
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={handleIndexChange}
          initialLayout={{width: 100, height: 100}}
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
      );
    }
    if (!showTabView) {
      return (
        <View style={styles.menuWrapper}>
          {searchResults && searchResults?.length > 0 ? (
            <FoodMenu navigation={navigation} mealList={searchResults} />
          ) : (
            <TextBase text="Không tìm thấy món ăn nào" textAlign="center" />
          )}
        </View>
      );
    }
  };
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
                onTouchEnd={() => setSelectedCriteria(criteria.type)}>
                <RadioButton
                  activeColor={colors.color_primary}
                  unActiveColor={colors.color_sub_text}
                  value={selectedCriteria === criteria.type}
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
              value={fromAmount}
              // @ts-ignore
              onChangeText={e => setFromAmount(Utils.formatCurrency(e, true))}
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
              value={toAmount}
              onChangeText={e => setToAmount(e)}
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
            style={{marginTop: K_MARGIN_32, marginBottom: K_MARGIN_10}}
            onPress={handleAdvanceSearch}
          />
          <ButtonBase
            title="Thiết lập lại"
            style={{marginBottom: K_MARGIN_32}}
            onPress={onReset}
            buttonColor={colors.color_sub_text}
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
            ref={searchbarRef}
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBarWrapper}
            onChange={e => handleSearch(e.nativeEvent.text)}
            onClearIconPress={() => setShowTabView(true)}
          />
          <MaterialCommunityIcons
            name="filter-variant"
            size={K_SIZE_26}
            onPress={() => setModalVisible(true)}
            color={colors.color_black}
          />
        </View>
        <View style={styles.menuWrapper}>{renderUI()}</View>
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
    elevation: 11,
  },
  flatListWrapper: {
    height: '100%',
    backgroundColor: colors.color_background,
    width: '100%',
    marginBottom: 200,
    paddingTop: K_SIZE_10,
  },
});
export default Meals;
