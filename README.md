# A npm package of core for OrianSoft.

## Installation

```npm
npm i @orians/core
```

## Or

```yarn
yarn add @orians/core
```

## Uses

```js
import { App } from '@orians/core';
```

## Credits

-   [Comus Bala](https://github.com/comusbala96)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.


## Import in app.css

```css
@import '@orians/core/tailwind/base';
```

## Configure in tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
import config from '@orians/core/tailwind';
export default {
    ...config,
    content: ['./vendor/**/*.{js,ts,jsx,php,blade.php}', './storage/**/*.{js,ts,jsx,php,blade.php}', './resources/**/*.{js,ts,jsx,php,blade.php}', './app/**/*.{php,blade.php}'],
};
```

## Configure in postcss.config.js

```js
import config from '@orians/core/tailwind/postcss';
export default config;
```

## Credits

-   [Comus Bala](https://github.com/comusbala96)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
