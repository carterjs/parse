/**
 * The type definition of the parser
 * @name parser
 * @param {string} text 
 * @param {HTMLScriptElement} script the script tag - useful for data attributes.
 */

/**
 * Parse text content from script tags
 * @param {string} type - the MIME type to target
 * @param {parser} parse - the function for parsing text contents
 */
export default function (type, parse) {
    // Get all scripts with specified type
    var scripts = document.querySelectorAll("script[type='" + type + "']");
    if (!scripts) {
        return;
    }
    // Loop through scripts
    scripts.forEach(function (script) {
        // Fetch external content
        if (script.hasAttribute("src")) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if(this.readyState == 4 && this.status == 200) {
                    // Parse response text
                    parse(this.responseText, script);
                }
            };
            xhttp.open("GET", script.getAttribute("src"), true);
            xhttp.send();
        } else {
            // Parse inline text
            parse(script.innerHTML, script);
        }
    });
}
