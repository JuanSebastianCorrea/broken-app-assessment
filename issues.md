# Broken App Issues

* Changed variable declaration for axios module from let to const.
* Changed variable declaration for executing express app from var to const.
* Added a package.json
* Moved server setup app.listen to its own file for testing purposes and added a message to log to the console when the server is running.
* Created custom error class ExpressError in expressError.js file. 
* app post route was not handling/catching errors at all. Added a throw new ExpressError in post route in case of bad requests.
* Added ```app.use(express.json())``` on app.js file.
* Made requests to GitHub in parallel using Promise.all(). App was not previously working because promises were not being resolved before passing before declaring the out variable.
* Changed declaration of 'results' and 'out' variables to const.
* Updated ``` return res.send(JSON.stringify(out)) ``` to ```return res.json(out)```.
* Added 404 global error handling for non-existing routes.
* 