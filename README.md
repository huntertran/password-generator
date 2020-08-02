Password Generator
---

Anonymous password generator with pure HTML, CSS and JavaScript. No framework, no libraries, work offline.

<!-- TOC -->

- [1. Pure HTML, CSS and JavaScript](#1-pure-html-css-and-javascript)
- [2. Icons](#2-icons)
- [3. Work Offline](#3-work-offline)
- [4. Testing and SEO](#4-testing-and-seo)

<!-- /TOC -->

# 1. Pure HTML, CSS and JavaScript
<a id="markdown-pure-html%2C-css-and-javascript" name="pure-html%2C-css-and-javascript"></a>

The HTML use simple `input` tags with properties like `min`, `max`. Some other tags was used. No custom tags.

For CSS, the SCSS was used, and then compiled to css. SCSS add some nice feature like parent and child properties, reusable global variables and prefix for multiple browser support. The compiled CSS was not minified, as the file itself is relatively small.

JavaScript use module pattern, except for `service-worker.js` file.

# 2. Icons
<a id="markdown-icons" name="icons"></a>

The icon used in copy and refresh button is svg to reduce the size of the resources. Another option is icon purely written in CSS

However, favicon cannot be an svg file, so the favicon is 16x16 pixels, with 8 bit colors (256 colors), and already compressed.

# 3. Work Offline
<a id="markdown-work-offline" name="work-offline"></a>

This app implement a service worker to cache all the necessary resources in `service-worker.js`. The code of this file was copied from [here](https://github.com/chriscoyier/Simple-Offline-Site) with MIT license

# 4. Testing and SEO
<a id="markdown-testing-and-seo" name="testing-and-seo"></a>

The app was tested with Google Pagespeed and Lighthouse.

Report for lighthouse can be found [here](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fhuntertran.github.io%2Fpassword-generator%2F)

The low score for accessibility is because of some unnecessary restriction (in this app context) set by Google.

![lighthouse result](https://i.imgur.com/Rtjonu1.png)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fhuntertran%2Fpassword-generator.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fhuntertran%2Fpassword-generator?ref=badge_shield)

Report for Google Page Speed can be found [here](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fhuntertran.github.io%2Fpassword-generator%2F&tab=mobile)

![pagespeed result](https://i.imgur.com/sZLubom.png)

The App was set with `meta` tags properly to be shared on Facebook, Google and Twitter. You can check the `index.html` file to see the tags

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fhuntertran%2Fpassword-generator.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fhuntertran%2Fpassword-generator?ref=badge_large)