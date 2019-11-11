<template>
  <div id="app">
      <div class="loader-overlay" v-if="isProcessing">
        <div class="loader"></div>
        <p>Processing...</p>
      </div>
      <div class="container mx-auto py-5">
        <div id="logo">App Screenshot Builder</div>
        <nav class="flex justify-center py-5 border-b">
          <a href="https://github.com/burakduganci/app-screenshot-builder" class="mr-2 pr-2" target="_blank"><img :src="require('@/assets/images/github-logo.png')" width="25"></a>
          <github-button href="https://github.com/burakduganci/app-screenshot-builder" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star burakduganci/app-screenshot-builder on GitHub">Star</github-button>
        </nav>

        <div id="app-wrapper" class="my-8 bg-white rounded">
          <div id="tabs">
            <div class="tab-body flex p-10 bg-gray-300 rounded shadow">
              <div>
                <button class="inline-block w-full mb-4 py-3 text-center bg-green-600 rounded text-white shadow hover:bg-green-700 outline-none" @click="downloadImage">Download</button>
                <div class="screenshot-wrapper rounded relative cursor-pointer" :style="{'background': bgColor.hex8, 'font-size': fontSize + 'px' }" @click="changeScreenshot">
                  <div class="editable-area flex justify-center items-center h-48 py-8 text-center overflow-hidden break-words">
                    <p :style="{'font-family': activeFont, 'font-size': fontSize + 'px', 'color': textColor.hex8 }">{{ text }}</p>
                  </div>
                  <img :src="require(`./assets/images/${phone}.png`)" alt="" class="phone-frame absolute bottom-0 w-full h-auto">
                  <div class="screenshot-cover" :style="ss ? {'background-image': 'url(' + ss + ')'} : ''"></div>
                </div>
              </div>

              <div class="settings-wrapper p-8 bg-gray-200 ml-4 rounded flex-1">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="text">
                    Text
                  </label>
                  <input class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="text" type="text" placeholder="Plase enter text" v-model="text">
                </div>
                <div class="flex mb-4">
                  <div class="flex-1 mr-3">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="text">
                      Font Size
                    </label>

                    <input class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="text" type="number" placeholder="Plase enter font size" v-model="fontSize">
                  </div>
                  <div class="flex-1 ml-3">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="text">
                        Text Color
                    </label>
                    <div class="flex">
                      <input class="shadow appearance-none border rounded-bl rounded-tl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="text" type="text" v-model="textColor.hex8" autocomplete="off">
                      <button class="shadow button py-3 px-4 bg-white rounded-br rounded-tr bg-gray-100" @click="() => this.textPickerStatus = !this.textPickerStatus">Pick</button>
                    </div>
                    <color-picker class="absolute z-10" v-model="textColor" v-show="textPickerStatus"></color-picker>
                  </div>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="text">
                    Phone
                  </label>

                  <div class="relative">
                    <select class="shadow block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" v-model="phone">
                        <option value="nexus">Nexus</option>
                        <option value="iphone">iPhone</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
                <div class="flex mb-4 justify-between">
                  <div class="flex-1 ">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="">
                      Font Family
                    </label>
                    <font-picker :api-key="'AIzaSyDwOiqTyeU9bNqQcaIEuwrilHg2U0L_15M'" :active-font="activeFont" :sort="'popularity'" @change="fontChange"></font-picker>
                  </div>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="">
                      Background (CSS or HEX)
                  </label>
                  <div class="solid-colors">
                    <div class="my-5">
                      <div class="flex">
                        <input class="shadow appearance-none border rounded-bl rounded-tl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="text" type="text" v-model="bgColor.hex8" autocomplete="off">
                        <button class="shadow button py-3 px-4 bg-white rounded-br rounded-tr bg-gray-100" @click="() => this.bgPickerStatus = !this.bgPickerStatus">Pick</button>
                      </div>
                      <color-picker :value="bgColor" class="absolute z-10" v-model="bgColor" v-show="bgPickerStatus"></color-picker>

                      <div class="static-bg-colors flex flex-wrap justify-between mt-5 pt-2 border-t">
                        <button class="bg-color-box w-24 h-20 my-3 mx-2 rounded shadow" :style="{'background': color}" v-for="(color, key) in staticGradients" :key="key" @click="setBgColor(color)"></button>
                      </div>
                    </div>
                  </div>
                  <input type="file" ref="ss" class="ss-file-input" @change="changeSS">
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="text-center text-white">
          created by <a class="text-blue-500" href="https://duganci.com" target="_blank">@burakduganci</a><br>
          <small class="text-gray-500">This app works best in Google Chrome browser.</small>
        </footer>
      </div>


      <!-- Screenshot -->
      <div id="screenshot" class="screenshot-wrapper relative overflow-hidden" :style="{'background': bgColor.hex8, 'font-size': fontSize + 'px' }">
        <div class="editable-area flex justify-center items-center h-48 py-8 text-center overflow-hidden">
          <p :style="{'font-family': activeFont, 'font-size': fontSize + 'px', 'color': textColor.hex8 }">{{ text }}</p>
        </div>
        <img :src="require(`./assets/images/${phone}.png`)" alt="" class="phone-frame absolute bottom-0 w-full h-auto">
        <div class="screenshot-cover" :style="ss ? {'background-image': 'url(' + ss + ')'} : ''"></div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import FontPicker from 'font-picker-vue';
