self.addEventListener('message', function(e) {
    var message = e.data + 'Collection started for label: ' + e.data;
    self.postMessage(message);
    collect(e.data)
    debugger
})

function collect(label) {
    if (self.recognizer.isListening()) {
      return recognizer.stopListening();
    }
    if (label == null) {
      return;
    }
    recognizer.listen(async ({spectrogram: {frameSize, data}}) => {
      let vals = normalize(data.subarray(-frameSize * NUM_FRAMES));
      examples.push({vals, label});
      document.querySelector('#console').textContent =
          `${examples.length} examples collected`;
    }, {
      overlapFactor: 0.999,
      includeSpectrogram: true,
      invokeCallbackOnNoiseAndUnknown: true
    });
   }