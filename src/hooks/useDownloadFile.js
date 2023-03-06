import { getDownloadURL, ref } from 'firebase/storage';
import { useState, useEffect, useCallback, createElement } from 'react';
import { storage } from 'services/config';

export const useDownloadFile = (_location) => {
  const [document, setDocument] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const download = useCallback(() => {
    setLoading(true);
    const _ref = ref(storage, _location);

    getDownloadURL(_ref)
      .then((url) => {
        setDocument(url);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setError('Could not fetch data');
        setLoading(false);
        console.error(error);
      });
  }, [_location]);

  useEffect(() => {
    download();
  }, [download]);

  return { error, loading, document };
};
