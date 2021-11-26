var mainElem = document.getElementById('method-summary-table');

var enumParent = document.getElementById('enum.constant.summary');

var header = document.getElementsByClassName('header')[0].children[1].innerHTML;

var theType = header.split(' ')[0].toLowerCase();
var name = header.split(' ')[1];

var package = "";
var output = "";

var version = "<version>";

if (window.location.href.indexOf('helpch.at') > -1) {

    // on HelpChat
    package = window.location.href.split(/\.at\/docs\/[\.\d]+\//g)[1];

    // get version from URL
    let verCounter = 0;
    version = "";
    document.location.href.split('://')[1].split('/').forEach((el) => {
        if (el.indexOf('.') > -1 && verCounter > 0 && version.length == 0) {
            version = el;
        }
        verCounter++;
    });
} else {

    // on Spigot
    package = window.location.href.split('javadocs/bukkit/')[1];   
}

package = package.replace(/\/[\w.]+$/g,'').replace(/\//g,'.');

if (theType == "enum") {
    name = header.split(' ')[2];
}

// get rid of any junk generic in the name for the API link
apiLinkName = name.replace(/&lt;.+/g,'');

output += `// API Link: https://tfb.neocities.org/${version}/${package.replace(/\./g,'/') + "/" + apiLinkName}\n\n`;

output += "namespace " + package + " {\n";


output += "\t/** @description */\n";

output += "\texport " + theType + " " + name + " {\n\n";

// Methods (Classes and Interfaces)
if (mainElem && theType != "enum") {
    
    var tableContents = mainElem.children[1].children[0].children;

    for (var i=3;i<tableContents.length;i += 3) {
    
    
        description = tableContents[i+2].innerHTML.replace(/<a/g,' <a').replace(/<\/?[\w"'=\-_\.\/#() ]+>/g,'').replace(/\n/g,'').replace(/\.$/g,'').replace(/\([\w\.]+\.[\w\.]+\)/g,'()').replace(/  /g,' ');
    
        descriptionOut = "/** @";
    
        if (description.indexOf('Deprecated.') == 0) {
            descriptionOut += "deprecated ";
            description = description.split("Deprecated.")[1];
        } else {
            descriptionOut += "description ";     
        }

        paramText = tableContents[i+1].children[0].children[0].children[0].href;
        hasParams = paramText.match(/\([\w\.\<\>\,\[\]\% ]+\)/g);

        paramCount = 0;

        if (hasParams) {
            for (var j=0;j<paramText.length;j++) {
                if (paramText[j] == ',') {
                    paramCount++;
                }
            }
            // add extra because 1 comma = 2 params, 2 commas = 3 params, etc.
            paramCount++;
        }

        methodName = tableContents[i+1].children[0].children[0].children[0].innerHTML;

        finalReturnType = "";
        returnType = tableContents[i].children[0];

        if (returnType.children.length > 0) {
            finalReturnType = returnType.children[0].title.split(' in ')[1] + "." + returnType.children[0].innerHTML;
        }


        returnType = returnType.innerHTML.toLowerCase();

        // check if it has a generic type
        if (returnType.indexOf('&lt;') > 0) {
            finalReturnType = "fillInGeneric";
        }

        isStatic = false;

        if (returnType.indexOf('static ') == 0) {
            isStatic = true;
            returnType = returnType.substr(7);
        }

        if (finalReturnType.length == 0) {
            finalReturnType = returnType;
        }

        if (description.indexOf('&nbsp;') != 0) {

            descriptionOut += description + " */";
    
            output += "\t\t" + descriptionOut + "\n";
        }
    
        output += "\t\t" + ((isStatic) ? "static " : "") + methodName + '('

        for (var j=0;j<paramCount;j++) {
            output += `param${j+1}: fillIn, `;
        }

        if (paramCount > 0) {
            output = output.substring(0,output.length - 2);
        }

        //output += `${(hasParams) ? "params: fillIn" : ""}`
        output += `) : ${finalReturnType}${(theType == "class") ? " {return;}" : ";"}\n\n`;
    
    }
} else if (enumParent) {
    var enumList = enumParent.children[2].children;

    for (var i=2;i<enumList.length;i += 2) {

        descParent = enumList[i+1];

        if (descParent.children.length > 0) {
            output += "\t\t/** @description " + enumList[i+1].children[0].innerHTML.replace(/\n/g,'').replace(/\./g,'') + " */\n";
        }
        
        output += "\t\t" + enumList[i].children[0].children[0].children[0].innerHTML + ",\n";
    }

    output = output.substr(0,output.length-2);
    output += "\n";
}


output += "\t}\n";
output += "}";

document.body.innerHTML += "<textarea id='copyfield'></textarea>";

var copyBox = document.getElementById('copyfield');

copyBox.value = output;

/* Select the text field */
copyBox.select();
copyBox.setSelectionRange(0, 99999); /* For mobile devices */

/* Copy the text inside the text field */
document.execCommand("copy");

copyBox.outerHTML = "";

setTimeout(() => {window.location.reload()},100);