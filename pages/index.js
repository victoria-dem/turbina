window.AudioContext = window.AudioContext || window.webkitAudioContext;
 
function play( snd, vol ) {
	var audioCtx = new AudioContext();
 
	var request = new XMLHttpRequest();
	request.open( "GET", snd, true );
	request.responseType = "arraybuffer";
	request.onload = function () {
		var audioData = request.response;
 
		audioCtx.decodeAudioData(
			audioData,
			function ( buffer ) {
				var smp = audioCtx.createBufferSource();
				smp.buffer = buffer;
				//создание объекта GainNode и его привязка
				var gainNode = audioCtx.createGain ? audioCtx.createGain() : audioCtx.createGainNode();
				smp.connect( gainNode );
				gainNode.connect( audioCtx.destination );
				gainNode.gain.value = vol;
				smp.start( 0 );
			},
			function ( e ) {
				alert( "Error with decoding audio data" + e.err );
			}
		);
	};
	request.send();
}
 
//URL до аудио файла (mp3, ogg, wav)
play( "sample.ogg", 0.3 );