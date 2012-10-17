
# view

  light weight view layer for `component`'s

## Installation

    $ component install gjohnson/view

## API

```html
<\script type="text/jade" id="hello-view">
h1 hello #{name}!!!
button.some-action click me
<\/script>

<\script type="text/javascript">
var view = require('view');

var hello = view('#hello-view');
hello.use(jade.compile);

hello.on('click .some-action', function(e){
  console.log(e.target.innerHTML);
});

var el = hello.render({ name: 'garrett' });
document.body.appendChild(el);
<\/script>
```

## License

  MIT
