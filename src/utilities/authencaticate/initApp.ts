import {useEffect} from 'react';

export const useInitApp = () => {
  const getDataResource = async () => {
    try {
      // const response = await getResource();
      // store.dispatch(setResource({...response}));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataResource();
  }, []);
};
