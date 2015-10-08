/**
 * Created by dd on 10/8/15.
 */

/**
 * Get the URL to lookup a user-provided query string
 * @param q
 * @param apiKey
 * @param searchUrl
 * @returns {string}
 */
Bioontology.getUrlSearchHealth = function(q) {
    return Bioontology.getUrlSearch(Bioontology.ONTOLOGIES_HEALTH, q);
};

/**
 * Search for conditions matching the provided query
 * @param q - the query to search.  Expected to be a string that the user is entering in a text box.  Optimized for typeahead functionality
 * @param callback - the callback to which the result array is passed
 */
Bioontology.searchHealth = function(q, callback) {
    var url = Bioontology.getUrlSearchHealth(q);
    HTTP.get(url, function (err, response) {
        if (err) {
            return callback(err);
        }
        var json = JSON.parse(response.content);
        return callback(null, json.collection);
    });
};
