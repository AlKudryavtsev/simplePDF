import puppeteer from 'puppeteer';
import * as sharp from 'sharp';
import * as cheerio from 'cheerio';
import axios from 'axios';

export type PageMargin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

async function prepareImages(content: string) {
  const parse = cheerio.load(content);

  const imgTags = parse('img');
  await Promise.all(
    imgTags.map(async (index, element) => {
      const imgElement = parse(element);
      const imgUrl = imgElement.attr('src');

      if (imgUrl) {
        try {
          // Скачиваем изображение
          const response = await axios.get(imgUrl, {
            responseType: 'arraybuffer',
          });

          // Изменяем размер изображения с помощью sharp
          const resizedImageBuffer = await sharp(response.data)
            .resize({ width: 600, height: 600, fit: 'inside' }) // Можно также задать ширину или другие параметры
            .jpeg({ quality: 70 })
            .toBuffer();

          // Конвертируем изображение в base64

          // @ts-ignore
          const base64Image = `data:image/${sharp(response.data).metadata().format};base64,${resizedImageBuffer.toString('base64')}`;

          // Заменяем src в теге <img> на base64 строку
          imgElement.attr('src', base64Image);
        } catch (error) {
          console.error(`Error processing image ${imgUrl}: ${error}`);
        }
      }
    }),
  );

  return parse.html();
}

export async function renderPdfFromHtml(
  html: string,
  src: string,
  margin: PageMargin = { top: 30, right: 10, bottom: 30, left: 10 },
  landscape = false,
  format: 'a4' | 'a5' = 'a4',
  parseImage = false,
) {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--shm-size=10gb', // this solves the issue
    ],
  });

  if (parseImage) html = await prepareImages(html);

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.emulateMediaType('screen');

  await page.pdf({
    path: src,
    margin,
    landscape,
    printBackground: true,
    format,
    timeout: 0,
  });

  await browser.close();
}

export async function renderLandscapePdfFromHtml(
  html: string,
  src: string,
  margin: PageMargin = { top: 30, right: 10, bottom: 30, left: 10 },
  format: 'a4' | 'a5' = 'a4',
  parseImage = false,
) {
  return renderPdfFromHtml(html, src, margin, true, format, parseImage);
}

export async function renderUrlToPdf(
  url: string,
  src: string,
  margin: PageMargin = { top: 30, right: 10, bottom: 30, left: 10 },
  landscape = false,
  format: 'a4' | 'a5' = 'a4',
) {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--shm-size=10gb', // this solves the issue
    ],
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(url);
  await page.emulateMediaType('screen');

  await page.pdf({
    path: src,
    margin,
    landscape,
    printBackground: true,
    format,
    timeout: 0,
  });

  await browser.close();
}
