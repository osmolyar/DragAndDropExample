# DragAndDropExample
-Reproducible example of html-dnd dragAndDrop doing nothing (while Wdio drags 3 documents as expected to the trash can using the demo page above), on both Chrome and FireFox.

npm install;
Run as:
npx wdio testConfig\conf.js --suite dragAndDrop

Observe 2nd scenario, using html-dnd, fails due to not dragging (no error emitted during dragging)

-Reproducible example of BOTH wdio drag-and-drop and html-dnd dragAndDrop doing nothing when dragging the 'Gmail' link on the Google home page to the search input box, on both firefox and Chrome.
Run as:
npx wdio testConfig\conf.js --suite google

Observe no dragging occurs and no error is emitted

See pages/trashCanPage.ts for dragAndDrop implementation.

