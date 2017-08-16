chrome.runtime.sendMessage({ todo: "showPageAction" });
var started = false;
var checkTimer;

//chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
//    if (request.todo == "changeColor"){
//        var addColor = '#' + request.clickedColor;               
//        $('.title').css('font-style','italic');
//         $('.title').css('color', addColor);
//    }
//});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.todo == "startWatch") {
        startWatch();
    }

    if (request.todo == "stopWatch") {
        stopWatch();
    }

    if (request.todo == "checkStatus") {
        checkStatus();
    }
});

//chrome.storage.onChanged.addListener(function (changes, areaName) {
//    console.log(changes.watchState);
//    if (changes.watchState == null) return;
//    switch (changes.watchState) {
//        case 0: startWatch(); break;
//        case 1: stopWatch(); break;
//    }
//});

function startWatch() {
    started = true;
    console.log("watch started");
    checkTimer = setTimeout(function tick() {
        checkStatus();
        checkTimer = setTimeout(tick, 1000);
    }, 1000);
}

function stopWatch() {
    started = false;
    console.log("watch stopped");
    clearTimeout(checkTimer);
}

function checkStatus() {
    //var ajax_url = location.protocol + "//" + location.host + location.pathname + ((location.pathname[location.pathname.length - 1] == "/") ? "" : "/") + ((location.search) ? (location.search + "&") : "?") + "json=1";
    var ajax_url = location.protocol + "//" + location.host + ((location.pathname[location.pathname.length - 1] == "/") ? location.pathname.slice(0, location.pathname.length - 1) : location.pathname) + "?json=1";
    console.log(ajax_url);
    //console.log(location.pathname);
    //console.log(location.search);
    $.ajax({
        url: ajax_url,
        dataType: "json",
        type: "GET",
        success: checkResponse,
        error: function (data) {
            console.log("Error");
            console.log(data);
        }

    });
};

function checkResponse(data) {
    console.log(data.Event);
    //console.log(data.Level);
    console.log(data.Level.IsPassed);
    console.log(data.Level.Helps);
    if (data.Event == 16 || data.Event == 18 || data.Event == 19 || data.Event == 20 || data.Event == 21 || data.Event == 22) {
        //Level changed
        console.log("Level changed");
        //var notifOptions = {
        //    type: "basic",
        //    iconUrl: "icons/icon48.png",
        //    title: "Next level!",
        //    message: "Next Level"
        //};
        //var newSound = new Audio("sounds/job-done.mp3");
        //newSound.play();
        //chrome.notifications.create('newNotif', notifOptions);
        //window.location.reload(true);

        chrome.runtime.sendMessage({ todo: "levelUP" });
        window.location.reload(true);
    };
};