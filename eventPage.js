
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.todo == "showPageAction")
    {
        chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
            chrome.pageAction.show(tabs[0].id);
        });
    }

    if (request.todo == "levelUP") {
        var notifOptions = {
            type: "basic",
            iconUrl: "icons/icon48.png",
            title: "Next level!",
            message: "Next Level"
        };

        var newSound = new Audio("sounds/job-done.mp3");
        newSound.play();

        chrome.notifications.create('newNotif', notifOptions);
    }
});

//chrome.storage.onChanged.addListener(function (changes, storageName) {
//    if (changes.watchState == null) return;
//    switch (changes.watchState) {
//        case 0: startWatch(); break;
//        case 1: stopWatch(); break;
//    }
//});

//function startWatch() {
//    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//        chrome.tabs.sendMessage(tabs[0].id, { todo: "startWatch"});
//    });
//};

//function stopWatch() {
//    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//        chrome.tabs.sendMessage(tabs[0].id, { todo: "stopWatch" });
//    });
//};






