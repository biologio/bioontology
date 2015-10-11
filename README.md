## biolog:bioontology
This Meteor package provides an API for interacting with a [Bioontology Bioportal](http://bioportal.bioontology.org/) server,
particularly for health-related reasons.
The National Center for Biomedical Ontology is kind enough to host a server for public use,
but you can alternatively host your own Bioontology server.

This package permits you to use any Bioontology server.

This package enables you to perform these operations:

1. Search against Bioontolgy server, any ontologies
2. Annotate free text against any ontologies
3. Lookup health conditions/diseases for their disease class information, against these 2 ontologies: MEDLINEPLUS, ICD10CM
4. Lookup medicines for their ingredients + medicine class information, against the RXNORM ontology

Please see API documentation below.

### Installation
From your Meteor project directory, run this

    meteor add biolog:bioontology

### Setup
This package requires you to have a Bioontology Bioportal server that it can search.
Please see the Bioontology [Terms of Use](http://www.bioontology.org//terms).
You can use the [publicly available Bioontology server](http://bioportal.bioontology.org/) for testing and lightweight purposes.
Alternatively, you can install your own Bioontology Bioportal server using their [virtual appliance](http://www.bioontology.org/wiki/index.php/Category:NCBO_Virtual_Appliance).

From whichever Bioontology Bioportal server you use, you must get an API key to use it.  To get an API key, login to the BioPortal server web interface, and go to "Account".
Your API key is displayed there.
This package requires that your Bioontology API key exists in the Meteor settings.  You can create a **settings.json** file in the root of your project directory.

The file looks like this.

    {
      "public": {
        "bioontology": {
          "baseUrl": "http://data.bioontology.org",
          "apiKey": "put-your-apikey-here"
        }
      }
    }

Unless you have a private repository, be sure to add this to your .gitignore -  Add a line like this

    settings.json


To start your application, you will need to reference this settings file.  So instead of starting your application like this

    meteor

instead run this

    meteor run --settings settings.json


### Running Unit Tests
To run the Bioontology package tests, first stop your application.  Then run this:

    meteor test-packages --settings settings.json

Then browse to localhost:3000

### Usage of this package
For an example of how this package can be used in the real world to look up and store medication information, see here:
https://github.com/biologio/biolog/blob/master/packages/medications/view/meds.js

For an example of how this package can be used in the real world to look up and store health condition/disease information, see here:
https://github.com/biologio/biolog/blob/master/packages/conditions/view/conds.js

### API Documentation

Function      | Description
------------- | -------------
Bioontology.getUrlSearch(ontologies, q) | Get the URL to look up any entity within the provided ontology or comma-separated list of ontologies
Bioontology.getUrlSearchSemanticTypes(ontologies, semanticTypes, q) | Get the URL to look up any entity within the provided ontologies, limiting to the list of semantic types
Bioontology.searchConditions(q, callback) | Search for conditions matching the provided query - @param q - the query to search.  Expected to be a string that the user is entering in a text box.  Optimized for typeahead functionality; @param callback(error, resultArray) - the callback to which the result array is passed
Bioontology.getConditionClasses(condition, callback) | For a given condition item (found by calling searchConditions() ), lookup its classes (parents, grandparents, ... in the ontology).  @param callback(error, conditionClassesArray).
Bioontology.searchMeds(q, callback) | Search for medicines matching the provided query - @param q - the query to search.  Expected to be a string that the user is entering in a text box.  Optimized for typeahead functionality; @param callback(error, resultArray) - the callback to which the result array is passed
Bioontology.getIngredients(med, callback) | Query bioontology to get ingredients for a medicine item found. Typically such medicines would have been found by calling Bioontology.searchMeds().  @param callback(error, medicineIngredientsArray)
Bioontology.getMedClassesForEachIngredient(ingredients, callback) | For each medicine ingredient, lookup med classes - @param ingredients - array of med ingredients; @param callback(error, medicineCLassesArray)
Bioontology.searchHealth(q, callback) | Search for combination of all disease conditions and medicines that match the provided query - @param q - the query to search.  Expected to be a string that the user is entering in a text box.  Optimized for typeahead functionality; @param callback(error, result) - the callback to which the result array is passed
Bioontology.getItemCui(item) | get the (first) CUI for an item found by searching Bioontology
Bioontology.getItemPreferredLabel(item) | get the preferred label for an item
Bioontology.getItemAlternateLabels(item) | get alternate labels for an item (if any)
Bioontology.getItemSemanticTypes(item) | get semantic types for an item
Bioontology.getItemOntology(item) | get the ontology that an item came from
Bioontology.annotate(text, ontologies, semanticTypes, callback) | annotated the provided text against the list of ontologies, restricting to the provided semantic types (if any); @param callback(error, resultArray) - the callback to which the result array is passed
Bioontology.annotateHealth(text, callback) | annotated the provided text against our list of health of ontologies; @param callback(error, resultArray) - the callback to which the result array is passed


### Roadmap
* Refine the semantic types retrieved.  For now it recognizes some spurious concepts like "blood" and "water".
* add more unit tests