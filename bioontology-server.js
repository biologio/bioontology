/**
 * Created by dd on 11/29/15.
 * Not yet tested
 */
Meteor.methods({
    "biolog.bioontology.getItemClasses": function (item) {
        var getItemClassesSync = Meteor.wrapAsync(biolog.Bioontology.getItemClasses);
        try {
            var classes = getItemClassesSync(item);
            return classes;
        } catch (err) {
            console.error("ERROR getItemClasses: ", err);
            return [];
        }
    }
});