class googleResultLocators {
    imagesSection = '#imagebox_bigimages > g-section-with-header';
    resultsSection ='#rso > div:nth-child(7) > div';
    searchForm ='#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input';
    searchIcon ='#tsf > div:nth-child(2) > div > div.RNNXgb > button';

  constructor() {
  }

    imageByImageNo(imageNo) {
        return '#iur > div > div > div > div > div:nth-child(' + imageNo +')';
    };

    resultByResultNo(resultNo) {
        return '//*[@id="rso"]/div[1]/div/div[' + resultNo +']/div/div/div[1]/a/h3';
    };

    resultByPartialText(text) {
        return "//h3[contains(.,\'"+text+"\')]";
    };

}
export default googleResultLocators;
/*
  Ugh - these selectors - clean them up?
*/