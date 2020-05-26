
class page {

  open(path='') {
    var url = path;
    return browser.url(url);
  }
}
export default page;