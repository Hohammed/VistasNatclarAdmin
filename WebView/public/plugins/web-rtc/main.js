'use strict';

var videoElement = document.querySelector('video#video_1');
var videoElement2 = document.querySelector('video#video_2');
var videoElement3 = document.querySelector('video#video_3');
var audioInputSelect = document.querySelector('select#audioSource');
var audioOutputSelect = document.querySelector('select#audioOutput');
var videoSelect = document.querySelector('select#videoSource');
var ArrElem = new Array();
var selectors = [audioInputSelect, audioOutputSelect, videoSelect];

function gotDevices(deviceInfos) {
    // Handles being called several times to update labels. Preserve values.
    var values = selectors.map(function (select) {
        return select.value;
    });
    selectors.forEach(function (select) {
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
    });
    for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput') {
            option.text = deviceInfo.label ||
                'microphone ' + (audioInputSelect.length + 1);
            audioInputSelect.appendChild(option);
        } else if (deviceInfo.kind === 'audiooutput') {
            option.text = deviceInfo.label || 'speaker ' +
                (audioOutputSelect.length + 1);
            audioOutputSelect.appendChild(option);
        } else if (deviceInfo.kind === 'videoinput') {
            option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
            videoSelect.appendChild(option);
            ArrElem.push(option.value);
        } else {
            console.log('Some other kind of source/device: ', deviceInfo);
        }
    }

    selectors.forEach(function (select, selectorIndex) {
        if (Array.prototype.slice.call(select.childNodes).some(function (n) {
          return n.value === values[selectorIndex];
        })) {
            select.value = values[selectorIndex];
        }
    });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

// Attach audio output device to video element using device/sink ID.
function attachSinkId(element, sinkId) {
    if (typeof element.sinkId !== 'undefined') {
        element.setSinkId(sinkId)
        .then(function () {
            console.log('Success, audio output device attached: ' + sinkId);
        })
        .catch(function (error) {
            var errorMessage = error;
            if (error.name === 'SecurityError') {
                errorMessage = 'You need to use HTTPS for selecting audio output ' +
                    'device: ' + error;
            }
            console.error(errorMessage);
            // Jump back to first output device in the list as it's the default.
            audioOutputSelect.selectedIndex = 0;
        });
    } else {
        console.warn('Browser does not support output device selection.');
    }
}

function changeAudioDestination() {
    var audioDestination = audioOutputSelect.value;
    attachSinkId(videoElement, audioDestination);
}

function gotStream(stream) {
    window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;
    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
}

function gotStream2(stream2) {
    window.stream = stream2
    videoElement2.srcObject = stream2;
    return navigator.mediaDevices.enumerateDevices();
}

function gotStream3(stream3) {
    window.stream = stream3
    videoElement3.srcObject = stream3;
    return navigator.mediaDevices.enumerateDevices();
}

$(function () {
    var valuePeriferico;
    var filas = $("#tblPerifericos tbody tr").length;
    //for (var i = 0; i <= filas; i++) {
    start_stream(ArrElem[0]);
    start(ArrElem[1]);
    start_stream_3(ArrElem[2]);
    //}
});

function start_stream(arg) {
    if (window.stream) {
        window.stream.getTracks().forEach(function (track) {
            track.stop();
        });
    }

    var audioSource = audioInputSelect.value;
    var videoSource = arg;
    var constraints = {
        audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
        video: { deviceId: videoSource ? { exact: videoSource } : undefined }
    };
    navigator.mediaDevices.getUserMedia(constraints).
        then(gotStream).then(gotDevices).catch(handleError);
}

function start(arg2) {
    if (window.stream) {
        window.stream.getTracks().forEach(function (track) {
            track.stop();
        });
    }
    var audioSource = audioInputSelect.value;
    var videoSource = arg2;
    var constraints = {
        audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
        video: { deviceId: videoSource ? { exact: videoSource } : undefined }
    };
    navigator.mediaDevices.getUserMedia(constraints).
        then(gotStream2).then(gotDevices).catch(handleError);
}

function start_stream_3(arg3) {
    if (window.stream) {
        window.stream.getTracks().forEach(function (track) {
            track.stop();
        });
    }
    var audioSource = audioInputSelect.value;
    var videoSource = arg3;
    var constraints = {
        audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
        video: { deviceId: videoSource ? { exact: videoSource } : undefined }
    };
    navigator.mediaDevices.getUserMedia(constraints).
        then(gotStream3).then(gotDevices).catch(handleError);
}

//audioInputSelect.onchange = start;
//audioOutputSelect.onchange = changeAudioDestination;
//videoSelect.onchange = start;
//start();

function handleError(error) {
    console.log('navigator.getUserMedia error: ', error);
}