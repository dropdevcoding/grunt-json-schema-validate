# grunt-json-schema-validator

> A grunt plugin to validate json files against given json-schema(s)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-json-schema-validator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-json-schema-validate');
```

## The "json_schema_validate" task

### Overview
In your project's Gruntfile, add a section named `json_schema_validate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  json_schema_validate: {
    test: {
        options: {
            schemas: {
                '/Default': 'schema/default.json'
            }
        },
        files: {
            '/Default': [
                'data/*.json'
            ]
        }
    }
  },
});
```

### Options

#### options.schemas
Type: `Object`

An object used to define schemas by name => file mappings

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
