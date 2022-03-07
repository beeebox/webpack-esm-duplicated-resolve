import React from "react";
import useSWR, { SWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";

const Test = () => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=10`; // SWR key
  };
  const { data, error, size, setSize } = useCats(getKey);

  if (error) return <h3>Error</h3>;
  if (!data) return <h3>Loading</h3>;

  const catList = data
    .reduce((cur, acc) => {
      return [...acc, ...cur];
    }, [])
    .map((cat, i) => <p key={cat._id + i}>{cat.text}</p>);

  const loadMore = () => {

    setSize(size + 1);
  };

  return (
    <div>
      <a href="https://google.com/">Leave page</a>
      {catList}
      <button onClick={loadMore}>Load more</button>
    </div>
  );
};


export default function NewsAppStart() {
  return (
    <React.StrictMode>
      <SWRConfig value={{ provider: localStorageProvider }}>
        <Test />
      </SWRConfig>
    </React.StrictMode>
  );
}

function localStorageProvider() {
  let map;
  try {
    const arr = JSON.parse(localStorage.getItem('app-cache') || '[["a",1]]')
    map = new Map(arr);
  } catch {
    map = new Map([["a", 1]]);
  }
  map.set('__custom', 'custom');

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    console.log('beforeunload', appCache);
    if (appCache !== "[]") {
      console.log(Array.from(map.entries()));
    }
    // debugger;
    localStorage.setItem("app-cache", appCache);
  });

  // We still use the map for write & read for performance.
  return map;
}

function useCats(requestObject) {
  const fetcher = (url) => {
    return fetch(url).then((res) => res.json());
  };

  return useSWRInfinite(requestObject, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
}
