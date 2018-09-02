# Big Snackbar for Material Design Lite

The big snackbar component is an enhanced version of the standard [MDL snackbar component](https://getmdl.io/components/index.html#snackbar-section). It allows for a better display of more text, as well as, the option to have multiple actions. On top of that the timeout can be removed to have a sticky snackbar.

![Screenshot of page using big snackbars](https://raw.githubusercontent.com/LeonStaufer/material-bigsnackbar/master/assets/overview.jpg)

Visit the live preview and documentation [here](https://leonstaufer.github.io/material-bigsnackbar/).

## Basic usage

Install the big snackbar component by adding both the ``BigSnackbar.js`` as well as ``BigSnackbar.css`` to your project. If you are not loading MDL, you will need the `handler.js` file as well, as this upgrades the component.

```html
<!-- import MDL -->
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="path_to/material-design-lite/material.min.css">
<script defer src="path_to/material-design-lite/material.min.js"></script> 

<!-- import handler.js if you are not loading the mdl js
<script defer src="path_to/handler.js"></script> -->
  
<!-- import Big Snackbar -->   
<link rel="stylesheet" href="path_to/BigSnackbar.css">
<script defer src="path_to/BigSnackbar.js"></script>
```

The setup of the big snackbar is very similiar to that of the regular MDL one. The basic syntax is as follows:

```html
<div class="mdl-js-bigsnackbar mdl-bigsnackbar">
    <div class="mdl-bigsnackbar__text"></div>
    <button class="mdl-bigsnackbar__action" type="button"></button>
</div>
```

To display the snackbar, get the element in JavaScript and call the ``MaterialBigSnackbar`` constructor on your element. You can now use ``showBigSnackbar(data)`` to display it.

```javascript
var snackbarContainer = document.querySelector('#bigsnackbar-id');

var data = {
    message: 'Message',
    actions: [
        ["ActionText", function(event){
            //your function
        }]
    ],
    timeout: 2000 //in milliseconds
};

snackbarContainer.MaterialBigSnackbar.showBigSnackbar(data);
```

The ``data`` object is explained below:

|Property|Effect|Remarks|Type|
|--- |--- |--- |--- |
|message|The text message to display|Required|String|
|timeout|The amount of time in milliseconds to show the snackbar. Passing null will result in the snackbar showing up forever|Optional (default infinite)|Integer|
|actions|An array consisting of a pair of: action text and action handler. Both must be present for a pair to work. You can specify as many pairs as you would like to add more actions|Optional|Array|

## License

This project uses the same license as [Material Design Lite](https://github.com/google/material-design-lite), [Apache License 2.0](https://github.com/LeonStaufer/material-bigsnackbar/blob/master/LICENSE).
