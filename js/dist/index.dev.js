"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Hero =
/*#__PURE__*/
function () {
  function Hero() {
    _classCallCheck(this, Hero);

    // 轮播图原生
    this.boxPic = document.querySelector(".hero-info-multiple-fade");
    this.hlb = document.querySelector(".hero-left-button");
    this.hrb = document.querySelector(".hero-right-button");
    this.licon = document.querySelector(".icon-L");
    this.ricon = document.querySelector(".icon-R");
    this.ali = document.querySelectorAll(".hero-info-multiple-fade li"); // 要进来的索引

    this.index = 0; // 要出去的索引

    this.prev = 0;
    console.log(this.ali); // 执行以上事件

    this.addEvent();
  }

  _createClass(Hero, [{
    key: "addEvent",
    value: function addEvent() {
      var that = this;

      this.boxPic.onmouseenter = function () {
        that.hlb.style.opacity = 0.3;
        that.hrb.style.opacity = 0.3;
        that.licon.style.opacity = 0.5;
        that.ricon.style.opacity = 0.5;
      };

      this.boxPic.onmouseleave = function () {
        that.hlb.style.opacity = 0;
        that.hrb.style.opacity = 0;
        that.licon.style.opacity = 0;
        that.ricon.style.opacity = 0;
      };

      this.hlb.onmouseenter = function () {
        this.style.opacity = 0.5;
        that.licon.style.opacity = 1;
      };

      this.hlb.onmouseleave = function () {
        this.style.opacity = 0.3;
        that.licon.style.opacity = 0.5;
      };

      this.hrb.onmouseenter = function () {
        this.style.opacity = 0.5;
        that.ricon.style.opacity = 1;
      };

      this.hrb.onmouseleave = function () {
        this.style.opacity = 0.3;
        that.ricon.style.opacity = 0.5;
      };

      this.hrb.onclick = function () {
        that.changeindex(1);
      };

      this.hlb.onclick = function () {
        that.changeindex(2);
      };
    }
  }, {
    key: "changeindex",
    value: function changeindex(d) {
      if (d = 1) {
        if (this.index == this.ali.length - 1) {
          this.index = 0;
          this.prev = this.ali.length - 1;
        } else {
          this.index++;
          this.prev = this.index - 1;
        }

        this.imgmove();
        console.log(this.index, this.prev);
      } else {
        if (this.index == 0) {
          this.index = this.ali.length - 1;
          this.prev = 0;
        } else {
          this.index--;
          this.prev = this.index + 1;
        }

        this.imgmove();
      }
    }
  }, {
    key: "imgmove",
    value: function imgmove() {
      this.ali[this.index].style.opacity = 0;
      move(this.ali[this.index], {
        opacity: 100
      });
      this.ali[this.prev].style.opacity = 1;
      move(this.ali[this.prev], {
        opacity: 0
      });
    }
  }]);

  return Hero;
}();

new Hero();