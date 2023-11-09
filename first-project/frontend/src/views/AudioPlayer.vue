<template>
  <div id="audio-player-root">
    <!-- Hide the default audio player -->
    <div>
      <audio style="display: none" ref="player" :id="playerid">
        <!-- <source :src="url" type="audio/mpeg" /> -->
        <!-- <source :src="selectedLanguage ? audios[selectedLanguage] : ''" type="audio/mpeg" /> -->
        <audio
          ref="player"
          :src="selectedLanguage ? audios[selectedLanguage] : audios['english']"
          controls
        ></audio>
      </audio>
    </div>

    <div
      class="w-3/4 bg-gray-200 border border-gray-300 px-2 pt-2 mt-4 shadow-md"
      style="margin: auto"
    >
      <div id="player-row" class="inline-flex flex-wrap w-full max-w-5xl">
        <div id="button-div" class="flex-initial pr-3">
          <svg
            @click="toggleAudio()"
            v-show="!isPlaying"
            class="play-button text-gray-400"
            :class="{
              'text-orange-600': audioLoaded,
              'hover:text-orange-400': audioLoaded,
              'cursor-pointer': audioLoaded,
            }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            @click="toggleAudio()"
            v-show="isPlaying"
            class="play-button text-orange-400 hover:text-orange-400 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div id="progress-bar">
          <div class="range-div">
            <input
              v-model="playbackTime"
              type="range"
              min="0"
              :max="audioDuration"
              class=""
              id="position"
              name="position"
            />

            <!-- Show loading indicator until audio has been loaded -->

            <div
              v-show="!audioLoaded"
              class="w-full absolute top-0 bottom-0 right-0 left-0 px-2 pointer-events-none"
              style="color: #94bcec"
            >
              Loading please wait...
            </div>

            <div
              v-show="audioLoaded"
              class="flex w-full justify-between absolute top-0 bottom-0 right-0 left-0 px-2 pointer-events-none"
            >
              <!-- <span class="text-sm" style="color: #94bcec">{{ elapsedTime }}</span>
                            <span class="text-sm" style="color: #94bcec">{{ totalTime }}</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- outer gray border -->
  </div>
  <!-- white bg -->
  <!-- </div> invalid end tag -->
  <!-- root -->
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AudioPlayer",
  // props: ["url", "playerid"],
  props: {
    selectedLanguage: String,
    audios: Object,
  },
  /**
   * playbackTime = local var that syncs to audio.currentTime
   * audioDuration = duration of audio file in seconds
   * isPlaying = boolean (true if audio is playing)
   *
   **/
  data() {
    return {
      playbackTime: 0,
      audioDuration: 100,
      audioLoaded: false,
      isPlaying: false,
      //     elapsedTime: '00:00',
      // totalTime: '00:00'
    };
  },
  watch: {
    selectedLanguage(newVal) {
      // When the selected language changes, update the audio source
      const audio = this.$refs.player;
      if (audio) {
        audio.src = newVal ? this.audios[newVal] : "";
        audio.load(); // Reload the audio with the new source
      }
    },
  },
  methods: {
    changeLanguage() {
      // Change the audio source when a different language is selected
      const audio = this.$refs.player;
      if (audio) {
        audio.src = this.selectedLanguage
          ? this.audios[this.selectedLanguage]
          : "";
        audio.load(); // Reload the audio with the new source
      }
    },

    //Set the range slider max value equal to audio duration
    initSlider() {
      var audio = this.$refs.player;
      if (audio) {
        this.audioDuration = Math.round(audio.duration);
      }
    },
    updateTimeValues() {
      this.elapsedTime = this.convertTime(audio.currentTime);
      this.totalTime = this.convertTime(audio.duration);
    },
    //Convert audio current time from seconds to min:sec display
    convertTime(seconds) {
      const format = (val) => `0${Math.floor(val)}`.slice(-2);
      var hours = seconds / 3600;
      var minutes = (seconds % 3600) / 60;
      return [minutes, seconds % 60].map(format).join(":");
    },
    //Show the total duration of audio file
    totalTime() {
      var audio = this.$refs.player;
      if (audio) {
        var seconds = audio.duration;
        return this.convertTime(seconds);
      } else {
        return "00:00";
      }
    },
    //Display the audio time elapsed so far
    elapsedTime() {
      var audio = this.$refs.player;
      if (audio) {
        var seconds = audio.currentTime;
        return this.convertTime(seconds);
      } else {
        return "00:00";
      }
    },
    //Playback listener function runs every 100ms while audio is playing
    playbackListener(e) {
      var audio = this.$refs.player;
      //Sync local 'playbackTime' var to audio.currentTime and update global state
      this.playbackTime = audio.currentTime;

      //console.log("update: " + audio.currentTime);
      //Add listeners for audio pause and audio end events
      audio.addEventListener("ended", this.endListener);
      audio.addEventListener("pause", this.pauseListener);
    },
    //Function to run when audio is paused by user
    pauseListener() {
      this.isPlaying = false;
      this.listenerActive = false;
      this.cleanupListeners();
    },
    //Function to run when audio play reaches the end of file
    endListener() {
      this.isPlaying = false;
      this.listenerActive = false;
      this.cleanupListeners();
    },
    //Remove listeners after audio play stops
    cleanupListeners() {
      var audio = this.$refs.player;
      audio.removeEventListener("timeupdate", this.playbackListener);
      audio.removeEventListener("ended", this.endListener);
      audio.removeEventListener("pause", this.pauseListener);
      //console.log("All cleaned up!");
    },
    toggleAudio() {
      var audio = this.$refs.player;
      //var audio = document.getElementById("audio-player");
      if (audio.paused) {
        audio.play();
        this.isPlaying = true;
      } else {
        audio.pause();
        this.isPlaying = false;
      }
    },
    //     loadAudio() {
    //   const audio = this.$refs.audio;
    //   if (audio) {
    //     audio.load();
    //     audio.addEventListener('loadeddata', () => {
    //       // Audio loaded successfully
    //       console.log('Audio loaded successfully');
    //     });
    //     audio.addEventListener('error', () => {
    //       // Handle audio loading error
    //       console.error('Error loading audio');
    //     });
    //   }
    // }
  },
  // mounted: function() {
  //     console.log(this.selectedLanguage,'audio')
  //     console.log(this.selectedLanguage ? this.audios[selectedLanguage] : this.audios['english'])

  //     // this.loadAudio();
  //   // nextTick code will run only after the entire view has been rendered
  //   this.$nextTick(function() {

  //     var audio=this.$refs.player;
  //     //Wait for audio to load, then run initSlider() to get audio duration and set the max value of our slider
  //     // "loademetadata" Event https://www.w3schools.com/tags/av_event_loadedmetadata.asp
  //     audio.addEventListener(
  //       "loadedmetadata",
  //       function(e) {
  //         this.initSlider();
  //       }.bind(this)
  //     );
  //     // "canplay" HTML Event lets us know audio is ready for play https://www.w3schools.com/tags/av_event_canplay.asp
  //     audio.addEventListener(
  //       "canplay",
  //       function(e) {
  //         this.audioLoaded=true;
  //       }.bind(this)
  //     );
  //     //Wait for audio to begin play, then start playback listener function
  //     this.$watch("isPlaying",function() {
  //       if(this.isPlaying) {
  //         var audio=this.$refs.player;
  //         this.initSlider();
  //         //console.log("Audio playback started.");
  //         //prevent starting multiple listeners at the same time
  //         if(!this.listenerActive) {
  //           this.listenerActive=true;
  //           //for a more consistent timeupdate, include freqtimeupdate.js and replace both instances of 'timeupdate' with 'freqtimeupdate'
  //           audio.addEventListener("timeupdate",this.playbackListener);
  //         }
  //       }
  //     });
  //     //Update current audio position when user drags progress slider
  //     this.$watch("playbackTime",function() {
  //         var audio=this.$refs.player;
  //     var diff=Math.abs(this.playbackTime-this.$refs.player.currentTime);

  //       //Throttle synchronization to prevent infinite loop between playback listener and this watcher
  //       if(diff>0.01) {
  //         this.$refs.player.currentTime=this.playbackTime;
  //       }
  //     });
  //   });
  // }

  mounted: function () {
    this.$nextTick(function () {
      // Access the audio element
      var audio = this.$refs.player;

      // Wait for the audio to load and set up necessary event listeners
      audio.addEventListener("canplay", () => {
        // The audio has loaded and is ready for playback
        this.initSlider(); // Get audio duration and set the max value of the slider

        // Update the 'audioLoaded' flag to indicate that the audio has loaded
        this.audioLoaded = true;
      });

      // Event listener for the start of audio playback
      this.$watch("isPlaying", () => {
        if (this.isPlaying) {
          // Start playback listener function only if not already active
          if (!this.listenerActive) {
            this.listenerActive = true;
            audio.addEventListener("timeupdate", this.playbackListener);
          }
        }
      });

      // Watch for changes in playbackTime to update the audio position
      this.$watch("playbackTime", () => {
        const diff = Math.abs(this.playbackTime - audio.currentTime);
        if (diff > 0.01) {
          audio.currentTime = this.playbackTime;
        }
      });
    });
  },
};
</script>

