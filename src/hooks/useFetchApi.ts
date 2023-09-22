// import { useState } from 'react';
// import { StateType } from '../types';

// function useFetchApi() {
//   const [resultsApi, setResultsApi] = useState<StateType | undefined>();
//   const [loading, setLoading] = useState<boolean>(false);

//   async function getApi(url: string, type: string, param: string) {
//     setLoading(true);
//     const response = await fetch(`https://www.${url}.com/api/json/v1/1/${type}=${param}`);
//     if (response.ok) {
//       const data = await response.json();
//       setResultsApi(data);
//       setLoading(false);
//     }
//   }

//   return {
//     getApi,
//     resultsApi,
//     loading,
//   };
// }

// export default useFetchApi;
