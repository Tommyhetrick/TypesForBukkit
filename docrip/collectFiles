const fs = require('fs');

const storeFile = "fileNames.txt";

fs.writeFileSync(storeFile,"");

getFiles('rip1');
getFiles('rip2');

async function getFiles(path) {

    fs.readdir(path, (err,contents) => {

        for (var i=0;i<contents.length;i++) {
            if (contents[i].indexOf('.') == -1) {
                console.log('folder: ' + contents[i]);
                getFiles(path + "/" + contents[i]);
            } else {
                console.log('file: ' + contents[i]);

                if (contents[i].indexOf('.html') > -1 && path.indexOf('class-use') == -1 && contents[i].indexOf('package-summary') == -1 && contents[i].indexOf('package-tree') == -1 && contents[i].indexOf('package-use') == -1) {

                    fs.appendFile(storeFile,path + "/" + contents[i] + "\n",{},() => {
    
                    });
                }
            }
        }
    })
}
