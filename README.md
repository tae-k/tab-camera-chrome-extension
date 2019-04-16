# directory: TabCamera
# Tae Jin Kim (tkim80)
# Hopkins Web Security


FILES:
    manifest.json        used to setup the chrome extension
    background.js        takes screenshots in 0.5 second intervals
    content.js           creates a new tab diagnosing the differences in the screenshots
    popup.html           creates a popup of my extension when clicking on the icon
    resemble.js          used to compare the screenshots (not written by me)


NOTE:
    Please note that the new tab will only be created if the differences in the screenshots > 1%.


BUG (maybe)
    For some reason, the extension outputs the same error in the console when run in the chrome://
    extensions/ page; otherwise, it works as it is supposed to.