/**
 * Created by Dave Donohue on 2015-09-04.
 * This is the API for the biolog:bioontology package for Meteor.
 */

biolog.Bioontology = {
    ONTOLOGIES_CONDITIONS: "MEDLINEPLUS,ICD10CM",
    ONTOLOGIES_MEDS: "RXNORM",
    ONTOLOGIES_HEALTH: "MEDLINEPLUS,ICD10CM,RXNORM,LOINC,MESH",
    ONTOLOGIES_EVENTS: "LOINC,MESH",
    ONTOLOGY_MESH: "MESH",
    SEMANTIC_TYPES_MEDS: "T116,T109,T121,T002,T197,T127",
    SEMANTIC_TYPES_EVENTS: "T051,T053,T055,T056,T058,T059,T068,T079",
    SEMANTIC_TYPES_HEALTH: "T002,T019,T020,T037,T046,T047,T048,T049,T050,T190,T191,T033,T184,T017,T029,T023,T030,T031,T022,T025,T026,T018,T021,T024,T116,T195,T123,T122,T118,T103,T120,T104,T200,T111,T196,T126,T131,T125,T129,T130,T197,T119,T124,T114,T109,T115,T121,T192,T110,T127,T060,T065,T058,T059,T063,T062,T061,T074,T075,T059,T051,T053,T055,T059,T068,T079",
    URI_MESH_TRADENAME_OF: "http://purl.bioontology.org/ontology/MESH/tradename_of",
    URI_RXNORM_TRADENAME_OF: "http://purl.bioontology.org/ontology/RXNORM/tradename_of",
    URI_ALT_LABEL: "http://www.w3.org/2004/02/skos/core#altLabel",
    URI_ONTOLOGIES: ""
};

biolog.Bioontology.getApiKey = function() {
    return Meteor.settings.public.bioontology.apiKey;
};

biolog.Bioontology.getBaseUrl = function() {
    if (Meteor.settings.public.bioontology.baseUrl) {
        return Meteor.settings.public.bioontology.baseUrl;
    }
    return "https://data.bioontology.org";
};

biolog.Bioontology.getBaseUrlSearch = function() {
    return biolog.Bioontology.getBaseUrl() + "/search";
};

biolog.Bioontology.getBaseUrlOntologies = function() {
    return biolog.Bioontology.getBaseUrl() + "/ontologies";
};

biolog.Bioontology.getBaseUrlLookupClass = function(ontology, purlUrl) {
    var url = biolog.Bioontology.getBaseUrl() + "/ontologies/" + ontology + "/classes/" +
        encodeURIComponent(purlUrl);
    return url;
};

biolog.Bioontology.getBaseUrlBatchQuery = function() {
    var url = biolog.Bioontology.getBaseUrl() + "/batch";
    return url;
};

/**
 * Get the URL to look up a query term using the MESH ontology
 * @param q
 * @returns {string}
 */
biolog.Bioontology.getUrlLookupMesh = function(q) {
    var apiKey = biolog.Bioontology.getApiKey();
    var searchUrl = biolog.Bioontology.getBaseUrlSearch();
    return searchUrl + "?suggest=false" +
        "&ontologies=" + biolog.Bioontology.ONTOLOGY_MESH +
        "&include=prefLabel,synonym,definition,notation,cui,semanticType,properties" +
        "&display_context=false&q=" + encodeURIComponent(q) +
        "&apikey=" + apiKey;
};


/**
 * Get the URL to look up any entity within the provided ontology
 * @param ontology
 * @param entity
 * @returns {string}
 */
biolog.Bioontology.getUrlLookup = function(ontology, entity) {
    var apiKey = biolog.Bioontology.getApiKey();
    var searchUrl = biolog.Bioontology.getBaseUrlSearch();
    return searchUrl + "?suggest=false" +
        "&ontologies=" + ontology +
        "&include=prefLabel,synonym,definition,notation,cui,semanticType,properties" +
        "&display_context=false&q=" + encodeURIComponent(entity) +
        "&apikey=" + apiKey;
};

/**
 * Get the URL to look up any entity within the provided ontology
 * @param ontologies - a comma-separated list of ontology identifiers
 * @param q - the query
 * @returns {string}
 */
biolog.Bioontology.getUrlSearch = function(ontologies, q) {
    var apiKey = biolog.Bioontology.getApiKey();
    var searchUrl = biolog.Bioontology.getBaseUrlSearch();
    return searchUrl + "?suggest=true" +
        "&ontologies=" + ontologies +
        "&include=prefLabel,synonym,definition,notation,cui,semanticType,properties" +
        "&display_context=false&q=" + encodeURIComponent(q) +
        "&apikey=" + apiKey;
};

biolog.Bioontology.getParamsSearch = function(ontologies, q) {
    var apiKey = biolog.Bioontology.getApiKey();
    return {
        suggest: true,
        ontologies: ontologies,
        include: "prefLabel,synonym,definition,notation,cui,semanticType,properties",
        display_context: false,
        q: encodeURIComponent(q),
        apikey: apiKey
    }
};

/**
 * Get the URL to look up any entity within the provided ontologies, limiting to the list of semantic types
 * @param ontologies
 * @param semanticTypes - the list of semantic types to restrict to (these begin with a capital T)
 * @param q - the query ter
 * @returns {string}
 */
biolog.Bioontology.getUrlSearchSemanticTypes = function(ontologies, semanticTypes, q) {
    var apiKey = biolog.Bioontology.getApiKey();
    var searchUrl = biolog.Bioontology.getBaseUrlSearch();
    return searchUrl + "?suggest=true" +
        "&ontologies=" + ontologies +
        "&semantic_types=" + semanticTypes +
        "&include=prefLabel,synonym,definition,notation,cui,semanticType,properties" +
        "&display_context=false&q=" + encodeURIComponent(q) +
        "&apikey=" + apiKey;
};

