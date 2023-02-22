import {AxiosRequestConfig} from 'axios';
import {useEffect, useState} from 'react';

const SIZE_LIMIT = 10;

const usePagingByPage = (
  requestPaging: (config: AxiosRequestConfig) => Promise<any>,
  otherParams?: any,
) => {
  const [pagingData, setPagingData] = useState({
    refreshing: false,
    loadingMore: false,
    page: 0,
    noMore: false,
  });
  const [list, setList] = useState([]);
  const [params, setParams] = useState(otherParams);

  useEffect(() => {
    runRequest(pagingData.page, SIZE_LIMIT, {
      ...params,
    });
  }, [pagingData.page]);

  const runRequest = async (page, size, params) => {
    const res = await requestPaging({
      page,
      size: size || SIZE_LIMIT,
      ...params,
    });
    handleOnSuccess(res);
  };

  const onRefresh = () => {
    if (pagingData.page > 0) {
      setPagingData({
        ...pagingData,
        refreshing: true,
        page: 0,
      });
    } else {
      runRequest(0, SIZE_LIMIT, {...params});
    }
  };

  const onLoadMore = () => {
    if (pagingData.noMore || pagingData.loadingMore) return;
    setPagingData({
      ...pagingData,
      loadingMore: true,
      page: pagingData.page + 1,
    });
  };
  const handleOnSuccess = data => {
    let newList = [];
    if (data?.data?.dataList?.length >= 0) {
      newList = data?.data?.dataList;
    }
    if (pagingData.page === 0) {
      setList(newList);
    } else if (newList.length >= 0) {
      setList([...list, ...newList]);
    }
    setPagingData({
      ...pagingData,
      noMore: newList?.length == 0 ? true : false,
      refreshing: false,
      loadingMore: false,
    });
  };
  const onChangeParams = data => {
    setParams(data);
    if (pagingData.page > 0) {
      setPagingData({
        ...pagingData,
        refreshing: true,
        page: 0,
      });
    } else {
      runRequest(0, SIZE_LIMIT, {...data});
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

export default usePagingByPage;
