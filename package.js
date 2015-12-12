Package.describe({
  name: 'biolog:bioontology',
  version: '0.0.11',
  summary: 'Meteor package for use of Bioontology Bioportal server',
  git: 'https://github.com/biologio/bioontology.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.3');
    api.use('http@1.1.0');
    api.use('peerlibrary:async@0.9.2_1');
    api.use('biolog:biolog-core@0.0.3');
    api.addFiles([
        'bioontologyAPI.js', 'conditionsAPI.js', 'medicinesAPI.js', 'healthAPI.js', 'annotatorAPI.js', 'eventsApi.js'
        ],
        ['client', 'server']);
    //api.export('Bioontology', ['client', 'server']);
    api.addFiles('bioontology-server.js', 'server');
});

Package.onTest(function(api) {
    api.versionsFrom('1.1.0.3');
    api.use('http@1.1.0');
    api.use('peerlibrary:async@0.9.2_1');
    api.use('clinical:verification');
    //api.use('rsbatech:robotframework');
    api.use('biolog:bioontology');
    api.addFiles('bioontology-tests.js');
});
