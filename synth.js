if(typeof webkitAudioContext !== 'undefined'){
  var Synth = function(link, wave, freq){
    var self = this;
    this.link = link;
    this.wave = wave;
    this.freq = freq;
    this.context = new webkitAudioContext();
    this.link.addEventListener('mousedown', function(e){
      e.preventDefault();
      self.startPlaying();
    });
    document.body.addEventListener('mouseup', function(e){
      self.stopPlaying();
    });
    this.link.addEventListener('click', function(e){
      e.preventDefault();
    });
  }
  Synth.prototype.startPlaying = function(){
    if(typeof this.oscillator === 'undefined'){
      this.oscillator = this.context.createOscillator();
      this.oscillator.type = this.wave.value;
      this.oscillator.frequency.value = this.freq.value;
      this.oscillator.connect(this.context.destination);
      this.oscillator.noteOn(0);
      this.link.innerHTML = "Stop";
    }
  }
  Synth.prototype.stopPlaying = function(){
    if(typeof this.oscillator !== 'undefined'){
      this.oscillator.noteOff(0);
      delete this.oscillator;
      this.link.innerHTML = "Play";
    }
  }
}

window.onload = function(){
  var link = document.getElementById('play'),
      wave = document.getElementById('wave'),
      freq = document.getElementById('frequency'),
      synth;

  if(typeof Synth !== 'undefined'){
    new Synth(link, wave, freq);
  }else{
    document.getElementById('synth').innerHTML = "Sorry, your browser does not support the Web Audio API. Please try Chrome or Safari."
  }
}
