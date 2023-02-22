import {Themes} from 'assets/themes';
import StyledText from 'components/base/StyledText';
import React, {forwardRef, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import ReactNativeModal from 'react-native-modal';
import {ScaledSheet} from 'react-native-size-matters';

const ModalDatePicker = (props, ref) => {
  const {mode = 'date'} = props;
  const [params, setParams] = useState<any>();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  useEffect(() => {
    ref.current = {showModal, dismiss};
  }, []);
  const showModal = params => {
    setParams(params);
    setShow(true);
  };
  const dismiss = () => {
    setShow(false);
    setDate(new Date());
  };

  const setDateSelect = value => {
    setDate(value);
  };
  return (
    <ReactNativeModal
      isVisible={show}
      onBackdropPress={dismiss}
      useNativeDriverForBackdrop={true}
      style={styles.stylesModal}>
      <View style={styles.container}>
        <View style={styles.btnViewModal}>
          <TouchableOpacity style={styles.itemModal} onPress={dismiss}>
            <StyledText
              customStyle={styles.btnCancel}
              i18nText="button.cancel"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemModal}
            onPress={() => {
              params?.save(date);
              setShow(false);
              setDate(new Date());
            }}>
            <StyledText customStyle={styles.btnDone} i18nText="button.agree" />
          </TouchableOpacity>
        </View>
        <View style={styles.datePicikerView}>
          <DatePicker
            mode={mode}
            date={date}
            locale="vi_VN"
            onDateChange={value => setDateSelect(value)}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default forwardRef(ModalDatePicker);

const styles = ScaledSheet.create({
  itemModal: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '20@vs',
  },
  stylesModal: {
    margin: 0,
    justifyContent: 'flex-end',
  },

  btnViewModal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  btnCancel: {
    width: '50%',
    textAlign: 'left',
    fontSize: '16@ms',
  },
  btnDone: {
    width: '50%',
    textAlign: 'right',
    fontSize: '16@ms',
  },
  datePicikerView: {
    width: '100%',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Themes.Light.COLORS.white,
    borderTopRightRadius: '10@ms',
    borderTopLeftRadius: '10@ms',
  },
});
