import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { useEffect, useState, useRef, useCallback } from 'react';
import { db } from 'services/config';
import { useSearchParams } from 'react-router-dom';

/**
 * Returns realtime db from firestore
 * @param {string} _collection (name of the collection)
 * @param {boolean} _filterable (whether or not the hook should consider filters in the search params)
 * @param {Array} _customFilter ([fieldname, operator, value])
 * @param {Array} _sort ([fieldName, direction])
 * @returns react state object: error, loading, documents
 */

export const useSnapshotDB = (_collection, _filterable, _customFilter, _sort) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let [searchParams] = useSearchParams();
  let filterParams = searchParams.get('filter');

  // creating a mutable object to avoid infinte loop in side effect
  const sort = useRef(_sort).current;
  const filterable = useRef(_filterable).current;
  const customFilter = useRef(_customFilter).current;

  const fetchData = useCallback(
    (q) => {
      setLoading(true);
      let ref = collection(db, _collection);

      // filter and sort
      if (q) ref = query(ref, where(...q));
      if (sort) ref = query(ref, orderBy(...sort));

      const unsubscribe = onSnapshot(
        ref,
        (snapshot) => {
          let results = [];
          snapshot.docs.forEach((doc) =>
            results.push({ ...doc.data(), id: doc.id })
          );

          // update state
          setDocuments(results);
          setError(null);
          setLoading(false);
        },
        (error) => {
          setError('Could not fetch data');
          setLoading(false);
          console.error(error);
        }
      );

      return () => unsubscribe();
    },
    [_collection, sort]
  );

  useEffect(() => {
    if (filterable && filterParams) {
      fetchData(['skills', 'array-contains-any', filterParams.split(',')]);
    } else if(!filterable && customFilter) { 
      fetchData(customFilter)
    }else {
      fetchData();
    }
  }, [customFilter, fetchData, filterParams, filterable]);

  return { error, loading, documents };
};
