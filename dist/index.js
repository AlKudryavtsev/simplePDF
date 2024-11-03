var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
import puppeteer from "puppeteer";
import sharp from "sharp";
import cheerio from "cheerio";
import axios from "axios";
function prepareImages(content) {
  return __async(this, null, function* () {
    const parse = cheerio.load(content);
    const imgTags = parse("img");
    yield Promise.all(
      imgTags.map((index, element) => __async(this, null, function* () {
        const imgElement = parse(element);
        const imgUrl = imgElement.attr("src");
        if (imgUrl) {
          try {
            const response = yield axios.get(imgUrl, {
              responseType: "arraybuffer"
            });
            const resizedImageBuffer = yield sharp(response.data).resize({ width: 600, height: 600, fit: "inside" }).jpeg({ quality: 70 }).toBuffer();
            const base64Image = `data:image/${sharp(response.data).metadata().format};base64,${resizedImageBuffer.toString("base64")}`;
            imgElement.attr("src", base64Image);
          } catch (error) {
            console.error(`Error processing image ${imgUrl}: ${error}`);
          }
        }
      }))
    );
    return parse.html();
  });
}
function renderPdfFromHtml(_0, _1) {
  return __async(this, arguments, function* (html, src, margin = { top: 30, right: 10, bottom: 30, left: 10 }, landscape = false, format = "a4", parseImage = false) {
    const browser = yield puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
        "--shm-size=10gb"
        // this solves the issue
      ]
    });
    if (parseImage) html = yield prepareImages(html);
    const page = yield browser.newPage();
    page.setDefaultNavigationTimeout(0);
    yield page.setContent(html, { waitUntil: "domcontentloaded" });
    yield page.emulateMediaType("screen");
    yield page.pdf({
      path: src,
      margin,
      landscape,
      printBackground: true,
      format,
      timeout: 0
    });
    yield browser.close();
  });
}
function renderLandscapePdfFromHtml(_0, _1) {
  return __async(this, arguments, function* (html, src, margin = { top: 30, right: 10, bottom: 30, left: 10 }, format = "a4", parseImage = false) {
    return renderPdfFromHtml(html, src, margin, true, format, parseImage);
  });
}
function renderUrlToPdf(_0, _1) {
  return __async(this, arguments, function* (url, src, margin = { top: 30, right: 10, bottom: 30, left: 10 }, landscape = false, format = "a4") {
    const browser = yield puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
        "--shm-size=10gb"
        // this solves the issue
      ]
    });
    const page = yield browser.newPage();
    page.setDefaultNavigationTimeout(0);
    yield page.goto(url);
    yield page.emulateMediaType("screen");
    yield page.pdf({
      path: src,
      margin,
      landscape,
      printBackground: true,
      format,
      timeout: 0
    });
    yield browser.close();
  });
}
export {
  renderLandscapePdfFromHtml,
  renderPdfFromHtml,
  renderUrlToPdf
};
//# sourceMappingURL=index.js.map