ig.module('utils.string')
    .requires('utils.utils')
    .defines(function() {
        'use strict';

        /**
         * Helpers for dealing with strings.
         * @memberof ig
         * @namespace ig.utilsstring
         * @author Dylan Falconer
         */
        ig.utils.string = {

            /**
             * Converts the first letter of a string to uppercase
             * @param  {String} s The string.
             * @return {String}   The string with the first letter in uppercase.
             */
            ucFirst: function(s) {

                return s.charAt(0).toUpperCase() + s.substr(1);

            },

            /**
             * Converts the last letter of a string to uppercase
             * @param  {String} s The string.
             * @return {String}   The string with the last ltter in uppercase.
             */
            ucLast: function(s) {

                return s.charAt(s.length - 1).toUpperCase() + s.substring(0, s.length - 1);

            },

            camelCase: function(s) {

                return s.toLowerCase().replace(/\s(.)/g, function(match, fl) {
                    return fl.toUpperCase();
                });

            }

        }

    });