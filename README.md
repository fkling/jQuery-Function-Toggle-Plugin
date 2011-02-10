jQuery Function Toggle Plugin
===
Copyright (c) 2011 Felix Kling. Dual licensed under the MIT or GPL Version 2 licenses.


Overview
---

This plugin enables you to bind multiple event handlers that should be executed one after another.

**Features:**

- Provides the same interface and features as `bind()`
- Non-function arguments, apart from `false`, are handled as empty functions

Usage
---

The function `funcToggle` provides the same interface as `bind` but accepts multiple event handlers:

    funcToggle(eventType, [eventData], handler(eventObject),  [handler(eventObject), ...])



Examples:
---

This changes the text color on each consecutive click, from to original color to red, to green, to black, to red again and so forth:

    element.funcToggle('click', function() {
        $(this).css('color', 'red');
    }, function() {
        $(this).css('color', 'green');
    }, function() {
        $(this).css('color', 'black');
    });


Bind handlers for multiple events:

    element.funcToggle({
        'click': [function() {
                $(this).css('color', 'red');
            }, function() {
                $(this).css('color', 'green');
            }, function() {
                $(this).css('color', 'black');
            }],
        'mouseover': [function() {
                $(this).css('background-color', 'red');
            }, function() {
                 $(this).css('background-color', 'white');
            }]
    });
