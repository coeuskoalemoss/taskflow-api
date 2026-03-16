function logger(req, res, next) {

  // STEP 1: request just arrived, start the clock
  const start = Date.now();

  // STEP 2: set up a listener for when response is done
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(req.method, req.url, res.statusCode, duration + 'ms');
  });

  // pass to the next middleware/route
  next();
}

module.exports = logger;