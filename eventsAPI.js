/**
 * Created by dd on 9/18/15.
 */

/**
 * Get the URL to lookup a user-provided query string
 * @param q
 * @param apiKey
 * @param searchUrl
 * @returns {string}
 */
biolog.Bioontology.getUrlSearchEvents = function(q) {
    return biolog.Bioontology.getUrlSearchSemanticTypes(biolog.Bioontology.ONTOLOGIES_EVENTS, biolog.Bioontology.SEMANTIC_TYPES_EVENTS, q);
};

biolog.Bioontology.getParamsSearchConditions = function(q) {
    return biolog.Bioontology.getParamsSearch(biolog.Bioontology.ONTOLOGIES_EVENTS, q);
};

/**
 * Search for conditions matching the provided query
 * @param q - the query to search.  Expected to be a string that the user is entering in a text box.  Optimized for typeahead functionality
 * @param callback - the callback to which the result array is passed
 */
biolog.Bioontology.searchEvents = function(q, callback) {
    var url = biolog.Bioontology.getUrlSearchEvents(q);
    console.log("biolog.Bioontology.searchEvents:", url);
    HTTP.get(url, function (err, response) {
        if (err) {
            return callback(err);
        }
        var json = JSON.parse(response.content);
        return callback(null, json.collection);
    });
};

