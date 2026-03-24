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
import { ajax } from '@orians/core';
```

## Credits

-   [Comus Bala](https://github.com/comusbala96)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.


# A npm package of tailwind css for OrianSoft.

## Installation

```npm
npm i @orians/tailwind
```

## Or

```yarn
yarn add @orians/tailwind
```

## Import in app.css

```css
@import '@orians/tailwind/base.css';
```

## Configure in tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
import config from '@orians/tailwind/tailwind.config.js';
export default {
    ...config,
    content: ['./**/*.{js,blade.php,php}'],
};
```

## Configure in postcss.config.js

```js
import config from '@orians/tailwind/postcss.config.js';
export default config;
```

## Credits

-   [Comus Bala](https://github.com/comusbala96)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
