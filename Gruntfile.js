const grunt = require('grunt')

grunt.initConfig({
    //sort order A-Z
    analyzecss: {
        prod: {
            sources: ['theme/css/styles.css']
        },
        options: {
            encoding: 'utf-8', // encoding to read files
            warn: 0.95,
            error: 0.8,
            padLimit: 40,
            outputMetrics: true, // can be 'warn' or 'error'
            outputDuplicateSelectors: true,
            softFail: true,
            thresholds: { // all values are maximum values
                redundantBodySelectors: 100,
                comments: 100,
                commentsLength: 100,
                complexSelectors: 100,
                complexSelectorsByAttribute: 100,
                duplicatedSelectors: 100,
                emptyRules: 100,
                expressions: 100,
                oldIEFixes: 100,
                importants: 100,
                mediaQueries: 100,
                oldPropertyPrefixes: 100,
                qualifiedSelectors: 100,
                specificityIdAvg: 100,
                specificityIdTotal: 100,
                specificityClassAvg: 100,
                specificityClassTotal: 100,
                specificityTagAvg: 100,
                specificityTagTotal: 100,
                selectorsByAttribute: 100,
                selectorsByClass: 100,
                selectorsById: 100,
                selectorsByPseudo: 100,
                selectorsByTag: 100,
                universalSelectors: 100,
                length: 100000, // 40k
                rules: 100,
                selectors: 100,
                declarations: 100
            },
            reportFile: true,
            reportFormat: 'json',
        },
    },
    csslint: {
        options: {
            csslintrc: '.csslintrc',
            formatters: [
                {
                    id: require('csslint-stylish'),
                    dest: 'theme/report-css-lint.xml'
                }
            ]
        },
        strict: {
            options: {
                import: 2
            },
            src: ['theme/css/*.css']
        }
    },
    parker: {
        options: {
            metrics: [
                "TotalStylesheets",
                "TotalStylesheetSize",
                "TotalRules",
                "TotalSelectors",
                "TotalIdentifiers",
                "TotalDeclarations",
                "SelectorsPerRule",
                "IdentifiersPerSelector",
                "SpecificityPerSelector",
                "TopSelectorSpecificity",
                "TopSelectorSpecificitySelector",
                "TotalIdSelectors",
                "TotalUniqueColours",
                "UniqueColours",
                "TotalImportantKeywords",
                "TotalMediaQueries",
                "MediaQueries",
            ],
            file: "theme/report-css-parker.md",
            colophon: true,
            usePackage: true
        },
        src: [
            'theme/css/styles.css'
        ]
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
                ],
            ],
            options: {
                dest: 'theme/sassDoc',
                groups: {
                    'undefined': 'General',
                    'DRY VARIABLES': 'DRY VARIABLES',
                    'STYLE GUIDE CONFIGURATION': 'STYLE GUIDE CONFIGURATION',
                    'CORE': 'CORE',
                },
            },
        },
    },
    sasslint: {
        options: {
            configFile: '.sass-lint.yml',
            formatter: 'html',
            outputFile: 'theme/report-sass-lint.html',
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

grunt.registerTask('default', [
        'sass_globbing',
        'sass', 'sasslint',
        'postcss',
        'sassdoc',
    ]
);
grunt.registerTask('watch-style', [
        'watch',
        'sass_globbing',
        'sass',
        'sasslint',
        'postcss',
        'sassdoc',
    ]
);
grunt.registerTask('analyze-style', [
        'analyzecss',
        'csslint',
        'parker',
    ]
);
