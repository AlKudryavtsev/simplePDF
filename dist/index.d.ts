type PageMargin = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
declare function renderPdfFromHtml(html: string, src: string, margin?: PageMargin, landscape?: boolean, format?: 'a4' | 'a5', parseImage?: boolean): Promise<void>;
declare function renderLandscapePdfFromHtml(html: string, src: string, margin?: PageMargin, format?: 'a4' | 'a5', parseImage?: boolean): Promise<void>;
declare function renderUrlToPdf(url: string, src: string, margin?: PageMargin, landscape?: boolean, format?: 'a4' | 'a5'): Promise<void>;

export { type PageMargin, renderLandscapePdfFromHtml, renderPdfFromHtml, renderUrlToPdf };
