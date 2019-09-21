import parse from "../index.js";

// Parse my custom language "cjs"
parse("text/cjs", function(text, script) {
    var res = text.replace(/\[\[.*\]\]/g, function(match) {
        // Evaluate JS in double square braces
        return "<span title=\"" + match + "\">" + eval(match) + "</span>";
    }).replace(/.*\n/g, function(match) {
        // Make lines into paragraphs
        return "<p>" + match.slice(0, -1) + "</p>";
    }).replace(/<p>(=|-){4,}<\/p>/g, function() {
        // Replace lines with hr
        return "<hr>";
    }).replace(/<p>.+<\/p><hr>/g, function(match) {
        // Make paragraphs above lines into headings
        return "<h1>" + match.slice(3, -8) + "</h1><hr>";
    });
    // Output to element in "out" data attribute
    if(!!script.dataset.out) {
        var out = document.getElementById(script.dataset.out);
        if(!!out) {
            // There was a destination specified
            out.innerHTML = res;
        } else {
            // Add the result to a div
            var output = document.createElement("div");
            output.innerHTML = res;
            // Append the div to the document
            document.body.appendChild(output);
        }
    }
});