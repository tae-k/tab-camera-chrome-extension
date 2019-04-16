console.log("context");

chrome.runtime.onMessage.addListener(function getMessage(request, sender, sendResponse) {
  console.log("compare images")
  resemble(request[0]).compareTo(request[1]).onComplete(function(data){
    console.log(data.misMatchPercentage);

    // get necessary variables
    var diff = new Image();
    diff.src = data.getImageDataUrl();
    var mismatch = data.misMatchPercentage;

    // open new tab with image
    if (mismatch > 1) {
        var w = window.open("about:blank", "_blank");
        // header
        w.document.write("<span style=\"font-size: 1em; font-family:arial, helvetica, sans-serif;\"><h1>Screenshot Differences</h1>.<\/span>");
        // reference bar
        w.document.write("<span style=\"font-size: 20px; font-family:arial, helvetica, sans-serif;\">Mismatch Bar: [ <\/span>");
        w.document.write("<span style=\"color:green; font-size: 20px; font-family:arial, helvetica, sans-serif;\">1% -- 33%<\/span>");
        w.document.write("<span style=\"font-size: 20px; font-family:arial, helvetica, sans-serif;\"> | <\/span>");
        w.document.write("<span style=\"color:orange; font-size: 20px; font-family:arial, helvetica, sans-serif;\">33% -- 66%<\/span>");
        w.document.write("<span style=\"font-size: 20px; font-family:arial, helvetica, sans-serif;\"> | <\/span>");
        w.document.write("<span style=\"color:red; font-size: 20px; font-family:arial, helvetica, sans-serif;\">66% -- 100%<\/span>");
        w.document.write("<span style=\"font-size: 20px; font-family:arial, helvetica, sans-serif;\"> ]<br><br><\/span>");
        // diagnosis
        if (mismatch > 66) {
          w.document.write("<span style=\"color:red; font-size: 20px; font-family:arial, helvetica, sans-serif;\">The difference between the two screenshots is " + mismatch + "%.<br><br><\/span>");
        } else if (mismatch > 33) {
          w.document.write("<span style=\"color:orange; font-size: 20px; font-family:arial, helvetica, sans-serif;\">The difference between the two screenshots is " + mismatch + "%.<br><br><\/span>");
        } else {
          w.document.write("<span style=\"color:green; font-size: 20px; font-family:arial, helvetica, sans-serif;\">The difference between the two screenshots is " + mismatch + "%.<br><br><\/span>");
        }
        // image
        w.document.write(diff.outerHTML);
    }
  });
});