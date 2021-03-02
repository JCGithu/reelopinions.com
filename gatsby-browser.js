const { contains } = require("cheerio");

require("./src/styles/tailwind.css");
/* eslint-disable */
/**
 * Trust All Scripts
 *
 * This is a dirty little script for iterating over script tags
 * of your Ghost posts and adding them to the document head.
 *
 * This works for any script that then injects content into the page
 * via ids/classnames etc.
 *
 */
var trustAllScripts = function () {
  var scriptNodes = document.querySelectorAll(".load-external-scripts script");

  for (var i = 0; i < scriptNodes.length; i += 1) {
    var node = scriptNodes[i];
    var s = document.createElement("script");
    s.type = node.type || "text/javascript";

    if (node.attributes.src) {
      s.src = node.attributes.src.value;
    } else {
      s.innerHTML = node.innerHTML;
    }

    document.getElementsByTagName("head")[0].appendChild(s);
  }

  var embedNodes = document.querySelectorAll("iframe");
  var imgNodes = document.querySelectorAll("img.kg-image");
  var hNodes = document.querySelectorAll("h2, h3");

  for (var i = 0; i < embedNodes.length; i += 1) {
    var embed = embedNodes[i];
    if (embed.src.includes("youtube.com")) {
      embed.removeAttribute("width");
      embed.removeAttribute("height");
      embed.classList.add("h-full", "w-full");
      embed.parentNode.classList.add("aspect-w-16", "aspect-h-9");
    } else if (embed.src.includes("anchor.fm")) {
      embed.classList.add("p-3", "m-2", "w-full", "h-48", "relative");
    }
  }
  for (var i = 0; i < imgNodes.length; i += 1) {
    var img = imgNodes[i];
    img.classList.add("w-full", "p-4", "m-2");
  }
  for (var i = 0; i < hNodes.length; i += 1) {
    var headline = hNodes[i];
    if (headline.id !== "ignore") {
      if (headline.tagName == "H2") {
        headline.classList.add("text-2xl", "font-bold", "my-3", "text-center");
      } else {
        headline.classList.add("text-lg", "font-bold", "my-3");
      }
    }
  }
};

exports.onRouteUpdate = function () {
  trustAllScripts();
};
