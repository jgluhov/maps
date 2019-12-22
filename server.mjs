import express from 'express';
import randomFloat from 'random-float';

const app = express();
const MAX = 200;

let uniquePointId = 0;

const generatePoints = (maxCount, [
  lat1,
  long1,
  lat2,
  long2
]) => {
  return new Array(maxCount).fill(0).map(() => {
    const coordinates = [
      randomFloat(lat1, lat2),
      randomFloat(long1, long2)
    ];
    return {
      type: 'Feature',
      geometry: {
          type: 'Point',
          coordinates
      },
      id: uniquePointId++,
      properties: {
          balloonContent: `This point is #${uniquePointId}`,
          iconContent: `#${uniquePointId}`
      },
      options: {
          preset: 'islands#yellowIcon'
      }
    }
  })
}

const getCoords = bbox => {
  return bbox.split(',').map(parseFloat);
}

app.get('/tile', (req, res) => {
  const coords = getCoords(req.query.bbox);
  res.jsonp({
    error: null,
    data: {
        type: 'FeatureCollection',
        features: generatePoints(MAX, coords)
    }
  });
})

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
