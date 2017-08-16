//$(function(){
//    color = $('#fontColor').val();
//    $("#fontColor").on("change paste keyup", function() {
//        color = $(this).val(); 
//    });
    
//   $('#btnChange').click(function(){      
//         chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
//            chrome.tabs.sendMessage(tabs[0].id, {todo: "changeColor", clickedColor: color });
//        });
//   });
//});

$(function () {
    $('#startWatch').click(function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { todo: "startWatch"});
        });

        chrome.storage.sync.set({ 'watchState': 1 }, function () {
            console.log("watchState : 1");
        });
    });

    $('#stopWatch').click(function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { todo: "stopWatch" });
        });

        chrome.storage.sync.set({ 'watchState': 0 }, function () {
            console.log("watchState : 0");
        });
    });

    $('#btnNotify').click(function() {
        var notifOptions = {
            type: "basic",
            iconUrl: "icons/icon48.png",
            title: "Notification!",
            message: "Some Message"
        };
        var newSound = new Audio("sounds/job-done.mp3");
        newSound.play();
        chrome.notifications.create('newNotif', notifOptions);
    });

    $('#btnCheck').click(function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { todo: "checkStatus" });
        });
    });
});