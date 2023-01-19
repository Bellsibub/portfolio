import {
  serverTimestamp,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { useReducer, useState, useEffect } from 'react';
import { db } from 'services/config';

// hooks
import { useAuth } from 'hooks/useAuth';

let initialState = {
  document: null,
  loading: false,
  error: null,
  success: null,
};

const dbReducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return {
        document: null,
        loading: true,
        error: null,
        success: false,
      };
    case 'ADD_DOCUMENT':
      return {
        document: action.payload,
        loading: false,
        error: null,
        success: true,
      };
    case 'UPDATE_DOCUMENT':
      return {
        document: action.payload,
        loading: false,
        error: null,
        success: true,
      };
    case 'DELETE_DOCUMENT':
      return {
        document: null,
        loading: false,
        error: null,
        success: true,
      };
    case 'ERROR':
      return {
        document: null,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

/**
 * Returns the local DB reducer state of the provided firestore collection
 * @param {string} _collection (name of the collection in firestore)
 * @returns response object (i.e. the reducer state containing {document, loading, error, success})
 * @returns reducer actions (addDocument, deleteDocument, updateDocument)
 */

export const useDB = (_collection) => {
  const [response, dispatch] = useReducer(dbReducer, initialState);
  const [cancelled, setCancelled] = useState(false);
  const { user } = useAuth();

  // collection ref
  const ref = collection(db, _collection);

  // only dispatch if not cancelled
  const dispatchNotCancelled = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // ACTIONS
  // add document
  const addDocument = async (inputData) => {
    dispatch({ type: 'IS_LOADING' });
    try {
      const newDoc = await addDoc(ref, {
        ...inputData,
        createdAt: serverTimestamp(),
        uid: user.uid,
      });
      dispatchNotCancelled({ type: 'ADD_DOCUMENT', payload: newDoc });
      return newDoc;
    } catch (error) {
      dispatchNotCancelled({ type: 'ERROR', payload: error.message || error });
      console.error(error);
    }
  };
  const updateDocument = async (id, inputData) => {
    dispatch({ type: 'IS_LOADING' });
    try {
      const docRef = doc(db, _collection, id);
      // const docRef = doc(ref, id);
      await updateDoc(docRef, { ...inputData, updatedAt: serverTimestamp() });
      // this is not needed if we have realtimeDB... I think??
      const updatedDoc = await getDoc(docRef);
      dispatchNotCancelled({ type: 'UPDATE_DOCUMENT', payload: updatedDoc });
    } catch (error) {
      dispatchNotCancelled({ type: 'ERROR', payload: error.message || error });
      console.error(error);
    }
  };
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_LOADING' });
    try {
      const docRef = doc(db, _collection, id);
      // const docRef = doc(ref, id);
      await deleteDoc(docRef);
      dispatchNotCancelled({ type: 'DELETE_DOCUMENT' });
    } catch (error) {
      dispatchNotCancelled({ type: 'ERROR', payload: error.message || error });
      console.error(error);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { response, addDocument, updateDocument, deleteDocument };
};
