ymaps.ready(function() {
  const map = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 7,
  });

  const objectManager = new ymaps.LoadingObjectManager(
    'https://desolate-forest-76254.herokuapp.com/tile?bbox=%b', {
      clusterize: false,
      splitRequests: false
  });

  map.geoObjects.add(objectManager);
});
