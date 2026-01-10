import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { createStyleCollector, extractStyleHTML } from 'rsuite/ssr';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const collector = createStyleCollector();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          // @ts-expect-error - Pass styleCollector to App component
          return <App {...props} styleCollector={collector} />;
        }
      });

    // This call triggers the actual rendering, which populates the collector
    const initialProps = await Document.getInitialProps(ctx);

    // NOW extract styles after rendering is complete
    const styles = extractStyleHTML(collector);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles.__html && (
            <style
              data-rs-style-manager="true"
              dangerouslySetInnerHTML={styles}
            />
          )}
        </>
      )
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
