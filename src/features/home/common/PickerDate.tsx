import IconCalendarPrimary from 'assets/svgs/ic_calendar_primary.svg';
import {Themes} from 'assets/themes';
import StyledText from 'components/base/StyledText';
import ModalDatePicker from 'components/modal/ModalDatePicker';
import moment from 'moment';
import React, {useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const PickerDate = ({targetDay, setTargetDay = date => {}}) => {
  const modalPickerRef = useRef<any>();

  const pickerDate = async () => {
    modalPickerRef.current?.showModal({save: setTargetDay});
  };

  return (
    <>
      <TouchableOpacity
        onPress={pickerDate}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <IconCalendarPrimary width={16} height={16} />
        <StyledText
          originText={moment(targetDay).format('DD/MM/YYYY')}
          customStyle={styles.date}
        />
      </TouchableOpacity>
      <ModalDatePicker ref={modalPickerRef} />
    </>
  );
};

export default PickerDate;

const styles = ScaledSheet.create({
  date: {
    fontFamily: Themes.Fonts.bold,
    textDecorationLine: 'underline',
    fontSize: '16@ms',
    marginLeft: '3@s',
  },
});
