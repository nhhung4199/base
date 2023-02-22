import React, {useRef} from 'react';
import {FlatList, RefreshControl, StyleProp, ViewStyle} from 'react-native';
interface Props {
  data: any;
  ListHeaderComponent?: any;
  refreshing: boolean;
  customStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  renderItem: any;
  onRefresh?(): any;
  onLoadMore?(): any;
  extraData?: any;
  numColumns?: number;
  horizontal?: boolean;
  ListEmptyComponent?: any;
}
const StyledFlatList = (
  {
    data = [],
    ListHeaderComponent,
    refreshing,
    customStyle,
    contentContainerStyle,
    renderItem,
    onRefresh = () => {},
    onLoadMore = () => {},
    extraData,
    numColumns,
    horizontal,
    ListEmptyComponent,
  }: Props,
  ref,
) => {
  const list = useRef(null);

  function handleRefresh() {
    onRefresh();
  }

  // Bởi vì onEnReached call nhiều lần nên phải trick để chỉ call 1 lần thôi

  function handleEndReached(info) {
    onLoadMore();
  }

  return (
    <FlatList
      ref={ref || list}
      style={customStyle}
      contentContainerStyle={contentContainerStyle}
      initialNumToRender={10}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      refreshControl={
        <RefreshControl refreshing={!!refreshing} onRefresh={handleRefresh} />
      }
      keyboardShouldPersistTaps={'never'}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={renderItem}
      extraData={extraData}
      data={data}
      numColumns={numColumns}
      showsHorizontalScrollIndicator={false}
      horizontal={horizontal}
    />
  );
};

export default React.forwardRef(StyledFlatList);
