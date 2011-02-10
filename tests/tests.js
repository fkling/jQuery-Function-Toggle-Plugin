$(document).ready(function() {
    test('funcToggle() without data', function() {
        expect(2);
        $(document.body).funcToggle('click', function() {
            ok(true, "First handler called");
        },
        function() {
            ok(true, "Second handler called");
        }).click().click().unbind('click');
    });
    
    test('funcToggle() functions are called in right order', function() {
        var counter = 0;
        $(document.body).funcToggle('click', function() {
            equals(counter, 0,  "First handler called");
            counter++;
        },
        function() {
            equals(counter, 1, "Second handler called");
        }).click().click().unbind('click');
    });

    test('funcToggle() first function is called again', function() {
        var counter = 0;
        var lastCalled = false;
        $(document.body).funcToggle('click', function() {
            if(!lastCalled) {
                equals(counter, 0,  "First handler called");
            }
            else {
                equals(counter, 2, "First handler called again");
            }
            counter++;

        },
        function() {
            equals(counter, 1, "Second handler called");
            lastCalled = true;
            counter++;
        }).click().click().click().unbind('click');
    });

    test('funcToggle() this is correctly set', function() {
        $(document.body).funcToggle('click', {foo: 'bar'}, function() {
            equals(this, document.body, "First handler: this is correctly set");
        },
        function(event) {
            equals(this, document.body, "Second handler: this is correctly set");
        }).click().click().unbind('click');
    });


    test('funcToggle() with data', function() {
        $(document.body).funcToggle('click', {foo: 'bar'}, function(event) {
            ok(event.data, "First handler: event data set");
            equals(event.data.foo, 'bar', "First handler: event data correctly set");
        },
        function(event) {
            ok(event.data, "Second handler: event data set");
            equals(event.data.foo, 'bar', "Second handler: event data correctly set");
        }).click().click().unbind('click');
    });



    test('funcToggle() with a lot of event handlers', function() {
        var num = 20,
            counter = 0,
            lastCalled = false,
            funcs = [];

        expect(num+1);

        for(var i = 0; i < num; i++) {
            funcs.push((function(index) {
                var func;
                if(index === 0) {
                    func = function() {
                        if(!lastCalled) {
                            equals(counter, index, "First function called");
                        }
                        else {
                            equals(counter, num, "First function called again");
                        }
                        counter++;
                    };
                }
                 else if(index === (num - 1)) {
                    func = function() {
                        equals(counter, index, "Last function called");
                        lastCalled = true;
                        counter++;
                    }
                 }
                 else {
                     func = function() {
                        equals(counter, index, (index+1) + ". function called");
                        counter++;
                     }
                 }
                 return func;
            }(i)));
        }

        $(document.body).funcToggle.apply($(document.body), ['click'].concat(funcs));
        for(var i = 0; i <= num; i++) {
             $(document.body).click();
        }
        $(document.body).unbind('click');
    });
});
