import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase";

function useCollection(collec) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      const querySnapshot = await getDocs(collection(db, collec));
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      if (mounted) {
        setData(docs);
      }
    };
    loadData();
    return () => {
      mounted = false;
    };
  }, [collec]);

  return data;
}

export default useCollection;