import { Chrome } from 'vue-color'
import VueTinyTabs from 'vue-tiny-tabs'
import html2canvas from 'html2canvas';
import gradientColors from '@/configs/gradients';
import GithubButton from 'vue-github-button'


export default {
  data(){
    return ({
      text: "Welcome to App Screen Builder",
      activeFont: "Exo",
      phone: "nexus",
      fontSize: 32,
      textColor: {
        hex: "#ffffff",
        hex8: "#ffffffff"
      },
      bgColor: {
        hex: "#38a169",
        hex8: "#FF9B00ff"
      },
      textPickerStatus: false,
      bgPickerStatus: false,
      ss: "",
      isProcessing: false,
      staticGradients: gradientColors
    })
  },
  components: {
    FontPicker,
    'color-picker': Chrome,
    VueTinyTabs,
    GithubButton
  },
  methods:{
    fontChange(font){
      this.activeFont = font.family
    },
    setBgColor(color){
      this.bgColor.hex8 = color;
    },
    changeScreenshot(){
      this.$refs.ss.click()
    },
    async changeSS(event){
      console.log(this.getBaseUrl(event.target.files[0]));
      this.ss = await this.getBaseUrl(event.target.files[0]);
    },
    getBaseUrl(file)  {
        return new Promise((resolve) => {
          var reader = new FileReader();
          var baseString;
          reader.onloadend = function () {
              baseString = reader.result;
              resolve(baseString);
          };
          reader.readAsDataURL(file);
        })
    },
    downloadImage(){
      this.isProcessing = true;
      try {
        setTimeout(() => {
          html2canvas(document.querySelector("#screenshot"), {
            backgroundColor: null
          }).then((canvas) => {
            this.saveAs(canvas.toDataURL(), 'screenshot.png')
            this.isProcessing = false
          });
        }, 100)
      } catch (error) {
        this.isProcessing = false
        alert("An error occured, please try again.");
        console.log(error);
      }
      
    },

    saveAs(uri, filename) {
      var link = document.createElement('a');
      if (typeof link.download === 'string') {
          link.href = uri;
          link.download = filename;

          //Firefox requires the link to be in the body
          document.body.appendChild(link);

          //simulate click
          link.click();

          //remove the link when done
          document.body.removeChild(link);
      } else {
          window.open(uri);
      }
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Fugaz+One&display=swap');

  #app{
    width:1280px;
    margin:0 auto;

    .container{
      width:100%;
      max-width: inherit;
    }
  }
  .screenshot-wrapper{
    width:500px;
    height:899px;
  }

  #screenshot{
    position:absolute;
    left:-9999px;
  }

  .ss-file-input{
    opacity:0;
    position:absolute;
    z-index: -9990;
    top:-9999px;
  }

  .screenshot-cover{
    width:72%;
    height:71%;
    position:absolute;
    bottom:0;
    left:50%;
    transform:translateX(-50%);
    background-size: 100%;
    background-repeat: no-repeat
  }

  .tinytabs .tabs {
    display: flex;
    flex-flow: row wrap;
    @apply border-b 
  }
  .tinytabs .tabs .tab .close {
    padding-left: 5px;
  }
  .tinytabs .tabs .tab {
    margin: 0 3px 0 0;
    @apply bg-white;
    display: block;
    padding: 6px 15px;
    text-decoration: none;
    color: #666;
    border-radius: 3px 3px 0 0;
  }
  .tinytabs .section {
    overflow: hidden;
    padding: 15px;
    clear: both;
    border-radius: 3px;
  }
  .tinytabs .tab.sel {
    @apply bg-gray-200;
    color: #333;
    font-weight:bold;
    text-shadow: none;
    margin-bottom:-1px
  }

  .loader-overlay{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:3;
    background: rgba(0, 0, 0, 0.6);
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    color:white;
  }
  nav{
    border-color:#5f5f5f;
  }
  #logo{
    font-size:35px;
    font-weight:bold;
    text-align:center;
    font-family: 'Fugaz One', cursive;
    color:white;
  }
</style>
