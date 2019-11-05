<template>
  <div id="app">
      <div class="container mx-auto py-5">
        <header class="flex justify-between py-4 px-4 bg-green-300 rounded">
          <div id="logo">App Screen Builder</div>
          <nav>
            <a href="#">Test</a>
          </nav>
        </header>

        <div id="app-wrapper" class="py-4 my-4 bg-white rounded">
          <div id="tabs">
            <div id="tab-header">
              <ul class="flex border-b">
                <li class="-mb-px mr-1">
                  <a class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">Screenshot 1</a>
                </li>
                <li class="mr-1">
                  <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Screenshot 2</a>
                </li>
                <li class="mr-1">
                  <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#"> Screenshot3</a>
                </li>
              </ul>
            </div>

            <div class="tab-body flex p-4 bg-gray-300 rounded-bl rounded-br">
              <div class="screenshot-wrapper bg-green-600 rounded relative">
                <div class="editable-area flex justify-center items-center h-48 py-8">
                  <p :style="{'font-family': activeFont, 'font-size': fontSize + 'px'}">{{ text }}</p>
                </div>
                <img :src="require('./assets/images/bg-android.png')" alt="" class="phone-frame absolute bottom-0 w-full h-auto">
              </div>

              <div class="settings-wrapper p-8 bg-gray-200 ml-4 rounded flex-1">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="text">
                    Text
                  </label>
                  <input class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="text" type="text" placeholder="Plase enter text" v-model="text">
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="text">
                    Phone
                  </label>

                  <Select />
                </div>
                <div class="flex mb-4 justify-between">
                  <div class="flex-1 mr-3">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="text">
                      Font Size
                    </label>

                    <input class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="text" type="number" placeholder="Plase enter font size" v-model="fontSize">
                  </div>
                  <div class="flex-1 ml-3">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="">
                      Font Family
                    </label>
                    <font-picker :api-key="'AIzaSyDwOiqTyeU9bNqQcaIEuwrilHg2U0L_15M'" :active-font="activeFont" :sort="'popularity'" @change="fontChange"></font-picker>
                  </div>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="text">
                      Text Color
                  </label>
                  <color-picker v-model="colors"></color-picker>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Select from './components/Select';
import Vue from 'vue';
import FontPicker from 'font-picker-vue';
import { Chrome } from 'vue-color'

export default {
  data(){
    return ({
      text: "",
      activeFont: "Exo",
      fontSize: 14,
      colors: {
        hex: '#194d33',
        hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
        rgba: { r: 25, g: 77, b: 51, a: 1 },
        a: 1
      }
    })
  },
  components: {
    Select,
    FontPicker,
    'color-picker': Chrome
  },
  methods:{
    fontChange(font){
      this.activeFont = font.family
    }
  }
}
</script>

<style lang="scss">
  .screenshot-wrapper{
    width:500px;
    height:899px;
  }
</style>
