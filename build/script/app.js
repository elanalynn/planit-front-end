var appvars = {
  server: 'http://localhost:8000/'
};

function promisifyPartial(partial) {
  return new Promise(function(success, failure) {
    $.get(partial.file).done(function(text) {
      Handlebars.registerPartial(partial.name, text);
      success(true);
    }).fail(function(err) {
      failure(err);
    });
  });
}

function promiseToLoad() {
  return new Promise(function(success) {
    $(document).ready(function() {
      success();
    });
  });
}

Promise.all([
  // partials
  promisifyPartial({ name: 'partial', file: '/templates/header.hbs' }),
  promisifyPartial({ name: 'partial', file: '/templates/footer.hbs' }),

  // views
  promisifyPartial({ name: 'partial', file: '/templates/splash-page.hbs' }),

  // Document Ready?
  promiseToLoad()
]).then(function(datas) {
  pageLoaded();
});

Handlebars.registerHelper('compare', function(val1, val2, options) {
  if (val1 == val2) return options.fn(this);
  else return options.inverse(this);
});

function pageLoaded() {
  
}
