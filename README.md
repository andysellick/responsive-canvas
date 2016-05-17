Responsive canvas
=================

Exploring options for making canvas responsive and maintaining an aspect ratio.

Two options are explored here:

- maintain the aspect ratio but keep the canvas fully within the browser viewport (may result in gaps either side of the canvas)
- maintain the aspect ratio but make the canvas always fill the width of the page/parent element (may result in having to scroll to see all of the canvas)

The code checks for resizing events and resizes the canvas accordingly. An option to do this using JS-determined CSS scale transforms was investigated, but proved impractical due to having to choose between pixellation or excessive drawing operations.

See it in action
----------------

Clone the repo and run 'npm run setup' (for all subsequent uses, just run 'gulp').

Note, Windows users may need to run the initial command more than once for it to complete successfully.

Gulp will open a window in your browser automatically using Browsersync. Change the values for ted.idealw and ted.idealh to set the aspect ratio, change ted.mode as indicated to see the two options described above.
