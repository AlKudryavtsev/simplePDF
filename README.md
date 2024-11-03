## Installing 

Install need packages

```
yarn add axios cheerio puppeteer sharp
```

Install package

```
yarn add git+https://github.com/AlKudryavtsev/simplePDF.git
```


## Types

### PageMargin

| filed | type | default |
| ----- | ----- |---------|
|  top | number | 30      |
|  right | number | 10      |
|  bottom | number | 30      |
|  left | number | 10      |


## Methods

### renderPdfFromHtml

Render html string to pdf file


| filed      | type       | main  | default                                              | description             |
|------------|------------|-------|------------------------------------------------------|-------------------------|
| html       | string     | true  | none                                                 | html string             |
| src        | string     | true  | none                                                 | destination file        |
| margin     | PageMargin | false | ``` { top: 30, right: 10, bottom: 30, left: 10 } ``` | margin size             |
| landscape  | boolean    | false | false                                                | page orientation        |
| format     | string     | false | 'a4'                                                 | page size: 'a4' or 'a5' |
| parseImage | boolean    | false | false                                                | Parse and resize image  |


### renderLandscapePdfFromHtml

Render html string to pdf file with landscape orientation

| filed      | type       | main  | default                                              | description             |
|------------|------------|-------|------------------------------------------------------|-------------------------|
| html       | string     | true  | none                                                 | html string             |
| src        | string     | true  | none                                                 | destination file        |
| margin     | PageMargin | false | ``` { top: 30, right: 10, bottom: 30, left: 10 } ``` | margin size             |
| format     | string     | false | 'a4'                                                 | page size: 'a4' or 'a5' |
| parseImage | boolean    | false | false                                                | Parse and resize image  |

### renderUrlToPdf

Render url page to pdf file

| filed      | type       | main  | default                                              | description             |
|------------|------------|-------|------------------------------------------------------|-------------------------|
| url        | string     | true  | none                                                 | url address             |
| src        | string     | true  | none                                                 | destination file        |
| margin     | PageMargin | false | ``` { top: 30, right: 10, bottom: 30, left: 10 } ``` | margin size             |
| landscape  | boolean    | false | false                                                | page orientation        |
| format     | string     | false | 'a4'                                                 | page size: 'a4' or 'a5' |
| parseImage | boolean    | false | false                                                | Parse and resize image  |
