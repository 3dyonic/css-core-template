const grunt = require('grunt')

grunt.initConfig({
    //sort order A-Z
    cssstats: {
        options: {
            logConsole: false,
            jsonOutput: false,
            htmlOutput: true,
            uniqueDeclarations: [
                'font-size',
                'float',
                'width',
                'height',
                'color',
                'background-color'
            ],
            addOrigin: false,
            addRawCss: false,
            addHtmlStyles: true,
            addGraphs: true,
            csslint: {
                clearDefaults: false,
                ruleset: {
                    //rulesetFile: 'path/to/rulesetFile.json',
                    'zero-units': true,
                    'adjoining-classes': true
                },
                groupResults: true
            }
        },
        files: {
            'theme/stats.html': ['theme/css/**/*.css']
        },
    },
    postcss: {
        options: {
            map: {
                inline: false, // save all sourcemaps as separate files...
                annotation: false
            },
            processors: [
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                //require('cssnano')() // minify the result
                require('postcss-combine-duplicated-selectors'),
                require('postcss-discard-comments')({removeAll: true}),
            ]
        },
        dist: {
            src: 'theme/css/*.css'
        }
    },
    sass: {
        dist: { // Target
            files: {
                'theme/css/styles.css': 'theme/styles/styles.scss'
            }
        }
    },
    sass_globbing: {
        //CORE Globing
        //-- tools
        CORE_tools: {
            files: {
                'theme/styles/core/tools/_glob-core-tools.scss': [
                    'theme/styles/core/tools/functions/**/*.scss',
                    'theme/styles/core/tools/mixins/**/*.scss',
                    //exclude compiled file
                    '!theme/styles/core/tools/_glob-core-tools.scss'
                ],
            },
            options: {
                useSingleQuotes: true,
                signature: '/// CORE FUNCTIONS & MIXINS globed from [core/tools] folder'
            }
        },
        //-- base
        CORE_base: {
            files: {
                'theme/styles/core/base/_glob-core-base.scss': [
                    'theme/styles/core/base/generic/**/*.scss',
                    'theme/styles/core/base/elements/**/*.scss',
                    'theme/styles/core/base/objects/**/*.scss',
                    'theme/styles/core/base/utilities/**/*.scss',
                    //exclude compiled file
                    '!theme/styles/core/base/_glob-core-base.scss'
                ],
            },
            options: {
                useSingleQuotes: true,
                signature: '/// CORE RESETS, OBJECTS & UTILITIES globed from [core/base] folder'
            }
        },
        //-- UI
        CORE_ui: {
            files: {
                'theme/styles/core/ui/_glob-core-ui.scss': [
                    'theme/styles/core/ui/components/**/*.scss',
                    'theme/styles/core/ui/vendors/**/*.scss',
                    //exclude compiled file
                    '!theme/styles/core/ui/_glob-core-ui.scss'
                ],
            },
            options: {
                useSingleQuotes: true,
                signature: '/// CORE UI components and CORE vendor components  globed from [core/ui] folder]'
            }
        },
        //THEME Globing
        //-- tools
        THEME_tools: {
            files: {
                'theme/styles/tools/_glob-theme-tools.scss': [
                    'theme/styles/tools/functions/**/*.scss',
                    'theme/styles/tools/mixins/**/*.scss',
                    //exclude compiled file
                    '!theme/styles/tools/_glob-theme-tools.scss'
                ],
            },
            options: {
                useSingleQuotes: true,
                signature: '/// THEME local, FUNCTIONS & MIXINS globed from [tools] folder'
            }
        },
        //-- ui
        THEME_ui: {
            files: {
                'theme/styles/ui/_glob-theme-ui.scss': [
                    'theme/styles/ui/core-components/**/*.scss',
                    'theme/styles/ui/core-vendors/**/*.scss',
                    'theme/styles/ui/components/**/*.scss',
                    'theme/styles/ui/vendors/**/*.scss',
                    //exclude compiled file
                    '!theme/styles/ui/_glob-theme-ui.scss'
                ],
            },
            options: {
                useSingleQuotes: true,
                signature: '/// THEME local, FUNCTIONS & MIXINS globed from [tools] folder'
            }
        },
    },
    sassdoc: {
        core: {
            src: [
                [
                    'theme/styles/',
                ]
            ],
            options: {
                dest: 'theme/sassDoc',
                groups: {
                    'undefined': 'General',
                    'DRY VARIABLES': 'DRY VARIABLES',
                    'STYLE GUIDE CONFIGURATION': 'STYLE GUIDE CONFIGURATION',
                },
            },
        },
    },
    sasslint: {
        options: {
            configFile: '.sass-lint.yml',
            formatter: 'html',
            outputFile: 'theme/report.html',
        },
        //* instead of ** for some reason :)
        target: ['theme/styles/*/*.scss'],
    },
    watch: {
        gruntfile: {
            files: 'Gruntfile.js',
        },
        sass: {
            files: ['theme/styles/**/*.scss'],
            tasks: ['sass'],
        },
    },
});

require('load-grunt-tasks')(grunt);

grunt.registerTask('default', ['sass_globbing', 'sass', 'sasslint', 'postcss', 'cssstats', 'sassdoc']);
grunt.registerTask('watch-style', ['watch', 'sass_globbing', 'sass', 'sasslint', 'postcss', 'cssstats', 'sassdoc']);
