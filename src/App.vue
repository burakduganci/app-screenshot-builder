<template>
  <div id="app">
      <div class="container mx-auto py-5">
        <!-- <header class="flex justify-between py-4 px-4 bg-green-300 rounded">
          <div id="logo">App Screen Builder</div>
          <nav>
            <a href="#">Test</a>
          </nav>
        </header> -->

        <div id="app-wrapper" class="py-4 my-4 bg-white rounded">
          <div id="tabs">
            <div class="tab-body flex p-4 bg-gray-300 rounded-bl rounded-br">
              <div>
                <button class="inline-block w-full mb-4 py-3 text-center bg-green-600 rounded text-white shadow hover:bg-green-700 outline-none" @click="downloadImage">Download</button>
                <div class="screenshot-wrapper rounded relative cursor-pointer" :style="{'background': bgColor.hex8, 'font-size': fontSize + 'px' }" @click="changeScreenshot">
                  <div class="editable-area flex justify-center items-center h-48 py-8 text-center overflow-hidden">
                    <p :style="{'font-family': activeFont, 'font-size': fontSize + 'px', 'color': textColor.hex8 }">{{ text }}</p>
                  </div>
                  <img :src="require('./assets/images/bg-android.png')" alt="" class="phone-frame absolute bottom-0 w-full h-auto">
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

                  <Select />
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
                      <color-picker class="absolute z-10" v-model="bgColor" v-show="bgPickerStatus"></color-picker>

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
      </div>


      <!-- Screenshot -->
      <div id="screenshot" class="screenshot-wrapper relative overflow-hidden" :style="{'background': bgColor.hex8, 'font-size': fontSize + 'px' }">
        <div class="editable-area flex justify-center items-center h-48 py-8 text-center overflow-hidden">
          <p :style="{'font-family': activeFont, 'font-size': fontSize + 'px', 'color': textColor.hex8 }">{{ text }}</p>
        </div>
        <img :src="require('./assets/images/bg-android.png')" alt="" class="phone-frame absolute bottom-0 w-full h-auto">
        <div class="screenshot-cover" :style="ss ? {'background-image': 'url(' + ss + ')'} : ''"></div>
      </div>
  </div>
</template>

<script>
import Select from './components/Select';
import Vue from 'vue';
import FontPicker from 'font-picker-vue';
import { Chrome } from 'vue-color'
import VueTinyTabs from 'vue-tiny-tabs'
import html2canvas from 'html2canvas';

