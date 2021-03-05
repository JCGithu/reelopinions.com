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

  for (var i = 0; i < embedNodes.length; i += 1) {
    var embed = embedNodes[i];
    if (embed.src.includes("youtube.com")) {
      embed.parentNode.classList.add("aspect-w-16", "aspect-h-9");
      embed.removeAttribute("width");
      embed.removeAttribute("height");
    }
  }
};

exports.onRouteUpdate = function () {
  trustAllScripts();
};
