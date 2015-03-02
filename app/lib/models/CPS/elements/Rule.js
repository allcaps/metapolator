define([
    './_Node'
], function(
    Parent
) {
    "use strict";
    /**
     * The container for selectors and parameters.
     */
    function Rule(selectorList, parameterDict, source, lineNo) {
        Parent.call(this, source, lineNo);
        this._selectorList = selectorList;
        Object.defineProperty(this, 'parameters', {
            value: parameterDict
          , enumerable: true
        });
    }
    
    var _p = Rule.prototype = Object.create(Parent.prototype)
    _p.constructor = Rule;
    
    _p.toString = function() {
        return [this._selectorList, ' ', this.parameters].join('');
    };
    /**
     * If no namespaces are provided, the result of this method equals
     * this._selectorList.
     */
    _p.getSelectorList = function(namespaces) {
        var selectorList = this._selectorList
          , i, l
          ;
        // Multiply the selectorList on the left by each namespace in turn
        if (namespaces !== undefined) {
            for(i=0, l=namespaces.length;i<l;i++)
                if(namespaces[i] !== null)
                    selectorList = namespaces[i].multiply(selectorList);
        }
        return selectorList;
    };

    return Rule;
})
