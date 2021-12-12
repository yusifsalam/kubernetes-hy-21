const website_url = process.argv[2] || "https://example.com";

if (website_url !== "https://example.com/")
  console.log("Adventurous, aren'n we?");

console.log("Website URL:", website_url);

const scrape = require("website-scraper");
const options = {
  urls: [website_url],
  directory: "/save/" + website_url,
};

scrape(options, (error, result) => {
  if (error) {
    console.error("something went wrong", error);
  } else {
    console.log(
      "everything went better than expected, here is the result",
      result
    );
  }
});
