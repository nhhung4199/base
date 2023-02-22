import {deletePlace} from 'api/model/admin';
import {getPlacesApi} from 'api/model/resource';
import {Themes} from 'assets/themes';
import StyledButton from 'components/base/StyledButton';
import StyledText from 'components/base/StyledText';
import {TAB_NAVIGATION_ROOT} from 'navigation/config/routes';
import {navigate} from 'navigation/NavigationService';
import React from 'react';
import {Alert, Pressable, TouchableOpacity, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useDispatch, useSelector} from 'react-redux';
import {setResource} from 'state-management/resourceReducer/action';

const Places = () => {
  const places = useSelector((state: any) => state?.resourceReducer?.place);
  const dispatch = useDispatch();
  const onPress = item => {
    navigate(TAB_NAVIGATION_ROOT.MANAGER_ROUTE.MANAGER_SCREEN, {
      place: item,
    });
  };
  const removeItem = async id => {
    try {
      await deletePlace(id);
      const place = await getPlacesApi();
      dispatch(setResource({place}));
    } catch (error) {
      console.log(error);
    }
  };

  const onPressDelete = item => {
    Alert.alert('Thông báo', `Bạn muốn xoá "${item?.name || ''}"?`, [
      {
        text: 'Không',
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          removeItem(item?.id);
        },
      },
    ]);
  };
  return (
    <View>
      <StyledText
        i18nText="labels.kitchenLocation"
        customStyle={styles.kitchenLocation}
      />
      <SwipeListView
        scrollEnabled={false}
        data={places}
        renderItem={({item}: any) => (
          <Pressable
            onPress={() => onPress(item)}
            key={item?.id}
            style={styles.itemRender}>
            <StyledText
              originText={item?.name}
              customStyle={styles.labelItem}
            />
          </Pressable>
        )}
        renderHiddenItem={(data: any) => (
          <View key={data?.item?.id} style={styles.renderHiddenItem}>
            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={() => {
                onPressDelete(data?.item);
              }}>
              <StyledText
                i18nText="labels.delete"
                customStyle={{color: Themes.Light.COLORS.white}}
              />
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={0}
        disableRightSwipe={true}
        rightOpenValue={scale(-42)}
        contentContainerStyle={{flex: 1}}
      />

      <StyledButton
        title="+"
        customStyle={styles.buttonAdd}
        customStyleTitle={{color: Themes.Light.COLORS.black}}
        onPress={() => {
          navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.EDIT_KITCHEN_SCREEN);
        }}
      />
    </View>
  );
};

export default Places;

const styles = ScaledSheet.create({
  kitchenLocation: {
    fontFamily: Themes.Fonts.bold,
    fontSize: '18@ms',
    textAlign: 'center',
    marginTop: '40@vs',
    color: Themes.Light.COLORS.primary,
    marginBottom: '12@vs',
  },
  buttonAdd: {
    backgroundColor: Themes.Light.COLORS.neutral04,
    paddingVertical: '5@vs',
    marginTop: '8@vs',
  },
  itemRender: {
    backgroundColor: Themes.Light.COLORS.neutral02,
    marginTop: '8@vs',
    alignItems: 'center',
    paddingVertical: '13@vs',
    borderRadius: '4@ms',
  },
  labelItem: {
    fontFamily: Themes.Fonts.bold,
    color: Themes.Light.COLORS.white,
    fontSize: '16@ms',
  },
  renderHiddenItem: {
    marginTop: '8@vs',
    alignItems: 'flex-end',
  },
  buttonDelete: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(40),
    backgroundColor: 'red',
    borderRadius: '4@ms',
  },
});