biolog.Bioontology.getParamsSearchSemanticTypes = function(ontologies, semanticTypes, q) {
    var apiKey = biolog.Bioontology.getApiKey();
    return {
        suggest: true,
        ontologies: ontologies,
        semantic_types: semanticTypes,
        include: "prefLabel,synonym,definition,notation,cui,semanticType,properties",
        display_context: false,
        q: encodeURIComponent(q),
        apikey: apiKey
    };
};

/**
 * Get the URL for looking up an OWL class
 * @param ontology - must be a single ontology
 * @param purlUrl
 * @returns {string}
 */
biolog.Bioontology.getUrlLookupClass = function(ontology, purlUrl) {
    var url = biolog.Bioontology.getBaseUrl() + "/ontologies/" + ontology + "/classes/" +
        encodeURIComponent(purlUrl) + "?apikey=" + biolog.Bioontology.getApiKey();
    return url;
};


biolog.Bioontology.getParamsApiKey = function(ontology, purlUrl) {
    return {
        apikey: biolog.Bioontology.getApiKey()
    };
};


/**
 * Get the URL for performing a batch query (to lookup multiple classes)
 * @returns {string}
 */
biolog.Bioontology.getUrlBatchQuery = function() {
    var url = biolog.Bioontology.getBaseUrl() + "/batch?apikey=" + biolog.Bioontology.getApiKey();
    return url;
};


/**
 * Given an item retrieved from biolog.Bioontology, get the CUI
 * @param item
 */
biolog.Bioontology.getItemCui = function(item) {
    var cuis = item.cui;
    if (! cuis) return;
    if ( typeof cuis === 'string') return cuis;
    if( Object.prototype.toString.call( cuis ) === '[object Array]' ) {
        return cuis[0];
    }
};

/**
 * Given an item retrieved from biolog.Bioontology, get the preferred label
 * @param item
 */
biolog.Bioontology.getItemPreferredLabel = function(item) {
    if (!item) return;
    return item.prefLabel;
};

/**
 * Given an item retrieved from biolog.Bioontology, get the alternate labels (if any)
 * @param item
 */
biolog.Bioontology.getItemAlternateLabels = function(item) {
    if (!item || !item.properties) return;
    return item.properties[biolog.Bioontology.URI_ALT_LABEL];
};

/**
 * Given an item retrieved from biolog.Bioontology, get the alternate labels (if any)
 * @param item
 */
biolog.Bioontology.getItemSemanticTypes = function(item) {
    if (!item) return;
    return item.semanticType;
};

/**
 * Given an item retrieved from biolog.Bioontology, get the alternate labels (if any)
 * @param item
 */
biolog.Bioontology.getItemOntology = function(item) {
    if (!item || !item.links) return;
    var ontologyLink = item.links.ontology;
    if (! ontologyLink) return;
    var ontologyArr = ontologyLink.split("/");
    var ontology = ontologyArr.slice(-1)[0];
    return ontology;
};


/**
 * For a given item (found by calling searchConditions(), searchEvents(), etc. ), lookup its classes (parents, grandparents, ... in the ontology)
 * @param item
 * @param callback
 * @returns {*}
 */
biolog.Bioontology.getItemClasses = function(item, callback) {
    var apiKey = biolog.Bioontology.getApiKey();
    var classes = [];
    //add current item as a class
    classes.push(item);
    //get ancestors
    var ancestorsUrl = item.links.ancestors;
    if (!ancestorsUrl) {
        return callback("No ancestor links found for this biolog.Bioontology item: ", item);
    }
    ancestorsUrl += "?apikey=" + apiKey;
    HTTP.get(ancestorsUrl, function (err, response) {
        if (err) {
            console.error("Unable to look up biolog.Bioontology item ancestors at url: " + ancestorsUrl, err);
            callback(err);
        }
        var json = JSON.parse(response.content);
        console.log("\n\nReceived biolog.Bioontology item ancestors from: " + ancestorsUrl);

        //batch query
        var batchUrl = biolog.Bioontology.getUrlBatchQuery();
        var batchData = {
            "http://www.w3.org/2002/07/owl#Class": {
                "collection": [],
                "display": "prefLabel,synonym,semanticTypes,cui"
            }
        };
        for (var ancestorIdx in json) {
            var ancestor = json[ancestorIdx];
            var clazz = ancestor["@id"];
            var theOntology = ancestor.links.ontology;
            batchData["http://www.w3.org/2002/07/owl#Class"].collection.push({
                "class": clazz,
                "ontology": theOntology
                //"ontology": "http://data.bioontology.org/ontologies/" + BIOONTOLOGY_ONTOLOGY_CONDITIONS
            });
        }
        //console.log("assembled batchData for batch lookup of disease class CUIs:" + JSON.stringify(batchData));
        HTTP.post(batchUrl, {data: batchData}, function(err, result) {
            if (err) {
                console.error("Unable to batch refine biolog.Bioontology item ancestors at url: " + batchUrl + ":\n" + err + "\nbatchData=" + JSON.stringify(batchData));
                callback(err);
            }
            //console.log("Batch queried these ancestors: " + JSON.stringify(result.data, null , "  "));

            for (var ancestorIdx in result.data["http://www.w3.org/2002/07/owl#Class"]) {
                var ancestor = result.data["http://www.w3.org/2002/07/owl#Class"][ancestorIdx];
                classes.push(ancestor);
            }
            callback(null, classes);
        });

    });
};