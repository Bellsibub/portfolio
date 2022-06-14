import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { useEffect, useState, useRef, useCallback } from 'react';
import { db } from 'services/config';
import { useSearchParams, useParams } from 'react-router-dom';

/**
 * Returns realtime db from firestore
 * @param {string} _collection (name of the collection)
 * @param {boolean} _filterable (whether or not the hook should consider filters in the search params)
 * @param {Array} _sort ([fieldName, direction])
 * @returns react state object: error, loading, documents
 */

export const useDocument = (_collection, _id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let { id: urlID } = useParams();
  // let [searchParams] = useSearchParams();
  // let filterParams = searchParams.get('filter');

  // creating a mutable object to avoid infinte loop in side effect
  // const sort = useRef(_sort).current;
  // const filterable = useRef(_filterable).current;

  const fetchData = useCallback(() => {
    setLoading(true);
    let ref = doc(db, _collection, _id || urlID);

    // filter and sort
    // if (q) ref = query(ref, where(...q));
    // if (sort) ref = query(ref, orderBy(...sort));

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        // let results = [];
        // snapshot.docs.forEach((doc) =>
        //   results.push({ ...doc.data(), id: doc.id })
        // );

        // update state
        setDocument({ ...snapshot.data(), id: snapshot.id });
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
  }, [_collection, _id, urlID]);

  useEffect(() => {
    // if (filterable && filterParams) {
    //   fetchData(['skills', 'array-contains-any', filterParams.split(',')]);
    // } else {
    //   fetchData();
    // }
    fetchData();
  }, [fetchData]);

  return { error, loading, document };
};
