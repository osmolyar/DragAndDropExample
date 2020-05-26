# DragAndDropExample
Reproducible example of html-dnd dragAndDrop doing nothing when dragging the 'Gmail' link on the Google home page to the search input box.

npm install;
Run as:
npx wdio testConfig\conf.js --suite google

Observe no dragging occurs and no error is emitted

See pages/googleHomePage.ts for dragAndDrop implementation.

