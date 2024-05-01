
import { SPELLING_MEANING_API } from "./constants";




export const fetchDataSpellingMeaningApi = async (word: string) => {

  
    console.log("SPELLING_MEANING_API", word)
    try {
     
      const response = await fetch(SPELLING_MEANING_API+word);
     
      const json = await response.json();
      console.log("responce json", json)
       //dispatch(changeLoadingStatus(false));
      return json
      
    //   setData(json);
    //   setIsLoading(false);
    } catch (error) {

      console.error('Error fetching data:', error);
    //   dispatch(changeLoadingStatus(false))
      return error
    //   setIsLoading(false);
    }
  };