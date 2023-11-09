
<template>
  <div>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

      <link
        href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Poppins:wght@100;300;400;600;700&family=Work+Sans:wght@100;200;400;500;600;800&display=swap"
        rel="stylesheet"
      />
    </head>

    <div class="hero">
      <div
        v-bind:class="[proceedclicked ? 'hero-left-add' : 'hero-left']"
      >
        <div
          v-bind:class="[
            proceedclicked ? 'hero-left-content hide' : 'hero-left-content',
          ]"
        >
          <select
            class="select-first"
            v-model="selectedLanguage"
            @change="changeLanguage"
            @load="initial"
          >
            <option value="" disabled selected>Select a language</option>
            <option
              v-for="(audio, language) in audios"
              :key="language"
              :value="language"
            >
              {{ language }}
            </option>
          </select>

        
          <button class="proceed" v-on:click="proceedClicked">Proceed</button>
        </div>
      </div>
      <div
        v-bind:class="[
          proceedclicked ? 'parent-container' : 'parent-container hide',
        ]"
      >
        <div class="progress-bar">
          <!-- <AudioPlayer  v-bind:url="audiolanguage" playerid="audio-player"/>
          <select v-model = "audiolanguage" class="language" v-on:change = "change">
            <option value="" selected>Selected Languages</option>
            <option value="English">English</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Tamil">Tamil</option>
            <option value="Teluhu">Teluhu</option>
            <option value="Kannada">Kannada</option>
            <option value="Hindi">Hindi</option>
            </select> -->

          <!-- <AudioPlayer v-model = "audiolanguage" :url="audiolanguage" :selectedLanguage="selectedLanguage" playerid="audio-player" />
        <select v-model="selectedLanguage" class="language" @change="changeLanguage">
          <option value="" selected >Select Language</option>
          <option v-for="(audio, language) in audios" :key="language" :value="audio">{{ language }}</option>
          </select> -->

          <AudioPlayer :selectedLanguage="selectedLanguage" :audios="audios" />

          <select
            v-model="selectedLanguage"
            @change="changeLanguage"
            @load="initial"
          >
            <option disabled value="">Select a language</option>
            <option
              v-for="(audio, language) in audios"
              :key="language"
              :value="language"
            >
              {{ language }}
            </option>
          </select>
        </div>
        <div class="parent-heading">Satyam vada | dharmam chara</div>
        <div class="parent">
          <input
            type="text"
            class="fname"
            placeholder="First name"
            v-model="fname"
          />

          <span :class="[errors.fname ? 'show-error' : 'hide-error']"
            >First name is empty</span
          >
          <input
            type="text"
            class="lname"
            placeholder="Last name"
            v-model="lname"
          />

          <input
            type="text"
            class="email"
            placeholder="Email"
            v-model="email"
          />

          <!-- dob sample -->

          <!-- dob end -->
          <div class="dob-select-grp">
            <!-- <date-picker
                v-model="dob"
                valueType="format"
                class="dob"
                placeholder="DOB"
                  ></date-picker> -->
            <VueDatePicker
              class="dob"
              v-model="dob"
              v-bind:enable-time-picker="false"
              auto-apply
              placeholder="DOB"
            >
            </VueDatePicker>
            <!-- <span>DOB</span> -->
            <!-- <input type="text" class="dob" placeholder="DOB"  /> -->
            <div class="select-grp">
              <img src="../components/mal.png" class="select-img" />
              <img src="../components/fm.png" class="select-img" />
              <div class="select-grp--rad">
                <input
                  type="radio"
                  name="select"
                  id=""
                  value="male"
                  v-model="gender"
                />
                <input
                  type="radio"
                  name="select"
                  id=""
                  value="female"
                  v-model="gender"
                />
              </div>
            </div>
          </div>
          <!-- <div class="div5"> </div> -->
          <select class="count" v-model="country">
            <option disabled value="">Select a country</option>
            <!-- Placeholder option -->

            <option
              v-for="country in countries"
              :key="country.id"
              :value="country.name"
            >
              {{ country.name }}
            </option>
          </select>

          <div class="phone-grp">
            <div class="country-flag">
              <img class="cou" v-bind:src="showFlag(country)" />
            </div>

            <input v-model="phone" type="text" class="phone" />
          </div>

          <div class="source-grp">
            <div class="search-icon">🔍</div>
            <div class="source-grp-1">
              Social media
              <input
                style="width: 1vw; height: 4vh; background: none"
                type="radio"
                v-model="reference"
                name="source"
                value="social_media"
              />
            </div>
            <div class="source-grp-2">
              Reference
              <input
                style="width: 1vw; height: 4vh; background: none"
                type="radio"
                v-model="reference"
                name="source"
                value="reference"
              />
            </div>
            <div class="source-grp-3">
              News
              <input
                style="width: 1vw; height: 4vh; background: none"
                type="radio"
                v-model="reference"
                name="source"
                value="news"
              />
            </div>
          </div>

          <!-- <select class="language">
            <option value="" selected>Selected Languages</option>
            <option value="English">English</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Tamil">Tamil</option>
            <option value="Teluhu">Teluhu</option>
            <option value="Kannada">Kannada</option>
            <option value="Hindi">Hindi</option>
            </select> -->
            <div>
            <VueMultiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag" v-bind:searchable = "false"></VueMultiselect>
          </div>
         

            
            

            
          <input
            type="text"
            class="special_remarks"
            placeholder="Special remarks"
            v-model="special_remarks"
            v-on:change="specialCount"
            maxlength="500"
          />
          <span class="special-count">{{ special_remarks_count }}/500 </span>

          <input
            v-on:click="register"
            class="submit"
            type="submit"
            value="Submit"
          />
        </div>

        <div class="footer">
          <div class="footer-sub-grp">
            <span class="footer-update">39997</span>
            <span class="footer-head">Total meditators</span>
          </div>
          <div class="footer-sub-grp">
            <span class="footer-update"> 1136 </span>
            <span class="footer-head">Working numbers</span>
          </div>
          <div class="footer-sub-grp">
            <span class="footer-update">39850</span
            ><span class="footer-head">Benefactories</span>
          </div>
          <div class="footer-sub-grp">
            <span class="footer-update">1648</span>
            <span class="footer-head">Classes</span>
          </div>
        </div>
      </div>
      <div v-bind:class="[toggle_submit ? 'pop' : 'pop hide']">
        <div class="pop-head">Confirm Email & Phone Number ?</div>
        <div class="pop-content">
          <span class="message"> {{ phone }} & {{ email }}</span>
          <span class="prompt">
            Would you like to edit the Email & PhoneNumber ?
          </span>
          <div class="pop-btn">
            <button class="ok" v-on:click="submitToExpress">OK</button>

            <button class="edit" v-on:click="editpress">Edit</button>
          </div>
        </div>
      </div>

      <!-- error otp -->
      <div v-bind:class="[close_btn ? 'pop' : 'pop hide']">
        <div class="pop-head">Confirm Email & Phone Number ?</div>
        <div class="pop-content">
          <span class="message">User already exists</span>

          <div
            class="pop-btn"
            style="width: 100%; display: flex; justify-content: center"
          >
            <button class="ok" v-on:click="closeExist">Ok</button>
          </div>
        </div>
      </div>

      <!-- otp -->
      <div v-bind:class="[show_otp_popup ? 'otp' : 'otp hide']">
        <div class="otp-head">Enter otp</div>

        <div class="otp-content">
          <div class="otp-input-grp">
            <!-- <input v-model="otpInput1"  maxlength="1" v-on:input="focusNext(1)" id='otp-input' type="text">
                      <input  v-model="otpInput2" type="text" maxlength="1" v-on:input="focusNext(2)" id='otp-input'>
                      <input  v-model="otpInput3" type="text" maxlength="1" v-on:input="focusNext(3)" id='otp-input'>
                        <input v-model="otpInput4" type="text" maxlength="1" id='otp-input'> -->
            <input
              v-model="otpInput1"
              maxlength="1"
              v-on:input="focusNext(1, $event)"
              id="otp-input"
              type="text"
            />
            <input
              v-model="otpInput2"
              maxlength="1"
              v-on:input="focusNext(2, $event)"
              id="otp-input"
              type="text"
            />
            <input
              v-model="otpInput3"
              maxlength="1"
              v-on:input="focusNext(3, $event)"
              id="otp-input"
              type="text"
            />
            <input
              v-model="otpInput4"
              maxlength="1"
              id="otp-input"
              type="text"
            />
          </div>
          <div class="otp-timer">
            {{ message }}
          </div>

          <div class="otp-btn-grp">
            <button class="otp-submit" v-on:click="resendOtp">Resend</button
            ><button class="resend" v-on:click="submitOtp">Submit</button>
          </div>
        </div>
      </div>

      <!-- show success card -->
      <div
        v-bind:class="[show_registration_success ? 'overlay' : 'overlay hide']"
      >
        <div class="registration-card">
          <div class="card-div-top">
            <div class="card-number">
              <p>card number</p>
              <h1>10040</h1>
            </div>
            <div class="card-logo-container">
              <img
                class="card-logo"
                src="../components/logo.png"
                alt="Thasmai logo"
              />
            </div>
          </div>

          <div class="card-div-middle">
            <img class="chip" src="../components/chip.png" alt="chip" />
            <h3>Registration Successful</h3>
            <button>OK</button>
          </div>

          <div class="card-div-bottom">
            <div class="cardholder-group">
              <div class="cardholder-name">
                <p>{Cardholder Name}</p>
                <h2>{{ this.fname }}{{ this.lname }}</h2>
              </div>
              <div class="cardholder-img-container">
                <img
                  class="cardholder-img"
                  src="../components/user.png"
                  alt="User logo"
                />
              </div>
            </div>

            <div class="validity">
              <p>VALID THRU</p>
              <p>11/27</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import VueMultiselect from 'vue-multiselect'

