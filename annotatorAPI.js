/**
 * Created by dd on 9/7/15.
 */




biolog.Bioontology.getBaseUrlAnnotator = function() {
    return biolog.Bioontology.getBaseUrl() + "/annotator";
};

/**
 *
 * @param ontology
 * @param q
 * @returns {string}
 */
biolog.Bioontology.getUrlAnnotator = function(ontology, semanticTypes, q) {
    var apiKey = biolog.Bioontology.getApiKey();
    var url = biolog.Bioontology.getBaseUrlAnnotator();
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
biolog.Bioontology.annotate = function(text, ontologies, semanticTypes, callback) {
    var url = biolog.Bioontology.getUrlAnnotator(ontologies, semanticTypes, text);
    //console.log("biolog.Bioontology.annotate at URL=" + url + "; text=", text);
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
 * Annotate a block of text against biolog.Bioontology
 * @param text
 * @param callback
 */
biolog.Bioontology.annotateHealth = function(text, callback) {
    return biolog.Bioontology.annotate(text, biolog.Bioontology.ONTOLOGIES_HEALTH, biolog.Bioontology.SEMANTIC_TYPES_HEALTH, callback);
};