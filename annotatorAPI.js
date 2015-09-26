/**
 * Created by dd on 9/7/15.
 */




Bioontology.getBaseUrlAnnotator = function() {
    return Bioontology.getBaseUrl() + "/annotator";
};

/**
 *
 * @param ontology
 * @param q
 * @returns {string}
 */
Bioontology.getUrlAnnotator = function(ontology, semanticTypes, q) {
    var apiKey = Bioontology.getApiKey();
    var url = Bioontology.getBaseUrlAnnotator();
    url += "?suggest=true" +
        "&ontologies=" + ontology +
        "&include=prefLabel,synonym,definition,notation,cui,semanticType,properties" +
        "&display_context=false" +
        "&apikey=" + apiKey;
    if (semanticTypes) url += "&semantic_types=" + semanticTypes;
    return url;
};

/**
 * Annotate a block of text against the desired ontologies
 * @param text
 * @param ontologies
 * @param callback
 */
Bioontology.annotate = function(text, ontologies, semanticTypes, callback) {
    var url = Bioontology.getUrlAnnotator(ontologies, semanticTypes, text);
    //console.log("Bioontology.annotate at URL=" + url);
    HTTP.post(url,
        {data: {"text": text}},
        function (err, response) {
        if (err) {
            return callback(err);
        }
        var json = JSON.parse(response.content);
        return callback(null, json);
    });
};

/**
 * Annotate a block of text against Bioontology
 * @param text
 * @param callback
 */
Bioontology.annotateHealth = function(text, callback) {
    return Bioontology.annotate(text, Bioontology.ONTOLOGIES_HEALTH, Bioontology.SEMANTIC_TYPES_HEALTH, callback);
};