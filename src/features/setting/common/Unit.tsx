import {deleteDepartments} from 'api/model/admin';
import {getDepartmentsApi} from 'api/model/resource';
import IconRight from 'assets/svgs/ic_right.svg';
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

const Unit = () => {
  const dispatch = useDispatch();
  const department = useSelector(
    (state: any) => state?.resourceReducer?.department,
  );
  const onPress = item => {
    navigate(TAB_NAVIGATION_ROOT.MANAGER_ROUTE.MANAGER_SCREEN, {
      department: item,
    });
  };
  const removeItem = async id => {
    try {
      await deleteDepartments(id);
      const department = await getDepartmentsApi();
      dispatch(setResource({department}));
    } catch (error) {}
  };

  const onPressDelete = item => {
    Alert.alert('Thông báo', `Bạn muốn xoá ${item?.name || ''}?`, [
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
      <StyledText i18nText="labels.unitUP" customStyle={styles.unit} />
      <SwipeListView
        style={styles.body}
        scrollEnabled={false}
        data={department}
        renderItem={({item, index}: any) => (
          <Pressable
            key={item?.id}
            onPress={() => onPress(item)}
            style={[
              styles.item,
              index === department?.length - 1 && {borderBottomWidth: 0},
            ]}>
            <StyledText
              originText={item?.name}
              customStyle={styles.itemTitle}
            />
            <IconRight />
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
        disableRightSwipe={true}
        leftOpenValue={0}
        rightOpenValue={scale(-42)}
        contentContainerStyle={{flex: 1}}
      />
      <StyledButton
        title="+"
        customStyle={styles.buttonAdd}
        customStyleTitle={{color: Themes.Light.COLORS.black}}
        onPress={() => {
          navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.EDIT_DEPARTMENT_SCREEN);
        }}
      />
    </View>
  );
};

export default Unit;

const styles = ScaledSheet.create({
  unit: {
    fontFamily: Themes.Fonts.bold,
    fontSize: '18@ms',
    textAlign: 'center',
    marginTop: '40@vs',
    color: Themes.Light.COLORS.primary,
    marginBottom: '12@vs',
  },
  body: {
    backgroundColor: Themes.Light.COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '6@vs',
    borderBottomWidth: 1,
    borderBottomColor: Themes.Light.COLORS.neutral04,
    paddingHorizontal: '12@s',
    backgroundColor: Themes.Light.COLORS.white,
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: '16@ms',
  },
  renderHiddenItem: {
    alignItems: 'flex-end',
  },
  buttonDelete: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(40),
    backgroundColor: 'red',
  },
  buttonAdd: {
    backgroundColor: Themes.Light.COLORS.neutral04,
    paddingVertical: '5@vs',
    marginTop: '8@vs',
  },
});
