import Handlebars from "handlebars";

Handlebars.registerHelper("isEqual", function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});
