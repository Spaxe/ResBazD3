/* This is my javascript */

var cat_image = document.getElementById('cat');
var feed_button = document.getElementById('feed_button');

cat_image.addEventListener('click', meow);
feed_button.addEventListener('click', feed);

function feed (event) {
  console.log(event);
  cat_image.style.height = cat_image.offsetHeight + 'px';
  cat_image.style.width = (cat_image.offsetWidth + 30) + 'px';
}

function meow () {
  console.log('meow!');
}