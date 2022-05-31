import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { db } from 'services/config';

/**
 * Returns realtime db from firestore
 * @param {string} _collection (name of the collection)
 * @param {Array} _q ([fieldName, "operator", value])
 * @param {Array} _sort ([fieldName, direction])
 * @returns react state object: error, loading, documents
 */

export const useSnapshotDB = (_collection, _q, _sort) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // creating a mutable object to avoid infinte loop in side effect
  const q = useRef(_q).current;
  const sort = useRef(_sort).current;

  useEffect(() => {
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
  }, [_collection, q, sort]);

  return { error, loading, documents };
};