<style>
/* Play/Pause Button */
.play-button {
  height: 30px;
}

input[type="range"] {
  position: relative;
  top: -1vw;
  margin: auto;
  height: 1vw;
  -webkit-appearance: none;
  position: relative;
  overflow: hidden;
  width: 90%;
  cursor: pointer;
  outline: none;
  border-radius: 0; /* iOS */
  background-color: violet !important;
}
input[type="range"]:focus {
  outline: none;
}
::-webkit-slider-runnable-track {
  background: #fff;
}
/*
 * 1. Set to 0 width and remove border for a slider without a thumb
 */
::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0; /* 1 */
  height: 40px;
  background: #fff;
  box-shadow: -100vw 0 0 100vw dodgerblue;
  border: none; /* 2px solid #999; */
}
::-moz-range-track {
  height: 40px;
  background: #ddd;
}
::-moz-range-thumb {
  background: #fff;
  height: 40px;
  width: 0; /* 20px; */
  border: none; /* 3px solid #999; */
  border-radius: 0 !important;
  box-shadow: -100vw 0 0 100vw dodgerblue;
  box-sizing: border-box;
}
::-ms-fill-lower {
  background: rgb(0, 72, 143);
}
::-ms-thumb {
  background: #fff;
  border: 2px solid #999;
  height: 40px;
  width: 20px;
  box-sizing: border-box;
}
::-ms-ticks-after {
  display: none;
}
::-ms-ticks-before {
  display: none;
}
::-ms-track {
  background: #ddd;
  color: transparent;
  height: 40px;
  border: none;
}
::-ms-tooltip {
  display: none;
}
</style>
