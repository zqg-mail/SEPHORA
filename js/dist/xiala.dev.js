"use strict";

$(function () {
  $(".nav-menu-list-main").find("li").mouseenter(function () {
    $('.nav-hover').css('display', 'block');
  });
  $(".nav-menu-list-main").find("li").mouseleave(function () {
    $('.nav-hover').css('display', 'none');
  });
});