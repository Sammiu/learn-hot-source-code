;(function () {

  const router = [
    {path: '/', url: '/default.html'},
    {path: '/index', url: '/main.html'},
    {path: '/news', url: '/news.html'},
    {path: '/about', url: '/about.html'}
  ];
  const mHistory = window.history;
  const routerView = document.querySelector('#router');
  const routerLinks = document.querySelectorAll('.router-link');

  function setHtml(elem, htmlContent) {
    elem.innerHTML = htmlContent;
  }

  function displayPage(url) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener('readystatechange', e => {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          const responseText = httpRequest.responseText;
          setHtml(routerView, responseText);
        }
      }
    });

    httpRequest.open('get', url);
    httpRequest.send(null);
  }

  routerLinks.forEach((elem, index) => {
    elem.addEventListener('click', () => {
      const route = router[index];
      displayPage(route.url);
      mHistory.pushState(route.url, null, route.path)
    }, false)
  });

  window.addEventListener('popstate', function (e) {
    const url = e.state;
    displayPage(url);
  });

  window.addEventListener('load', () => {
    const path = location.pathname;
    const index = router.findIndex(item => item.path === path);
    if (index > -1) {
      displayPage(router[index].url);
      if (index > 0)
        mHistory.replaceState(router[index].url, null, path);
    }
  })

})(undefined);
