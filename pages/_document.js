import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* BOOTSTRAP v4.1 JS  */}
        <script
          src='https://code.jquery.com/jquery-3.3.1.slim.min.js'
          integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo'
          crossorigin='anonymous'
          async></script>
        <script
          src='https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js'
          integrity='sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49'
          crossorigin='anonymous'
          async></script>
        <script
          src='https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js'
          integrity='sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy'
          crossorigin='anonymous'
          async></script>

        <script
          src='https://kit.fontawesome.com/a076d05399.js'
          crossorigin='anonymous'
          async></script>
      </body>
    </Html>
  );
}
