/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */


/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, define, Mustache, $ */


define(function (require, exports, module) {
    "use strict";
    
    var _apiUrlPrefix = "https://api.typekit.com/muse_v1/";
    var _fontFamilies = {};

    var pickerHtml = require("text!htmlContent/ewf-picker.html"),
        Strings    = require("strings");
    
    function refreshFamilies() {
        var d = $.Deferred();
        
        // TODO: Add error handling
        $.getJSON(_apiUrlPrefix + "families", function (data) {
            _fontFamilies = data.families;
            console.log("Refreshed families", _fontFamilies);
            d.resolve();
        });
        
        return d.promise();
    }

    function renderPicker(domElement) {
        $(domElement).html(Mustache.render(pickerHtml, {families: _fontFamilies.slice(0, 10), Strings: Strings}));
    }
    
    function init(apiUrlPrefix) {
        var d = $.Deferred();
        _apiUrlPrefix = apiUrlPrefix;

        refreshFamilies().done(function () { d.resolve(); });
        return d.promise();
    }
    
    exports.refreshFamilies = refreshFamilies;
    exports.renderPicker = renderPicker;
    exports.init = init;
    
});