import AudioPlayer from "./AudioPlayer.vue";
import VueSocketIO from 'vue-socket.io';
export default {
  name: "RegUser",
  components: { VueDatePicker, AudioPlayer,VueMultiselect},

  data() {
  
    return {
      // audiolanguage : "https://dl.sndup.net/kr6x/TSL_ENGLISH.mp4",
      value: [
          // { name: 'Javascript', code: 'js' }
        ],
        options: [
          { name: 'Vue.js', code: 'vu' },
          { name: 'Javascript', code: 'js' },
          { name: 'Open Source', code: 'os' }
        ],
      special_remarks_count: 0,
      proceedclicked: false,
      selectedLanguage: "",
      message: "1:30",
      show_registration_success: false,
      show_otp_popup: false,
      close_btn: false,
      toggle_submit: false,
      audios: {
        english: "https://dl.sndup.net/kr6x/TSL_ENGLISH.mp4",
        malayalam: "https://dl.sndup.net/cr76/TSL_Malayalam.mp4",
        hindi: "https://dl.sndup.net/rrqr/TSL_Hindi.mp4",
        kannada: "https://dl.sndup.net/jrr7/TSL_Kannada.mp4",
        tamil: "https://dl.sndup.net/vtdn/TSL_Tamil.mp4",
        telugu: "https://dl.sndup.net/cxfj/TSL_Telugu.mp4",
      },
      otpInput1: "",
      otpInput2: "",
      otpInput3: "",
      otpInput4: "",
      otp: "",
      countries: [],
      country_code: "",
      errors: {},
      fname: "",
      lname: "",
      gender: "",
      email: "",
      dob: "",
      country: "India",
      phone: "",
      reference: "",
      languages: "",
      special_remarks: "",
    };
  },
  watch: {
    special_remarks(newVal) {
      // Update the character count whenever 'special_remarks' changes
      this.special_remarks_count = newVal.length;
    },
  },
  created() {
    try {
      axios
        .get("http://89.47.164.122:5000/api/registrations/countrieslist")
        .then((res) => {
          console.log(res.data);
          this.countries = res.data;
        });
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
    },

    proceedClicked() {
      this.proceedclicked = true;
    },
    register() {
      // validaton goes here
      this.errors = {};
      if (this.fname === "") {
        this.errors.fname = "fname";
      }
      this.toggle_submit = true;

      console.log(
        this.fname,
        this.lname,
        this.reference,
        this.phone,
        this.gender
      );
    },

    editpress() {
      this.toggle_submit = false;
    },
    focusNext(index, event) {
      const value = event.target.value;
      if (value.length === 1 && index < 4) {
        const nextInput = this.$refs[`otp-input-${index + 1}`];
        if (nextInput) {
          // Use $nextTick to ensure the next input is fully rendered before focusing
          this.$nextTick(() => {
            nextInput.focus();
          });
        }
      }
    },
    submitToExpress() {
      console.log('submit')
      this.toggle_submit = false;
      axios
        .post("http://89.47.164.122:5000/api/registrations/registerUser", {
          first_name: this.fname,
          last_name: this.lname,
          email: this.email,
          phone: this.phone,
          DOB: this.dob,
          gender: this.gender,
          country: this.country,
          reference: this.reference,
          languages: this.language,
          remark: this.special_remarks,
        })
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            this.show_otp_popup = true;
          }
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status) {
            this.close_btn = true;
          }
        });
    },
    submitOtp() {
      this.otp =
        this.otpInput1 + this.otpInput2 + this.otpInput3 + this.otpInput4;
      console.log(this.otp, "Otp");
      axios
        .post("http://89.47.164.122:5000/api/registrations/verify_otp", {
          OTP: this.otp,
          phone: this.phone,
        })
        .then((res) => {
          console.log(res);

          if (res.status === 200) {
            this.show_otp_popup = false;
            this.show_registration_success = true;
          }
          else{
            this.message = "Invalid otp";
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            this.message = "Invalid otp";
          }
        });
    },
    resendOtp() {
      console.log("resend");

      this.show_otp_popup = false;
      this.otpInput1 = "";
      this.otpInput2 = "";
      this.otpInput3 = "";
      this.otpInput4 = "";

      this.show_otp_popup = true;
    },
    changeLanguage() {
      // Change the audio source when a different language is selected
      console.log(this.selectedLanguage); // Log the selected language (optional)
      this.audiolanguage = this.audios[this.selectedLanguage];
    },
    changeDate() {
      this.dob = this.dob.split(",")[0];
    },
    closeExist() {
      this.close_btn = false;
    },
    initial() {
      this.selectedLanguage = "english";
    },
    showFlag(country_name) {
      let country = this.countries.find((value) =>
        value.name.startsWith(country_name)
      );

      if (country && country.phonecode) {
        this.country_code = country.phonecode;
        return country.flag;
      } else {
        // Handle cases where the country or phonecode is undefined
        return ""; // Return a default value or handle the situation accordingly
      }
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped >

@import "./reg.css";

</style>
