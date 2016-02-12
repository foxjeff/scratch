// from http://lhorie.github.io/mithril-blog/curry-flavored-promises.html
//
//a FP-friendly console.log
var log = function(value) {
    console.log(value);
    return value;
};

var things = [{name:"foo",cb:"erpa"},{name:"bar",cb:"derpa"}];

var cb = function(user,items) {
    return items.filter(function(item) {
        return item.cb == user;}); };

// this is currying
// binds "erpa" to first argument of cb -> user
cb.bind(this, "erpa")(things);

// --> {name:"bar", cb:"erpa"}

