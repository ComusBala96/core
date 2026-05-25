import $ from '../jquery/jquery.js';

if (typeof window !== 'undefined') {
    window.$ = $;
    window.jQuery = $;
}

import 'jquery-validation/dist/jquery.validate.js';
import 'jquery-validation/dist/additional-methods.js';
import 'jquery-datetimepicker/build/jquery.datetimepicker.full.js';

export default $;
