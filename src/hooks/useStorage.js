import {
  getStorage,
  ref,
  list,
  listAll,
  getDownloadURL,
  getMetadata,
} from 'firebase/storage';
import { storage } from 'services/config';
// import { useCallback } from "react";
import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';

export const useStorage = (_collection) => {
  const [document, setDocument] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMedia = useCallback(() => {
    setLoading(true);
    let _ref = ref(storage, _collection);
    let _document = [];
    listAll(_ref)
      .then(async (res) => {
        let urlPromise = res.items.map((imageRef) => getDownloadURL(imageRef));
        let metaPromise = res.items.map((imageRef) => getMetadata(imageRef));
        await Promise.all(metaPromise).then((metadata) => {
          metadata.forEach((data) => {
            _document.push({ type: data.contentType, path: data.fullPath });
          });
        });
        await Promise.all(urlPromise).then((urls) => {
          urls.forEach((url, i) => {
            _document[i] = { url: url, ..._document[i] };
          });
        });
        setDocument([..._document]);
      })
      .catch((error) => {
        setError(error);
      });
  }, [_collection]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return { error, loading, document };
};
