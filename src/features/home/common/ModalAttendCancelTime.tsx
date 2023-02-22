import {setMealClosingApi} from 'api/model/user';
import IconCheckbox from 'assets/svgs/ic_checkbox.svg';
import IconCheckedBlue from 'assets/svgs/ic_checked_blue.svg';
import IconCheckedRed from 'assets/svgs/ic_checked_red.svg';
import IconClose from 'assets/svgs/ic_close_circle.svg';
import {Themes} from 'assets/themes';
import StyledButton from 'components/base/StyledButton';
import StyledText, {I18Type} from 'components/base/StyledText';
import moment from 'moment';
import React, {forwardRef, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import SimpleToast from 'react-native-simple-toast';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import dummyData from 'utilities/dummyData';
import Metrics from 'utilities/metric';
const ModalAttendCancelTime = (props, ref) => {
  const placeIdUser = useSelector(
    (state: any) => state?.userReducer?.place?.id,
  );
  const targetDay = useSelector(
    (state: any) => state?.resourceReducer?.targetDay,
  );
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<any>([]);
  const [type, setType] = useState<any>(null);
  useEffect(() => {
    ref.current = {showModal, dismiss};
  }, []);
  const showModal = type => {
    setType(type);
    setShow(true);
  };

  const dismiss = () => {
    setType(null);
    setSelected([]);
    setShow(false);
  };

  const onPress = item => {
    let temp;
    if (selected.includes(item)) {
      temp = selected.filter(i => i != item);
    } else {
      temp = [...selected];
      temp.push(item);
    }
    setSelected(temp);
  };

  const submit = async () => {
    for await (const element of selected) {
      try {
        const params = {
          targetDay: moment(targetDay).add(1, 'day').format('YYYY-MM-DD'),
          session: element,
          actionType: type,
          placeId: placeIdUser,
        };
        await setMealClosingApi(params);
        await props?.loop();
        dismiss();
      } catch (error: any) {
        dismiss();
        setTimeout(() => SimpleToast.show(error?.message), 500);
      }
    }
  };

  return (
    <ReactNativeModal
      useNativeDriverForBackdrop={true}
      isVisible={show}
      onBackdropPress={dismiss}
      style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={dismiss}>
          <IconClose />
        </TouchableOpacity>
        {type && (
          <View style={{marginBottom: 15}}>
            <StyledText
              i18nText={
                type === dummyData.attend
                  ? 'labels.reportRice'
                  : 'labels.cropRice'
              }
              customStyle={[
                styles.title,
                {
                  color:
                    type === dummyData.attend
                      ? Themes.Light.COLORS.primary
                      : Themes.Light.COLORS.red,
                },
              ]}
            />
            <StyledText
              i18nText={
                type === dummyData.attend
                  ? 'labels.youWantReportRice'
                  : 'labels.youWantCropRice'
              }
              i18nParams={{
                date: moment(targetDay).add(1, 'day').format('DD/MM'),
              }}
              customStyle={styles.content}
            />
          </View>
        )}
        {dummyData.shift.map(item => (
          <TouchableOpacity
            onPress={() => onPress(item)}
            style={styles.item}
            key={item}>
            {selected.includes(item) ? (
              type === dummyData.attend ? (
                <IconCheckedBlue />
              ) : (
                <IconCheckedRed />
              )
            ) : (
              <IconCheckbox />
            )}
            <StyledText
              i18nText={item as I18Type}
              i18nParams={{
                time: moment(targetDay).add(1, 'day').format('DD/MM'),
              }}
              customStyle={styles.itemLabel}
            />
          </TouchableOpacity>
        ))}
        <StyledButton
          title="button.agree"
          customStyle={styles.submit}
          customStyleTitle={{color: Themes.Light.COLORS.white}}
          onPress={submit}
        />
      </View>
    </ReactNativeModal>
  );
};

export default forwardRef(ModalAttendCancelTime);

const styles = ScaledSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: Themes.Light.COLORS.white,
    borderTopRightRadius: '20@ms',
    borderTopLeftRadius: '20@ms',
    paddingTop: '12@vs',
    paddingBottom: Metrics.safeBottomPadding,
    paddingHorizontal: '16@s',
  },
  title: {
    textAlign: 'center',
    fontSize: '18@ms',
    fontFamily: Themes.Fonts.bold,
    marginTop: '6@vs',
  },
  content: {
    textAlign: 'center',
    marginTop: '6@vs',
  },
  submit: {
    backgroundColor: Themes.Light.COLORS.neutral01,
    borderRadius: '4@ms',
    marginTop: '10@vs',
  },
  item: {
    borderWidth: 1,
    borderRadius: '5@ms',
    borderColor: Themes.Light.COLORS.neutral01,
    paddingVertical: '8@vs',
    paddingHorizontal: '12@s',
    marginBottom: '15@vs',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    marginLeft: '10@s',
    fontFamily: Themes.Fonts.medium,
  },
});
