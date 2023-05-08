# GUI-mode switcher(?)

Quick & dirty origo plugin to "minify" elements in origo legend. 
Switches between css padding values from css on mapload and preset values in plugin code.

#### Example usage

**index.html:**
```
    <head>
    	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    	<meta http-equiv="X-UA-Compatible" content="IE=Edge;chrome=1">
    	<title>Origo exempel</title>
    	<link href="css/style.css" rel="stylesheet">
    	<link href="plugins/guimodifier.css" rel="stylesheet">
    </head>
    <body>
    <div id="app-wrapper">
    </div>
    <script src="js/origo.js"></script>
    <script src="plugins/guimodifier.js"></script>

    <script type="text/javascript">
      //Init origo
      var origo = Origo('index.json');
      origo.on('load', function (viewer) {
        var guimodifier = Guimodifier({
		    initialMode: 'original'
        });
        viewer.addComponent(guimodifier);
      });
    </script>
```

