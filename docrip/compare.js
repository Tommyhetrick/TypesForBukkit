const fs = require('fs');

const cheerio = require('cheerio');

const storeFile = "fileNames.txt";

const passAll = false;

const toRemove = ['head','.flex-header','script','.notes','.detail','.inherited-list'];

contents = fs.readFileSync(storeFile);

contents = contents.toString().split('\n');

for (var i=0;i<contents.length;i++) {

    fileName1 = contents[i];
    
    if (fileName1.match(/index-all\.html$/g)) {
        continue;
    }

    console.log("File " + fileName1 + " (index: " + i + ")");

    if (fileName1.indexOf('rip1/') == 0) {
        fileName2 = fileName1.replace('rip1/','rip2/');
    } else {
        fileName2 = fileName1.replace('rip2/','rip1/');       
    }

    //console.log(fileName1, fileName2);

    try {

        file1Contents = fs.readFileSync(fileName1).toString();
        file2Contents = fs.readFileSync(fileName2).toString();

        file1Dom = cheerio.load(file1Contents);
        file2Dom = cheerio.load(file2Contents);
        
        
        // remove elements from DOM
        for (var j=0;j<toRemove.length;j++) {
            file1Dom(toRemove[j]).remove();
            file2Dom(toRemove[j]).remove();
        }

        // If it is an Enum, remove the method definitions, since we don't use them and they can be different
        if (file1Dom('.header').html().indexOf('Enum') > -1) {
            file1Dom('.method-summary').remove();
            file2Dom('.method-summary').remove();
        }

        // replace all spaces, newlines, etc. im descriptions since they are randomly added for some reason.
        // file1Dom.window.document.querySelectorAll('col-last').forEach((e) => {
        //     e.innerHTML = e.innerHTML.replace(/[ \n\r\t]/g,'');
        // });

        // file2Dom.window.document.querySelectorAll('col-last').forEach((e) => {
        //     e.innerHTML = e.innerHTML.replace(/[ \n\r\t]/g,'');
        // });

        // save modified DOM back into contents variable for replacing

        file1Contents = file1Dom('body').html();
        file2Contents = file2Dom('body').html();


        // cut off files before the package name
        file1Contents = file1Contents.replace(/[\W\w]*<span class="package-label-in-type">/g,'').
        file2Contents = file2Contents.replace(/[\W\w]*<span class="package-label-in-type">/g,'').

        
        // do all cleanup of files .replace(/class=\"inherited-list\"[\W\w]*/g,'') .replace(/<dl class="notes">[\W\w]*<\/dl>/g,'')
        file1Contents = file1Contents.replace(/<[^>]+>/g,'').replace(/ /g,'').replace(/^    /gm,'').replace(/<!--[\w\W]*-->\n/g,'').replace(/\n\n/g,'').replace(/EnumClass/g,'Enum');
        file2Contents = file2Contents.replace(/<[^>]+>/g,'').replace(/ /g,'').replace(/^    /gm,'').replace(/<!--[\w\W]*-->\n/g,'').replace(/\n\n/g,'').replace(/EnumClass/g,'Enum');

        
        // cut off files after Copyright
        file1Contents = file1Contents.replace(/Copyright&#[\W\w]*/g,'');
        file2Contents = file2Contents.replace(/Copyright&#[\W\w]*/g,'');

        outputPath1 = __dirname + '/output/'+fileName1.replace(/\//g,'\_').replace(/\.html/g,'.txt');
        outputPath2 = __dirname + '/output/'+fileName2.replace(/\//g,'\_').replace(/\.html/g,'.txt');

        if (file1Contents != file2Contents || passAll) {
            fs.appendFileSync("out.txt",fileName1 + "\n"); 
            fs.appendFileSync(outputPath1,file1Contents + "\n"); 
            fs.appendFileSync(outputPath2,file2Contents + "\n"); 
            console.log('✅');
        } else {
            console.log('❌');
        }

        if (global.gc && i % 100 == 0) {
            global.gc();
        }
        // if (file1Contents != file2Contents) {
        //     fs.appendFileSync(__dirname + "/out.txt",fileName1 + "\n");

        //     maxLength = Math.max(file1Contents.split("\n").length,file2Contents.split("\n").length);

        //     outputPath = __dirname + '/output/'+fileName1.replace(/\//g,'\_').replace(/\.html/g,'.md');

        //     fs.writeFileSync(outputPath,"");

        //     for (var j=0;j<maxLength;j++) {


        //         console.log("    Line index: " + j + " (out of " + (maxLength + 1) + ") for file: " + fileName1 );

        //         file1Line = file1Contents.split("\n");
        //         file2Line = file2Contents.split("\n");

        //         file1Line = (j <= file1Line.length) ? file1Line[j] : "";
        //         file2Line = (j <= file2Line.length) ? file2Line[j] : "";

        //         diffFlag = (file1Line == file2Line) ? "" : "# ";

        //         fs.appendFileSync(outputPath,diffFlag + file1Line + "    " + file2Line + "\n");
        //     }
        // }
    } catch (err) {
        //console.log(err);
        console.log('✅');
        fs.appendFileSync("out_new.txt",fileName1 + " or " + fileName2 + "\n"); 
    }
}