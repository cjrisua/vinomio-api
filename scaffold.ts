import * as yargs from 'yargs';
import * as fs from 'fs';
import * as path from 'path'

const argv = yargs.options({
   /* env: {
        alias: 'e',
        choices: ['dev', 'prod'] as const,
        demandOption: true,
        description: 'app environment'
    },
    port: {
        alias: 'p',
        type: 'number',
        default: 80,
        description: 'port'
    },*/
    scaffold:{
        alias:'s',
        type:'string',
        demandOption: true,
        description:'Scaffold folder name'
    }
  })
  .check(data => {
      return true;
  })
    .argv;


const folders = ['controllers','daos','middleware','services','types'];


fs.mkdir(path.join(__dirname, `/app/${argv['s']}`), (err) => {
    if (err) {
        return console.error(err);
    }else{
        folders.forEach(folder =>{
            fs.mkdir(path.join(__dirname, `/app/${argv['s']}/${folder}`), (err) => {
                if(!err){
                    fs.open(path.join(__dirname, `/app/${argv['s']}/${folder}/${argv['s']}.${folder}.ts`), 'w', function (err, file) {
                        if (err) throw err;
                        console.log(`/app/${argv['s']}/${folder}/${argv['s']}.${folder}.ts -Saved`);
                      });
                }
            });
        });
        fs.open(path.join(__dirname, `/app/${argv['s']}/${argv['s']}.routers.config.ts`), 'w', function (err, file) {
            if (err) throw err;
            console.log(`/app/${argv['s']}/${argv['s']}.routers.config.ts - Saved!`);
          });
    }
});
