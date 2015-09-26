/**
 * Created by Dave Donohue on 2015-09-04.
 * This is the API for the biolog:bioontology package for Meteor.
 */

Bioontology = {
    ONTOLOGIES_CONDITIONS: "MEDLINEPLUS,ICD10CM",
    ONTOLOGIES_MEDS: "RXNORM",
    ONTOLOGIES_HEALTH: "MEDLINEPLUS,ICD10CM,RXNORM",
    ONTOLOGY_MESH: "MESH",
    SEMANTIC_TYPES_MEDS: "T116,T109,T121,T002,T197,T127",
    SEMANTIC_TYPES_HEALTH: "T002,T019,T020,T037,T046,T047,T048,T049,T050,T190,T191,T033,T184,T017,T029,T023,T030,T031,T022,T025,T026,T018,T021,T024,T116,T195,T123,T122,T118,T103,T120,T104,T200,T111,T196,T126,T131,T125,T129,T130,T197,T119,T124,T114,T109,T115,T121,T192,T110,T127,T060,T065,T058,T059,T063,T062,T061,T074,T075,T059",
    URI_MESH_TRADENAME_OF: "http://purl.bioontology.org/ontology/MESH/tradename_of",
    URI_RXNORM_TRADENAME_OF: "http://purl.bioontology.org/ontology/RXNORM/tradename_of",
    URI_ALT_LABEL: "http://www.w3.org/2004/02/skos/core#altLabel"
};

Bioontology.getApiKey = function() {
    return Meteor.settings.public.bioontology.apiKey;
};

Bioontology.getBaseUrl = function() {
    if (Meteor.settings.public.bioontology.baseUrl) {
        return Meteor.settings.public.bioontology.baseUrl;
    }
    return "http://data.bioontology.org";
};

Bioontology.getBaseUrlSearch = function() {
    return Bioontology.getBaseUrl() + "/search";
};


/**
 * Get the URL to look up a query term using the MESH ontology
 * @param q
 * @returns {string}
 */
Bioontology.getUrlLookupMesh = function(q) {
    var apiKey = Bioontology.getApiKey();
    var searchUrl = Bioontology.getBaseUrlSearch();
    return searchUrl + "?suggest=false" +
        "&ontologies=" + Bioontology.ONTOLOGY_MESH +
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
Bioontology.getUrlLookup = function(ontology, entity) {
    var apiKey = Bioontology.getApiKey();
    var searchUrl = Bioontology.getBaseUrlSearch();
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
Bioontology.getUrlSearch = function(ontologies, q) {
    var apiKey = Bioontology.getApiKey();
    var searchUrl = Bioontology.getBaseUrlSearch();
    return searchUrl + "?suggest=true" +
        "&ontologies=" + ontologies +
        "&include=prefLabel,synonym,definition,notation,cui,semanticType,properties" +
        "&display_context=false&q=" + encodeURIComponent(q) +
        "&apikey=" + apiKey;
};

/**
 * Get the URL to look up any entity within the provided ontologies, limiting to the list of semantic types
 * @param ontologies
 * @param semanticTypes - the list of semantic types to restrict to (these begin with a capital T)
 * @param q - the query ter
 * @returns {string}
 */
Bioontology.getUrlSearchSemanticTypes = function(ontologies, semanticTypes, q) {
    var apiKey = Bioontology.getApiKey();
    var searchUrl = Bioontology.getBaseUrlSearch();
    return searchUrl + "?suggest=true" +
        "&ontologies=" + ontologies +
        "&semantic_types=" + semanticTypes +
        "&include=prefLabel,synonym,definition,notation,cui,semanticType,properties" +
        "&display_context=false&q=" + encodeURIComponent(q) +
        "&apikey=" + apiKey;
};

/**
 * Get the URL for looking up an OWL class
 * @param ontology - must be a single ontology
 * @param purlUrl
 * @returns {string}
 */
Bioontology.getUrlLookupClass = function(ontology, purlUrl) {
    var url = Bioontology.getBaseUrl() + "/ontologies/" + ontology + "/classes/" +
        encodeURIComponent(purlUrl) + "?apikey=" + Bioontology.getApiKey();
    return url;
};


/**
 * Get the URL for performing a batch query (to lookup multiple classes)
 * @returns {string}
 */
Bioontology.getUrlBatchQuery = function() {
    var url = Bioontology.getBaseUrl() + "/batch?apikey=" + Bioontology.getApiKey();
    return url;
};


/**
 * Given an item retrieved from Bioontology, get the CUI
 * @param item
 */
Bioontology.getItemCui = function(item) {
    var cuis = item.cui;
    if (! cuis) return;
    if ( typeof cuis === 'string') return cuis;
    if( Object.prototype.toString.call( cuis ) === '[object Array]' ) {
        return cuis[0];
    }
};

/**
 * Given an item retrieved from Bioontology, get the preferred label
 * @param item
 */
Bioontology.getItemPreferredLabel = function(item) {
    if (!item) return;
    return item.prefLabel;
};

/**
 * Given an item retrieved from Bioontology, get the alternate labels (if any)
 * @param item
 */
Bioontology.getItemAlternateLabels = function(item) {
    if (!item || !item.properties) return;
    return item.properties[Bioontology.URI_ALT_LABEL];
};

/**
 * Given an item retrieved from Bioontology, get the alternate labels (if any)
 * @param item
 */
Bioontology.getItemSemanticTypes = function(item) {
    if (!item) return;
    return item.semanticType;
};