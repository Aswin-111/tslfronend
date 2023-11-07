/* eslint-disable */
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
      <div class="hero-left"></div>
      <div class="parent-container">
        <div class="progress-bar"></div>
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
  
          <input type="text" class="email" placeholder="Email" v-model="email" />
  
          <!-- dob sample -->
  
          <!-- dob end -->
          <div class="dob-select-grp">
                <!-- <date-picker
                v-model="dob"
                valueType="format"
                class="dob"
                placeholder="DOB"
                ></date-picker> -->
                <VueDatePicker class="dob" v-model="dob" v-bind:enable-time-picker = "false" auto-apply ></VueDatePicker>

            <!-- <input type="text" class="dob" placeholder="DOB"  /> -->
            <div
              class="select-grp"
              style="height: 1vh; display: flex; flex-direction: column"
            >
              <img src="select.png" class="select-img" />
              <img src="select.png" class="select-img" />
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
  
          <select class="language">
            <option value="" selected>Selected Languages</option>
            <option value="English">English</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Tamil">Tamil</option>
            <option value="Teluhu">Teluhu</option>
            <option value="Kannada">Kannada</option>
            <option value="Hindi">Hindi</option>
          </select>
  
          <input
            type="text"
            class="special_remarks"
            placeholder="Special remarks"
            v-model="special_remarks"
          />
  
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
            <input v-model="otpInput4" maxlength="1" id="otp-input" type="text" />
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
  // import {ref} from vue;
  import axios from "axios";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
  
  export default {
    name: "RegUser",
    components: {VueDatePicker},
  
    data() {
      return {
        message: "1:30",
        show_registration_success: false,
        show_otp_popup: false,
        close_btn: false,
        toggle_submit: false,
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
    created() {
      try {
        axios
          .get("http://localhost:3000/api/registrations/countrieslist")
          .then((res) => {
            console.log(res.data);
            this.countries = res.data;
          });
      } catch (err) {
        console.log(err);
      }
    },
    methods: {
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
        this.toggle_submit = false;
        axios
          .post("http://localhost:3000/api/registrations/registerUser", {
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
          .post("http://localhost:3000/api/registrations/verify_otp", {
            OTP: this.otp,
            phone: this.phone,
          })
          .then((res) => {
            console.log(res);
  
            if (res.status === 200) {
              this.show_otp_popup = false;
              this.show_registration_success = true;
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
      changeDate(){
        this.dob = this.dob.split(',')[0];
      },
      closeExist() {
        this.close_btn = false;
      },
      showFlag(country_name) {
        // this.phone = `${country.phonecode}`
        return this.countries.filter((value) =>
          value.name.startsWith(country_name)
        )[0].flag;
      },
    },
  };
  </script>
  
  <style>
  @import "./reg.css";
  </style>
  