function debounce(fn, bufferIntervalInSeconds) {
  var timeout;

  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn.apply.bind(fn, this, arguments), bufferIntervalInSeconds * 1000);
  };

}