export default {
  data(){
    return ({
      text: "Lorem sit dolor amet",
      activeFont: "Exo",
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
      staticGradients: [
        "linear-gradient(56deg, rgba(130, 130, 130, 0.05) 0%, rgba(130, 130, 130, 0.05) 33.333%,rgba(255, 255, 255, 0.05) 33.333%, rgba(255, 255, 255, 0.05) 66.666%,rgba(198, 198, 198, 0.05) 66.666%, rgba(198, 198, 198, 0.05) 99.999%),linear-gradient(29deg, rgba(94, 94, 94, 0.05) 0%, rgba(94, 94, 94, 0.05) 33.333%,rgba(185, 185, 185, 0.05) 33.333%, rgba(185, 185, 185, 0.05) 66.666%,rgba(113, 113, 113, 0.05) 66.666%, rgba(113, 113, 113, 0.05) 99.999%),linear-gradient(129deg, rgba(196, 196, 196, 0.05) 0%, rgba(196, 196, 196, 0.05) 33.333%,rgba(148, 148, 148, 0.05) 33.333%, rgba(148, 148, 148, 0.05) 66.666%,rgba(24, 24, 24, 0.05) 66.666%, rgba(24, 24, 24, 0.05) 99.999%),linear-gradient(76deg, rgba(19, 19, 19, 0.05) 0%, rgba(19, 19, 19, 0.05) 33.333%,rgba(159, 159, 159, 0.05) 33.333%, rgba(159, 159, 159, 0.05) 66.666%,rgba(108, 108, 108, 0.05) 66.666%, rgba(108, 108, 108, 0.05) 99.999%),linear-gradient(112deg, rgba(225, 225, 225, 0.05) 0%, rgba(225, 225, 225, 0.05) 33.333%,rgba(13, 13, 13, 0.05) 33.333%, rgba(13, 13, 13, 0.05) 66.666%,rgba(81, 81, 81, 0.05) 66.666%, rgba(81, 81, 81, 0.05) 99.999%),linear-gradient(90deg, rgb(75, 2, 28),rgb(175, 60, 142))",
        "linear-gradient(44deg, rgba(243, 243, 243, 0.05) 0%, rgba(243, 243, 243, 0.05) 33.333%,rgba(79, 79, 79, 0.05) 33.333%, rgba(79, 79, 79, 0.05) 66.666%,rgba(9, 9, 9, 0.05) 66.666%, rgba(9, 9, 9, 0.05) 99.999%),linear-gradient(97deg, rgba(150, 150, 150, 0.05) 0%, rgba(150, 150, 150, 0.05) 33.333%,rgba(34, 34, 34, 0.05) 33.333%, rgba(34, 34, 34, 0.05) 66.666%,rgba(40, 40, 40, 0.05) 66.666%, rgba(40, 40, 40, 0.05) 99.999%),linear-gradient(29deg, rgba(56, 56, 56, 0.05) 0%, rgba(56, 56, 56, 0.05) 33.333%,rgba(226, 226, 226, 0.05) 33.333%, rgba(226, 226, 226, 0.05) 66.666%,rgba(221, 221, 221, 0.05) 66.666%, rgba(221, 221, 221, 0.05) 99.999%),linear-gradient(90deg, rgb(163, 238, 211),rgb(149, 75, 252))",
        "linear-gradient(140deg, rgba(60, 60, 60, 0.04) 0%, rgba(60, 60, 60, 0.04) 18%,rgba(228, 228, 228, 0.04) 18%, rgba(228, 228, 228, 0.04) 100%),linear-gradient(252deg, rgba(159, 159, 159, 0.04) 0%, rgba(159, 159, 159, 0.04) 76%,rgba(255, 255, 255, 0.04) 76%, rgba(255, 255, 255, 0.04) 100%),linear-gradient(148deg, rgba(165, 165, 165, 0.04) 0%, rgba(165, 165, 165, 0.04) 30%,rgba(221, 221, 221, 0.04) 30%, rgba(221, 221, 221, 0.04) 100%),linear-gradient(196deg, rgba(238, 238, 238, 0.04) 0%, rgba(238, 238, 238, 0.04) 41%,rgba(176, 176, 176, 0.04) 41%, rgba(176, 176, 176, 0.04) 100%),linear-gradient(295deg, rgba(245, 245, 245, 0.04) 0%, rgba(245, 245, 245, 0.04) 75%,rgba(68, 68, 68, 0.04) 75%, rgba(68, 68, 68, 0.04) 100%),linear-gradient(89deg, rgba(179, 179, 179, 0.04) 0%, rgba(179, 179, 179, 0.04) 22%,rgba(30, 30, 30, 0.04) 22%, rgba(30, 30, 30, 0.04) 100%),linear-gradient(165deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.04) 40%,rgba(147, 147, 147, 0.04) 40%, rgba(147, 147, 147, 0.04) 100%),linear-gradient(293deg, rgba(204, 204, 204, 0.04) 0%, rgba(204, 204, 204, 0.04) 73%,rgba(62, 62, 62, 0.04) 73%, rgba(62, 62, 62, 0.04) 100%),linear-gradient(90deg, rgb(215, 117, 38),rgb(171, 161, 219))",
        "linear-gradient(10deg, rgba(134, 134, 134, 0.05) 0%, rgba(134, 134, 134, 0.05) 33.333%,rgba(203, 203, 203, 0.05) 33.333%, rgba(203, 203, 203, 0.05) 66.666%,rgba(48, 48, 48, 0.05) 66.666%, rgba(48, 48, 48, 0.05) 99.999%),linear-gradient(295deg, rgba(90, 90, 90, 0.05) 0%, rgba(90, 90, 90, 0.05) 33.333%,rgba(23, 23, 23, 0.05) 33.333%, rgba(23, 23, 23, 0.05) 66.666%,rgba(71, 71, 71, 0.05) 66.666%, rgba(71, 71, 71, 0.05) 99.999%),linear-gradient(313deg, rgba(186, 186, 186, 0.05) 0%, rgba(186, 186, 186, 0.05) 33.333%,rgba(174, 174, 174, 0.05) 33.333%, rgba(174, 174, 174, 0.05) 66.666%,rgba(196, 196, 196, 0.05) 66.666%, rgba(196, 196, 196, 0.05) 99.999%),linear-gradient(356deg, rgba(2, 2, 2, 0.05) 0%, rgba(2, 2, 2, 0.05) 33.333%,rgba(110, 110, 110, 0.05) 33.333%, rgba(110, 110, 110, 0.05) 66.666%,rgba(207, 207, 207, 0.05) 66.666%, rgba(207, 207, 207, 0.05) 99.999%),linear-gradient(343deg, rgba(39, 39, 39, 0.05) 0%, rgba(39, 39, 39, 0.05) 33.333%,rgba(145, 145, 145, 0.05) 33.333%, rgba(145, 145, 145, 0.05) 66.666%,rgba(205, 205, 205, 0.05) 66.666%, rgba(205, 205, 205, 0.05) 99.999%),linear-gradient(90deg, rgb(227, 5, 98),rgb(215, 148, 27))",
        "linear-gradient(330deg, rgba(225, 225, 225, 0.05) 0%, rgba(225, 225, 225, 0.05) 33.333%,rgba(114, 114, 114, 0.05) 33.333%, rgba(114, 114, 114, 0.05) 66.666%,rgba(52, 52, 52, 0.05) 66.666%, rgba(52, 52, 52, 0.05) 99.999%),linear-gradient(66deg, rgba(181, 181, 181, 0.05) 0%, rgba(181, 181, 181, 0.05) 33.333%,rgba(27, 27, 27, 0.05) 33.333%, rgba(27, 27, 27, 0.05) 66.666%,rgba(251, 251, 251, 0.05) 66.666%, rgba(251, 251, 251, 0.05) 99.999%),linear-gradient(225deg, rgba(98, 98, 98, 0.05) 0%, rgba(98, 98, 98, 0.05) 33.333%,rgba(222, 222, 222, 0.05) 33.333%, rgba(222, 222, 222, 0.05) 66.666%,rgba(228, 228, 228, 0.05) 66.666%, rgba(228, 228, 228, 0.05) 99.999%),linear-gradient(90deg, rgb(28, 20, 63),rgb(40, 160, 253))",
        "linear-gradient(17deg, rgba(41, 41, 41, 0.02) 0%, rgba(41, 41, 41, 0.02) 48%,rgba(10, 10, 10, 0.02) 48%, rgba(10, 10, 10, 0.02) 59%,rgba(164, 164, 164, 0.02) 59%, rgba(164, 164, 164, 0.02) 73%,rgba(79, 79, 79, 0.02) 73%, rgba(79, 79, 79, 0.02) 93%,rgba(42, 42, 42, 0.02) 93%, rgba(42, 42, 42, 0.02) 100%),linear-gradient(42deg, rgba(124, 124, 124, 0.02) 0%, rgba(124, 124, 124, 0.02) 15%,rgba(116, 116, 116, 0.02) 15%, rgba(116, 116, 116, 0.02) 23%,rgba(41, 41, 41, 0.02) 23%, rgba(41, 41, 41, 0.02) 44%,rgba(196, 196, 196, 0.02) 44%, rgba(196, 196, 196, 0.02) 54%,rgba(145, 145, 145, 0.02) 54%, rgba(145, 145, 145, 0.02) 100%),linear-gradient(151deg, rgba(85, 85, 85, 0.02) 0%, rgba(85, 85, 85, 0.02) 12%,rgba(72, 72, 72, 0.02) 12%, rgba(72, 72, 72, 0.02) 28%,rgba(156, 156, 156, 0.02) 28%, rgba(156, 156, 156, 0.02) 33%,rgba(230, 230, 230, 0.02) 33%, rgba(230, 230, 230, 0.02) 50%,rgba(13, 13, 13, 0.02) 50%, rgba(13, 13, 13, 0.02) 100%),linear-gradient(76deg, rgba(25, 25, 25, 0.02) 0%, rgba(25, 25, 25, 0.02) 9%,rgba(183, 183, 183, 0.02) 9%, rgba(183, 183, 183, 0.02) 32%,rgba(19, 19, 19, 0.02) 32%, rgba(19, 19, 19, 0.02) 86%,rgba(129, 129, 129, 0.02) 86%, rgba(129, 129, 129, 0.02) 88%,rgba(174, 174, 174, 0.02) 88%, rgba(174, 174, 174, 0.02) 100%),linear-gradient(90deg, rgb(41, 41, 41),rgb(8, 8, 8))",
        "linear-gradient(246deg, rgba(234, 234, 234, 0.04) 0%, rgba(234, 234, 234, 0.04) 33.3%,rgba(69, 69, 69, 0.04) 33.3%, rgba(69, 69, 69, 0.04) 66.6%,rgba(189, 189, 189, 0.04) 66.6%, rgba(189, 189, 189, 0.04) 99.89999999999999%),linear-gradient(81deg, rgba(126, 126, 126, 0.05) 0%, rgba(126, 126, 126, 0.05) 33.3%,rgba(237, 237, 237, 0.05) 33.3%, rgba(237, 237, 237, 0.05) 66.6%,rgba(74, 74, 74, 0.05) 66.6%, rgba(74, 74, 74, 0.05) 99.89999999999999%),linear-gradient(14deg, rgba(3, 3, 3, 0.08) 0%, rgba(3, 3, 3, 0.08) 33.3%,rgba(156, 156, 156, 0.08) 33.3%, rgba(156, 156, 156, 0.08) 66.6%,rgba(199, 199, 199, 0.08) 66.6%, rgba(199, 199, 199, 0.08) 99.89999999999999%),linear-gradient(323deg, rgba(82, 82, 82, 0.06) 0%, rgba(82, 82, 82, 0.06) 33.3%,rgba(179, 179, 179, 0.06) 33.3%, rgba(179, 179, 179, 0.06) 66.6%,rgba(212, 212, 212, 0.06) 66.6%, rgba(212, 212, 212, 0.06) 99.89999999999999%),linear-gradient(32deg, rgba(70, 70, 70, 0.02) 0%, rgba(70, 70, 70, 0.02) 33.3%,rgba(166, 166, 166, 0.02) 33.3%, rgba(166, 166, 166, 0.02) 66.6%,rgba(53, 53, 53, 0.02) 66.6%, rgba(53, 53, 53, 0.02) 99.89999999999999%),linear-gradient(38deg, rgba(129, 129, 129, 0.09) 0%, rgba(129, 129, 129, 0.09) 33.3%,rgba(38, 38, 38, 0.09) 33.3%, rgba(38, 38, 38, 0.09) 66.6%,rgba(153, 153, 153, 0.09) 66.6%, rgba(153, 153, 153, 0.09) 99.89999999999999%),linear-gradient(63deg, rgba(51, 51, 51, 0.02) 0%, rgba(51, 51, 51, 0.02) 33.3%,rgba(12, 12, 12, 0.02) 33.3%, rgba(12, 12, 12, 0.02) 66.6%,rgba(158, 158, 158, 0.02) 66.6%, rgba(158, 158, 158, 0.02) 99.89999999999999%),linear-gradient(227deg, rgba(63, 63, 63, 0.03) 0%, rgba(63, 63, 63, 0.03) 33.3%,rgba(9, 9, 9, 0.03) 33.3%, rgba(9, 9, 9, 0.03) 66.6%,rgba(85, 85, 85, 0.03) 66.6%, rgba(85, 85, 85, 0.03) 99.89999999999999%),linear-gradient(103deg, rgba(247, 247, 247, 0.07) 0%, rgba(247, 247, 247, 0.07) 33.3%,rgba(93, 93, 93, 0.07) 33.3%, rgba(93, 93, 93, 0.07) 66.6%,rgba(208, 208, 208, 0.07) 66.6%, rgba(208, 208, 208, 0.07) 99%),linear-gradient(0deg, #0b91d7,#6efc29)",
        "linear-gradient(52deg, rgba(163, 163, 163, 0.09) 0%, rgba(163, 163, 163, 0.09) 33.3%,rgba(100, 100, 100, 0.09) 33.3%, rgba(100, 100, 100, 0.09) 66.6%,rgba(162, 162, 162, 0.09) 66.6%, rgba(162, 162, 162, 0.09) 99%),linear-gradient(258deg, rgba(193, 193, 193, 0.06) 0%, rgba(193, 193, 193, 0.06) 33.3%,rgba(169, 169, 169, 0.06) 33.3%, rgba(169, 169, 169, 0.06) 66.6%,rgba(92, 92, 92, 0.06) 66.6%, rgba(92, 92, 92, 0.06) 99%),linear-gradient(129deg, rgba(45, 45, 45, 0.03) 0%, rgba(45, 45, 45, 0.03) 33.3%,rgba(223, 223, 223, 0.03) 33.3%, rgba(223, 223, 223, 0.03) 66.6%,rgba(173, 173, 173, 0.03) 66.6%, rgba(173, 173, 173, 0.03) 99%),linear-gradient(280deg, rgba(226, 226, 226, 0.06) 0%, rgba(226, 226, 226, 0.06) 33.3%,rgba(81, 81, 81, 0.06) 33.3%, rgba(81, 81, 81, 0.06) 66.6%,rgba(186, 186, 186, 0.06) 66.6%, rgba(186, 186, 186, 0.06) 99%),linear-gradient(85deg, rgba(225, 225, 225, 0.04) 0%, rgba(225, 225, 225, 0.04) 33.3%,rgba(95, 95, 95, 0.04) 33.3%, rgba(95, 95, 95, 0.04) 66.6%,rgba(39, 39, 39, 0.04) 66.6%, rgba(39, 39, 39, 0.04) 99%),linear-gradient(128deg, rgba(184, 184, 184, 0.06) 0%, rgba(184, 184, 184, 0.06) 33.3%,rgba(0, 0, 0, 0.06) 33.3%, rgba(0, 0, 0, 0.06) 66.6%,rgba(140, 140, 140, 0.06) 66.6%, rgba(140, 140, 140, 0.06) 99.89999999999999%),linear-gradient(323deg, rgba(40, 40, 40, 0.07) 0%, rgba(40, 40, 40, 0.07) 33.3%,rgba(214, 214, 214, 0.07) 33.3%, rgba(214, 214, 214, 0.07) 66.6%,rgba(190, 190, 190, 0.07) 66.6%, rgba(190, 190, 190, 0.07) 99.89999999999999%),linear-gradient(61deg, rgba(230, 230, 230, 0) 0%, rgba(230, 230, 230, 0) 33.3%,rgba(241, 241, 241, 0) 33.3%, rgba(241, 241, 241, 0) 66.6%,rgba(55, 55, 55, 0) 66.6%, rgba(55, 55, 55, 0) 99%),linear-gradient(0deg, #2625e3,#0bbaef)",
        "linear-gradient(45deg, rgb(242, 1, 146) 0%, rgb(242, 1, 146) 14.286%,rgb(205, 4, 143) 14.286%, rgb(205, 4, 143) 28.572%,rgb(168, 6, 140) 28.572%, rgb(168, 6, 140) 42.858%,rgb(132, 9, 137) 42.858%, rgb(132, 9, 137) 57.144%,rgb(95, 12, 134) 57.144%, rgb(95, 12, 134) 71.43%,rgb(58, 14, 131) 71.43%, rgb(58, 14, 131) 85.716%,rgb(21, 17, 128) 85.716%, rgb(21, 17, 128) 100.002%)",
        "linear-gradient(45deg, rgb(221, 133, 9) 0%, rgb(221, 133, 9) 14.286%,rgb(227, 152, 25) 14.286%, rgb(227, 152, 25) 28.572%,rgb(232, 170, 40) 28.572%, rgb(232, 170, 40) 42.858%,rgb(238, 189, 56) 42.858%, rgb(238, 189, 56) 57.144%,rgb(244, 208, 72) 57.144%, rgb(244, 208, 72) 71.43%,rgb(249, 226, 87) 71.43%, rgb(249, 226, 87) 85.716%,rgb(255, 245, 103) 85.716%, rgb(255, 245, 103) 100.002%)",
        "linear-gradient(45deg, rgb(2, 6, 1) 0%, rgb(2, 6, 1) 14.286%,rgb(8, 29, 31) 14.286%, rgb(8, 29, 31) 28.572%,rgb(13, 52, 61) 28.572%, rgb(13, 52, 61) 42.858%,rgb(19, 75, 92) 42.858%, rgb(19, 75, 92) 57.144%,rgb(25, 98, 122) 57.144%, rgb(25, 98, 122) 71.43%,rgb(30, 121, 152) 71.43%, rgb(30, 121, 152) 85.716%,rgb(36, 144, 182) 85.716%, rgb(36, 144, 182) 100.002%)",
        "linear-gradient(45deg, rgb(233, 22, 95) 0%, rgb(233, 22, 95) 14.286%,rgb(237, 57, 107) 14.286%, rgb(237, 57, 107) 28.572%,rgb(240, 92, 118) 28.572%, rgb(240, 92, 118) 42.858%,rgb(244, 127, 130) 42.858%, rgb(244, 127, 130) 57.144%,rgb(247, 162, 142) 57.144%, rgb(247, 162, 142) 71.43%,rgb(251, 197, 153) 71.43%, rgb(251, 197, 153) 85.716%,rgb(254, 232, 165) 85.716%, rgb(254, 232, 165) 100.002%)",
        "linear-gradient(45deg, rgb(20, 222, 124) 0%, rgb(20, 222, 124) 21%,rgb(25, 190, 119) 21%, rgb(25, 190, 119) 37%,rgb(30, 158, 113) 37%, rgb(30, 158, 113) 46%,rgb(35, 126, 108) 46%, rgb(35, 126, 108) 53%,rgb(39, 94, 103) 53%, rgb(39, 94, 103) 59%,rgb(44, 62, 97) 59%, rgb(44, 62, 97) 77%,rgb(49, 30, 92) 77%, rgb(49, 30, 92) 100%)",
        "linear-gradient(45deg, rgba(48, 160, 200, 0.36) 0%, rgba(48, 160, 200, 0.36) 27%,rgba(66, 208, 212, 0.36) 27%, rgba(66, 208, 212, 0.36) 30%,rgba(57, 184, 206, 0.36) 30%, rgba(57, 184, 206, 0.36) 38%,rgba(75, 232, 218, 0.36) 38%, rgba(75, 232, 218, 0.36) 41%,rgba(38, 135, 193, 0.36) 41%, rgba(38, 135, 193, 0.36) 67%,rgba(29, 111, 187, 0.36) 67%, rgba(29, 111, 187, 0.36) 68%,rgba(20, 87, 181, 0.36) 68%, rgba(20, 87, 181, 0.36) 71%,rgba(11, 63, 175, 0.36) 71%, rgba(11, 63, 175, 0.36) 100%),linear-gradient(45deg, rgba(120, 161, 172, 0.37) 0%, rgba(120, 161, 172, 0.37) 12.5%,rgba(83, 81, 120, 0.37) 12.5%, rgba(83, 81, 120, 0.37) 25%,rgba(132, 188, 189, 0.37) 25%, rgba(132, 188, 189, 0.37) 37.5%,rgba(95, 108, 137, 0.37) 37.5%, rgba(95, 108, 137, 0.37) 50%,rgba(144, 215, 206, 0.37) 50%, rgba(144, 215, 206, 0.37) 62.5%,rgba(107, 135, 154, 0.37) 62.5%, rgba(107, 135, 154, 0.37) 75%,rgba(156, 242, 223, 0.37) 75%, rgba(156, 242, 223, 0.37) 87.5%,rgba(71, 54, 103, 0.37) 87.5%, rgba(71, 54, 103, 0.37) 100%),linear-gradient(63deg, rgb(156, 214, 233),rgb(74, 10, 132))",
        "linear-gradient(45deg, rgb(239, 7, 129) 0%, rgb(239, 7, 129) 6%,rgb(208, 10, 112) 6%, rgb(208, 10, 112) 25%,rgb(177, 13, 96) 25%, rgb(177, 13, 96) 40%,rgb(147, 16, 79) 40%, rgb(147, 16, 79) 45%,rgb(116, 19, 62) 45%, rgb(116, 19, 62) 53%,rgb(85, 22, 46) 53%, rgb(85, 22, 46) 66%,rgb(54, 25, 29) 66%, rgb(54, 25, 29) 100%)",
        "linear-gradient(22.5deg, rgba(67, 67, 67, 0.02) 0%, rgba(67, 67, 67, 0.02) 29%,rgba(47, 47, 47, 0.02) 29%, rgba(47, 47, 47, 0.02) 37%,rgba(23, 23, 23, 0.02) 37%, rgba(23, 23, 23, 0.02) 55%,rgba(182, 182, 182, 0.02) 55%, rgba(182, 182, 182, 0.02) 69%,rgba(27, 27, 27, 0.02) 69%, rgba(27, 27, 27, 0.02) 71%,rgba(250, 250, 250, 0.02) 71%, rgba(250, 250, 250, 0.02) 100%),linear-gradient(67.5deg, rgba(117, 117, 117, 0.02) 0%, rgba(117, 117, 117, 0.02) 14%,rgba(199, 199, 199, 0.02) 14%, rgba(199, 199, 199, 0.02) 40%,rgba(33, 33, 33, 0.02) 40%, rgba(33, 33, 33, 0.02) 48%,rgba(135, 135, 135, 0.02) 48%, rgba(135, 135, 135, 0.02) 60%,rgba(148, 148, 148, 0.02) 60%, rgba(148, 148, 148, 0.02) 95%,rgba(53, 53, 53, 0.02) 95%, rgba(53, 53, 53, 0.02) 100%),linear-gradient(135deg, rgba(190, 190, 190, 0.02) 0%, rgba(190, 190, 190, 0.02) 6%,rgba(251, 251, 251, 0.02) 6%, rgba(251, 251, 251, 0.02) 18%,rgba(2, 2, 2, 0.02) 18%, rgba(2, 2, 2, 0.02) 27%,rgba(253, 253, 253, 0.02) 27%, rgba(253, 253, 253, 0.02) 49%,rgba(128, 128, 128, 0.02) 49%, rgba(128, 128, 128, 0.02) 76%,rgba(150, 150, 150, 0.02) 76%, rgba(150, 150, 150, 0.02) 100%),linear-gradient(90deg, #FFF,#FFF)",
        "linear-gradient(131deg, rgba(186, 186, 186, 0.01) 0%, rgba(186, 186, 186, 0.01) 16.667%,rgba(192, 192, 192, 0.01) 16.667%, rgba(192, 192, 192, 0.01) 33.334%,rgba(48, 48, 48, 0.01) 33.334%, rgba(48, 48, 48, 0.01) 50.001000000000005%,rgba(33, 33, 33, 0.01) 50.001%, rgba(33, 33, 33, 0.01) 66.668%,rgba(182, 182, 182, 0.01) 66.668%, rgba(182, 182, 182, 0.01) 83.33500000000001%,rgba(211, 211, 211, 0.01) 83.335%, rgba(211, 211, 211, 0.01) 100.002%),linear-gradient(148deg, rgba(48, 48, 48, 0.01) 0%, rgba(48, 48, 48, 0.01) 16.667%,rgba(178, 178, 178, 0.01) 16.667%, rgba(178, 178, 178, 0.01) 33.334%,rgba(192, 192, 192, 0.01) 33.334%, rgba(192, 192, 192, 0.01) 50.001000000000005%,rgba(237, 237, 237, 0.01) 50.001%, rgba(237, 237, 237, 0.01) 66.668%,rgba(194, 194, 194, 0.01) 66.668%, rgba(194, 194, 194, 0.01) 83.33500000000001%,rgba(227, 227, 227, 0.01) 83.335%, rgba(227, 227, 227, 0.01) 100.002%),linear-gradient(138deg, rgba(146, 146, 146, 0.03) 0%, rgba(146, 146, 146, 0.03) 25%,rgba(33, 33, 33, 0.03) 25%, rgba(33, 33, 33, 0.03) 50%,rgba(46, 46, 46, 0.03) 50%, rgba(46, 46, 46, 0.03) 75%,rgba(172, 172, 172, 0.03) 75%, rgba(172, 172, 172, 0.03) 100%),linear-gradient(38deg, rgba(3, 3, 3, 0.03) 0%, rgba(3, 3, 3, 0.03) 16.667%,rgba(28, 28, 28, 0.03) 16.667%, rgba(28, 28, 28, 0.03) 33.334%,rgba(236, 236, 236, 0.03) 33.334%, rgba(236, 236, 236, 0.03) 50.001000000000005%,rgba(3, 3, 3, 0.03) 50.001%, rgba(3, 3, 3, 0.03) 66.668%,rgba(207, 207, 207, 0.03) 66.668%, rgba(207, 207, 207, 0.03) 83.33500000000001%,rgba(183, 183, 183, 0.03) 83.335%, rgba(183, 183, 183, 0.03) 100.002%),linear-gradient(145deg, rgba(20, 20, 20, 0.02) 0%, rgba(20, 20, 20, 0.02) 20%,rgba(4, 4, 4, 0.02) 20%, rgba(4, 4, 4, 0.02) 40%,rgba(194, 194, 194, 0.02) 40%, rgba(194, 194, 194, 0.02) 60%,rgba(34, 34, 34, 0.02) 60%, rgba(34, 34, 34, 0.02) 80%,rgba(71, 71, 71, 0.02) 80%, rgba(71, 71, 71, 0.02) 100%),linear-gradient(78deg, rgba(190, 190, 190, 0.02) 0%, rgba(190, 190, 190, 0.02) 20%,rgba(95, 95, 95, 0.02) 20%, rgba(95, 95, 95, 0.02) 40%,rgba(71, 71, 71, 0.02) 40%, rgba(71, 71, 71, 0.02) 60%,rgba(7, 7, 7, 0.02) 60%, rgba(7, 7, 7, 0.02) 80%,rgba(130, 130, 130, 0.02) 80%, rgba(130, 130, 130, 0.02) 100%),linear-gradient(293deg, rgba(213, 213, 213, 0.03) 0%, rgba(213, 213, 213, 0.03) 20%,rgba(220, 220, 220, 0.03) 20%, rgba(220, 220, 220, 0.03) 40%,rgba(146, 146, 146, 0.03) 40%, rgba(146, 146, 146, 0.03) 60%,rgba(57, 57, 57, 0.03) 60%, rgba(57, 57, 57, 0.03) 80%,rgba(120, 120, 120, 0.03) 80%, rgba(120, 120, 120, 0.03) 100%),linear-gradient(90deg, rgb(225, 15, 180),rgb(78, 198, 243))",
        "linear-gradient(323deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.01) 16.667%,rgba(46, 46, 46, 0.01) 16.667%, rgba(46, 46, 46, 0.01) 33.334%,rgba(226, 226, 226, 0.01) 33.334%, rgba(226, 226, 226, 0.01) 50.001000000000005%,rgba(159, 159, 159, 0.01) 50.001%, rgba(159, 159, 159, 0.01) 66.668%,rgba(149, 149, 149, 0.01) 66.668%, rgba(149, 149, 149, 0.01) 83.33500000000001%,rgba(43, 43, 43, 0.01) 83.335%, rgba(43, 43, 43, 0.01) 100.002%),linear-gradient(346deg, rgba(166, 166, 166, 0.03) 0%, rgba(166, 166, 166, 0.03) 25%,rgba(240, 240, 240, 0.03) 25%, rgba(240, 240, 240, 0.03) 50%,rgba(121, 121, 121, 0.03) 50%, rgba(121, 121, 121, 0.03) 75%,rgba(40, 40, 40, 0.03) 75%, rgba(40, 40, 40, 0.03) 100%),linear-gradient(347deg, rgba(209, 209, 209, 0.01) 0%, rgba(209, 209, 209, 0.01) 25%,rgba(22, 22, 22, 0.01) 25%, rgba(22, 22, 22, 0.01) 50%,rgba(125, 125, 125, 0.01) 50%, rgba(125, 125, 125, 0.01) 75%,rgba(205, 205, 205, 0.01) 75%, rgba(205, 205, 205, 0.01) 100%),linear-gradient(84deg, rgba(195, 195, 195, 0.01) 0%, rgba(195, 195, 195, 0.01) 14.286%,rgba(64, 64, 64, 0.01) 14.286%, rgba(64, 64, 64, 0.01) 28.572%,rgba(67, 67, 67, 0.01) 28.572%, rgba(67, 67, 67, 0.01) 42.858%,rgba(214, 214, 214, 0.01) 42.858%, rgba(214, 214, 214, 0.01) 57.144%,rgba(45, 45, 45, 0.01) 57.144%, rgba(45, 45, 45, 0.01) 71.42999999999999%,rgba(47, 47, 47, 0.01) 71.43%, rgba(47, 47, 47, 0.01) 85.71600000000001%,rgba(172, 172, 172, 0.01) 85.716%, rgba(172, 172, 172, 0.01) 100.002%),linear-gradient(73deg, rgba(111, 111, 111, 0.03) 0%, rgba(111, 111, 111, 0.03) 16.667%,rgba(202, 202, 202, 0.03) 16.667%, rgba(202, 202, 202, 0.03) 33.334%,rgba(57, 57, 57, 0.03) 33.334%, rgba(57, 57, 57, 0.03) 50.001000000000005%,rgba(197, 197, 197, 0.03) 50.001%, rgba(197, 197, 197, 0.03) 66.668%,rgba(97, 97, 97, 0.03) 66.668%, rgba(97, 97, 97, 0.03) 83.33500000000001%,rgba(56, 56, 56, 0.03) 83.335%, rgba(56, 56, 56, 0.03) 100.002%),linear-gradient(132deg, rgba(88, 88, 88, 0.03) 0%, rgba(88, 88, 88, 0.03) 20%,rgba(249, 249, 249, 0.03) 20%, rgba(249, 249, 249, 0.03) 40%,rgba(2, 2, 2, 0.03) 40%, rgba(2, 2, 2, 0.03) 60%,rgba(185, 185, 185, 0.03) 60%, rgba(185, 185, 185, 0.03) 80%,rgba(196, 196, 196, 0.03) 80%, rgba(196, 196, 196, 0.03) 100%),linear-gradient(142deg, rgba(160, 160, 160, 0.03) 0%, rgba(160, 160, 160, 0.03) 12.5%,rgba(204, 204, 204, 0.03) 12.5%, rgba(204, 204, 204, 0.03) 25%,rgba(108, 108, 108, 0.03) 25%, rgba(108, 108, 108, 0.03) 37.5%,rgba(191, 191, 191, 0.03) 37.5%, rgba(191, 191, 191, 0.03) 50%,rgba(231, 231, 231, 0.03) 50%, rgba(231, 231, 231, 0.03) 62.5%,rgba(70, 70, 70, 0.03) 62.5%, rgba(70, 70, 70, 0.03) 75%,rgba(166, 166, 166, 0.03) 75%, rgba(166, 166, 166, 0.03) 87.5%,rgba(199, 199, 199, 0.03) 87.5%, rgba(199, 199, 199, 0.03) 100%),linear-gradient(238deg, rgba(116, 116, 116, 0.02) 0%, rgba(116, 116, 116, 0.02) 20%,rgba(141, 141, 141, 0.02) 20%, rgba(141, 141, 141, 0.02) 40%,rgba(152, 152, 152, 0.02) 40%, rgba(152, 152, 152, 0.02) 60%,rgba(61, 61, 61, 0.02) 60%, rgba(61, 61, 61, 0.02) 80%,rgba(139, 139, 139, 0.02) 80%, rgba(139, 139, 139, 0.02) 100%),linear-gradient(188deg, rgba(227, 227, 227, 0.01) 0%, rgba(227, 227, 227, 0.01) 20%,rgba(105, 105, 105, 0.01) 20%, rgba(105, 105, 105, 0.01) 40%,rgba(72, 72, 72, 0.01) 40%, rgba(72, 72, 72, 0.01) 60%,rgba(33, 33, 33, 0.01) 60%, rgba(33, 33, 33, 0.01) 80%,rgba(57, 57, 57, 0.01) 80%, rgba(57, 57, 57, 0.01) 100%),linear-gradient(90deg, hsl(237,0%,13%),hsl(237,0%,13%))",
        "linear-gradient(56deg, rgba(254, 254, 254, 0.05) 0%, rgba(254, 254, 254, 0.05) 69%,rgba(160, 160, 160, 0.05) 69%, rgba(160, 160, 160, 0.05) 100%),linear-gradient(194deg, rgba(102, 102, 102, 0.02) 0%, rgba(102, 102, 102, 0.02) 60%,rgba(67, 67, 67, 0.02) 60%, rgba(67, 67, 67, 0.02) 100%),linear-gradient(76deg, rgba(169, 169, 169, 0.06) 0%, rgba(169, 169, 169, 0.06) 89%,rgba(189, 189, 189, 0.06) 89%, rgba(189, 189, 189, 0.06) 100%),linear-gradient(326deg, rgba(213, 213, 213, 0.04) 0%, rgba(213, 213, 213, 0.04) 45%,rgba(66, 66, 66, 0.04) 45%, rgba(66, 66, 66, 0.04) 100%),linear-gradient(183deg, rgba(223, 223, 223, 0.01) 0%, rgba(223, 223, 223, 0.01) 82%,rgba(28, 28, 28, 0.01) 82%, rgba(28, 28, 28, 0.01) 100%),linear-gradient(3deg, rgba(20, 20, 20, 0.06) 0%, rgba(20, 20, 20, 0.06) 62%,rgba(136, 136, 136, 0.06) 62%, rgba(136, 136, 136, 0.06) 100%),linear-gradient(200deg, rgba(206, 206, 206, 0.09) 0%, rgba(206, 206, 206, 0.09) 58%,rgba(6, 6, 6, 0.09) 58%, rgba(6, 6, 6, 0.09) 100%),linear-gradient(304deg, rgba(162, 162, 162, 0.07) 0%, rgba(162, 162, 162, 0.07) 27%,rgba(24, 24, 24, 0.07) 27%, rgba(24, 24, 24, 0.07) 100%),linear-gradient(186deg, rgba(166, 166, 166, 0.04) 0%, rgba(166, 166, 166, 0.04) 5%,rgba(210, 210, 210, 0.04) 5%, rgba(210, 210, 210, 0.04) 100%),linear-gradient(90deg, rgb(26, 118, 64),rgb(32, 207, 121),rgb(78, 196, 128))",
        "linear-gradient(45deg, rgb(64, 140, 190) 0%, rgb(64, 140, 190) 7%,rgb(62, 107, 145) 7%, rgb(62, 107, 145) 9%,rgb(49, 99, 131) 9%, rgb(49, 99, 131) 11%,rgb(116, 172, 211) 11%, rgb(116, 172, 211) 26%,rgb(125, 182, 214) 26%, rgb(125, 182, 214) 34%,rgb(40, 90, 136) 34%, rgb(40, 90, 136) 41%,rgb(39, 123, 190) 41%, rgb(39, 123, 190) 100%)"

      ]
    })
  },
  components: {
    Select,
    FontPicker,
    'color-picker': Chrome,
    VueTinyTabs
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
      html2canvas(document.querySelector("#screenshot"), {
        //backgroundColor:null,
        allowTaint:true
      }).then((canvas) => {
        this.saveAs(canvas.toDataURL(), 'screenshot.png')
      });
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

  .screenshot-wrapper{
    width:500px;
    height:899px;
  }

  #screenshot{
    position:absolute;
    top:-9999px;
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
    background-size: contain;
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
</style>
