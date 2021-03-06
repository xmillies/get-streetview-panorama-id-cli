#!/usr/bin/env node
"use strict";
const program = require("commander")
    , colors = require("colors")
    , getStreetViewPanoramaId = require("get-streetview-panorama-id");

function main() {
  let message
    , inputURL
    , getID
    , getEmbed;

  program
    .arguments("<url>")
    .action(function(url) {
      inputURL = url;
    });

  program
    .option("-e, --embed", "Get URL to embed")

  program.on("--help", function() {
    console.log("  Examples:");
    console.log("");
    console.log("  $ get-streetview-panorama-id https://www.google.com/maps/contrib/10220346527048...");
    console.log("  $ get-streetview-panorama-id -e https://www.google.com/maps/contrib/10220346527048...");
  });

  program.parse(process.argv);

  if (typeof inputURL === "undefined") {
    console.log("");
    console.log("   URL not found!".red);
    process.exit();
  }

  console.log("");

  getID = getStreetViewPanoramaId({url: inputURL});

  switch (getID) {
    case "Expected an object":
    case "Incorrect URL":
      console.log("   " + getID.red);
      process.exit();
    break;
  }

  message = "   Copy the panorama ID: " + getID.underline;

  if (program.embed) {
    getEmbed = getStreetViewPanoramaId({
      url: inputURL,
      embed: true
    });

    message = "   Copy the embed url: " + getEmbed.underline;
  }

  console.log(message);
};

main();