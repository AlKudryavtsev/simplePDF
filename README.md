Create PDF file from html string

## Installing 


### Package manager

Using npm:

```shell 
npm install ak-simple-pdf
```

Using yarn:
```shell 
yarn add ak-simple-pdf
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


### bufferPdfFromHtml

Returns the PDF file buffer


| filed      | type       | main  | default                                              | description             |
|------------|------------|-------|------------------------------------------------------|-------------------------|
| html       | string     | true  | none                                                 | html string             |
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


### bufferLandscapePdfFromHtml

Returns the PDF file buffer

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
