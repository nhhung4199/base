import {AxiosRequestConfig} from 'axios';
import {useEffect, useState} from 'react';

const SIZE_LIMIT = 10;

const usePagingByOffset = (
  requestPaging: (config: AxiosRequestConfig) => Promise<any>,
  otherParams?: any,
) => {
  const [pagingData, setPagingData] = useState({
    refreshing: true,
    loadingMore: false,
    offset: 0,
    noMore: false,
  });
  const [params, setParams] = useState<any>(otherParams);
  const [list, setList] = useState([]);
  useEffect(() => {
    runRequest(pagingData.offset, SIZE_LIMIT, {
      ...params,
    });
  }, [pagingData.offset]);

  const runRequest = async (
    offset: number,
    limit?: number,
    otherParams?: any,
  ) => {
    try {
      const res = await requestPaging({
        offset: offset,
        limit: limit || SIZE_LIMIT,
        ...otherParams,
      });
      handleOnSuccess(res);
    } catch (error) {
      setPagingData({
        ...pagingData,
        refreshing: false,
      });
    }
  };

  const onRefresh = () => {
    if (pagingData.offset > 0) {
      setPagingData({
        ...pagingData,
        refreshing: true,
        offset: 0,
        ...otherParams,
      });
    } else {
      runRequest(0, SIZE_LIMIT, {...params, ...otherParams});
      setPagingData({
        ...pagingData,
        refreshing: true,
      });
    }
  };

  const onLoadMore = () => {
    if (pagingData.noMore || pagingData.loadingMore) return;
    setPagingData({
      ...pagingData,
      loadingMore: true,
      offset: list.length,
    });
  };

  const handleOnSuccess = (data: any) => {
    const responseData = data || {};
    const newList: [] = responseData.items || [];

    if (pagingData.offset === 0) {
      setList(newList);
    } else if (newList.length >= 0) {
      setList([...list, ...newList]);
    }
    setPagingData({
      ...pagingData,
      noMore:
        SIZE_LIMIT * pagingData?.offset >= data?.totalItems ||
        newList?.length === 0,
      refreshing: false,
      loadingMore: false,
    });
  };
  const onChangeParams = data => {
    setParams(data);
    if (pagingData.offset > 0) {
      setPagingData({
        ...pagingData,
        refreshing: true,
        offset: 0,
      });
    } else {
      runRequest(0, SIZE_LIMIT, {...data});
      setPagingData({
        ...pagingData,
        refreshing: true,
      });
    }
  };
  return {
    onRefresh,
    onLoadMore,
    params,
    onChangeParams,
    list,
    setList,
    ...pagingData,
  };
};

export default usePagingByOffset;
