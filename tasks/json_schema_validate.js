/*
 * grunt-json-schema-validator
 * https://github.com/dropdevcoding/grunt-json-schema-validator
 *
 * Copyright (c) 2016 dropdevcoding
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('json_schema_validate', 'A grunt plugin to validate json files against given json-schema(s)', function () {
        var fs = require('fs'),
            Validator = require('jsonschema').Validator,
            validator = new Validator(),
            options = this.options(),
            schemas = {};

        if (!options.schemas || !Object.keys(options.schemas)) {
            grunt.log.error('No schemas given in options.schemas');
            return;
        }

        for (var schemaUri in options.schemas) {
            var file = options.schemas[schemaUri];

            if (!grunt.file.exists(file)) {
                grunt.log.error('Schema file ' + file + ' for schema ' + schemaUri + ' does not exist');
                return;
            }

            schemas[schemaUri] = grunt.file.readJSON(file);
            validator.addSchema(schemas[schemaUri], schemaUri);
        }

        this.files.forEach(function (file) {
            var usedSchemaUri = file.dest;

            if (!schemas[usedSchemaUri]) {
                grunt.log.error('Schema for schema URI ' + file.dest + ' has not been defined in options.schemas');
                return;
            }

            file.src.forEach(function (src) {
                grunt.log.subhead('Validating file ' + src + ' using schema ' + usedSchemaUri + '...');

                var contents = grunt.file.readJSON(src),
                    result = validator.validate(contents, schemas[usedSchemaUri]);

                if (!result.valid) {
                    grunt.log.subhead('Errors in ' + src);

                    result.errors.forEach(function (error) {
                        grunt.log.errorlns(error.property + ' ' + error.message);
                    });
                } else {
                    grunt.log.oklns(src);
                }
            });
        });

        if (this.errorCount) {
            return false;
        }

        grunt.log.ok();
    });
};
