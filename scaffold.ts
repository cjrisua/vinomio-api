import * as yargs from 'yargs';
import * as fs from 'fs';
import * as path from 'path'
import * as pluralize from 'pluralize'
import camelcase  = require("camelcase")

const model_path:string = `./app/common/models`;
const template_path:string = `./scaffold_template`;

const crud_scaffold:{} = {
    config:[{folder: 'controllers', template:'controllers', outputfile:'controllers.ts'},
            {folder: 'daos', template:'daos', outputfile:'daos.ts'},
            {folder: 'middleware', template:'middleware', outputfile:'middleware.ts'},
            {folder: 'services', template:'services', outputfile:'services.ts'},
            {folder: 'types', template:'type', outputfile:'type.ts'},
        ]};
    
    
const argv = yargs.options({
    scaffold:{
        alias:'s',
        type:'string',
        demandOption: true,
        description:'Scaffold folder name'
    }
  })
  .check(data => {
      return true;
  }).argv;

const crud_path:string = `/app/${argv['s']}`;
const word:string = `${argv['s']}`

fs.mkdir(path.join(__dirname, `/app/${argv['s']}`), (err) => {
    if (err) {
        return console.error(err);
    }else{
        
        //ADD Model
        var template_str = fs.readFileSync(`${template_path}/model`,'utf8');
        var model_str = template_str.replace(/\{\^(S|s)caffold(\+)?\^\}+/g, replacer);
        fs.writeFileSync(`${model_path}/${pluralize(argv['s'])}.model.ts`,model_str);
        console.log(`Done building model`)

         //ADD routes.config
         var template_str = fs.readFileSync(`${template_path}/routes.config`,'utf8');
         var model_str = template_str.replace(/\{\^(S|s)caffold(\+)?\^\}+/g, replacer);
         fs.writeFileSync(`${path.join(__dirname, `/app/${argv['s']}`)}/${argv['s']}.routes.config.ts`,model_str);
         console.log(`Done building model`)

        crud_scaffold['config'].forEach(component => processComponents(component));
    }
});

function processComponents(component){

    //workdir 
    var workingdir = path.join(__dirname, `/app/${argv['s']}/${component['folder']}`)
    fs.mkdirSync(workingdir);
    //Read Template
    var template_str = fs.readFileSync(`${template_path}/${component['template']}`,'utf8');
    var component_str = template_str.replace(/\{\^(S|s)caffold(\+)?\^\}+/g, replacer);
    fs.writeFileSync(`${workingdir}/${argv['s']}.${component['outputfile']}`,component_str);
    console.log(`Done building ${component['folder']}`)
}

function replacer(match, p1, p2, p3, offset, string) {
    if(p1 && p1 == 'S' && p2)
     return camelcase(pluralize(word),{pascalCase: true})
    else if(p1 == 's' && p2)
     return pluralize(word);
    else if(p1 == 'S')
     return camelcase(word,{pascalCase: true})
    else if(p1 == 's')
     return word;
 }



//var newString = text.replace(/\{\^(S|s)caffold(\+)?\^\}+/g, replacer);
//console.log(newString);

