
/**
 * Deps.
 */

var delegate = require('delegate');

/**
 * Expose `View`.
 */

module.exports = exports = View;

/**
 * Event regexp for splitting.
 *
 * Attribution: Backbone
 * https://github.com/documentcloud/backbone/blob/master/backbone.js#L1203
 *
 * @api private
 */

var splitter = /^(\S+)\s*(.*)$/;

/**
 * Initializes a new "view" using the `sel` and
 * an optional "event map".
 *
 * @param {String} sel
 * @param {Object|Undefined} map
 * @api public
 */

function View(sel, map){
  if (!(this instanceof View)) return new View(sel, map);
  this.tmpl = document.querySelector(sel).innerHTML;
  this.el = document.createElement('div');
  this.events = {};
}

/**
 * Plugins for compilers.
 *
 * @api public
 */

View.prototype.use = function(plugin){
  this.compiler = plugin(this.tmpl);
};

/**
 * Bind an event to a child element via `sel`.
 *
 * @param {String} sel
 * @param {Function} cb
 * @return {View}
 * @api public
 */

View.prototype.on = function(sel, cb){
  var parts = sel.match(splitter)
    , events = this.events;

  if (!(parts && parts.length)) return;

  var topic = events[parts[1]] || (events[parts[1]] = []);

  topic.push({
    sel: parts[2],
    cb: cb
  });

  return this;
};

/**
 * Clean up.
 *
 * TODO: Clean up events, leaks, etc.
 *
 * @api public
 */

View.prototype.destroy = function(){};

/**
 * Render out template.
 *
 * TODO: "view engines".
 *
 * @param {Mixed} data
 * @api public
 */

View.prototype.render = function(data){
  var events = this.events
    , pending;

  this.el.innerHTML = this.compiler(data || {});

  for (var type in events) {
    pending = events[type];
    for (var i = 0; i < pending.length; i++) {
      console.log('%s %s', pending[i].sel, type);
      delegate.bind(this.el, pending[i].sel, type, pending[i].cb);
    }
  }

  return this.el;
};