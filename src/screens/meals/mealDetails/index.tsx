import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {TextBase} from '../../../common';

const MealDetail = ({route, navigation}) => {
  const {item} = route.params;
  return (
    <SafeAreaView>
      <View>
        <TextBase>{JSON.stringify(item)}</TextBase>
      </View>
    </SafeAreaView>
  );
};

export default MealDetail;
