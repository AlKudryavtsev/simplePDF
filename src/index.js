"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.renderUrlToPdf = exports.renderLandscapePdfFromHtml = exports.renderPdfFromHtml = void 0;
var puppeteer_1 = require("puppeteer");
var sharp_1 = require("sharp");
var cheerio_1 = require("cheerio");
var axios_1 = require("axios");
function prepareImages(content) {
    return __awaiter(this, void 0, void 0, function () {
        var parse, imgTags;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parse = cheerio_1["default"].load(content);
                    imgTags = parse('img');
                    return [4 /*yield*/, Promise.all(imgTags.map(function (index, element) { return __awaiter(_this, void 0, void 0, function () {
                            var imgElement, imgUrl, response, resizedImageBuffer, base64Image, error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        imgElement = parse(element);
                                        imgUrl = imgElement.attr('src');
                                        if (!imgUrl) return [3 /*break*/, 5];
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 4, , 5]);
                                        return [4 /*yield*/, axios_1["default"].get(imgUrl, {
                                                responseType: 'arraybuffer'
                                            })];
                                    case 2:
                                        response = _a.sent();
                                        return [4 /*yield*/, (0, sharp_1["default"])(response.data)
                                                .resize({ width: 600, height: 600, fit: 'inside' }) // Можно также задать ширину или другие параметры
                                                .jpeg({ quality: 70 })
                                                .toBuffer()];
                                    case 3:
                                        resizedImageBuffer = _a.sent();
                                        base64Image = "data:image/".concat((0, sharp_1["default"])(response.data).metadata().format, ";base64,").concat(resizedImageBuffer.toString('base64'));
                                        // Заменяем src в теге <img> на base64 строку
                                        imgElement.attr('src', base64Image);
                                        return [3 /*break*/, 5];
                                    case 4:
                                        error_1 = _a.sent();
                                        console.error("Error processing image ".concat(imgUrl, ": ").concat(error_1));
                                        return [3 /*break*/, 5];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, parse.html()];
            }
        });
    });
}
function renderPdfFromHtml(html, src, margin, landscape, format, parseImage) {
    if (margin === void 0) { margin = { top: 30, right: 10, bottom: 30, left: 10 }; }
    if (landscape === void 0) { landscape = false; }
    if (format === void 0) { format = 'a4'; }
    if (parseImage === void 0) { parseImage = false; }
    return __awaiter(this, void 0, void 0, function () {
        var browser, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_1["default"].launch({
                        args: [
                            '--no-sandbox',
                            '--disable-setuid-sandbox',
                            '--disable-dev-shm-usage',
                            '--disable-web-security',
                            '--disable-features=IsolateOrigins,site-per-process',
                            '--shm-size=10gb', // this solves the issue
                        ]
                    })];
                case 1:
                    browser = _a.sent();
                    if (!parseImage) return [3 /*break*/, 3];
                    return [4 /*yield*/, prepareImages(html)];
                case 2:
                    html = _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, browser.newPage()];
                case 4:
                    page = _a.sent();
                    page.setDefaultNavigationTimeout(0);
                    return [4 /*yield*/, page.setContent(html, { waitUntil: 'domcontentloaded' })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.emulateMediaType('screen')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.pdf({
                            path: src,
                            margin: margin,
                            landscape: landscape,
                            printBackground: true,
                            format: format,
                            timeout: 0
                        })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.renderPdfFromHtml = renderPdfFromHtml;
function renderLandscapePdfFromHtml(html, src, margin, format, parseImage) {
    if (margin === void 0) { margin = { top: 30, right: 10, bottom: 30, left: 10 }; }
    if (format === void 0) { format = 'a4'; }
    if (parseImage === void 0) { parseImage = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, renderPdfFromHtml(html, src, margin, true, format, parseImage)];
        });
    });
}
exports.renderLandscapePdfFromHtml = renderLandscapePdfFromHtml;
function renderUrlToPdf(url, src, margin, landscape, format) {
    if (margin === void 0) { margin = { top: 30, right: 10, bottom: 30, left: 10 }; }
    if (landscape === void 0) { landscape = false; }
    if (format === void 0) { format = 'a4'; }
    return __awaiter(this, void 0, void 0, function () {
        var browser, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_1["default"].launch({
                        args: [
                            '--no-sandbox',
                            '--disable-setuid-sandbox',
                            '--disable-dev-shm-usage',
                            '--disable-web-security',
                            '--disable-features=IsolateOrigins,site-per-process',
                            '--shm-size=10gb', // this solves the issue
                        ]
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    page.setDefaultNavigationTimeout(0);
                    return [4 /*yield*/, page.goto(url)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.emulateMediaType('screen')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.pdf({
                            path: src,
                            margin: margin,
                            landscape: landscape,
                            printBackground: true,
                            format: format,
                            timeout: 0
                        })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.renderUrlToPdf = renderUrlToPdf;
