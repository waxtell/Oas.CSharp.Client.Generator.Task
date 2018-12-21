import tl = require('azure-pipelines-task-lib/task');
import pathLib = require('path');        

async function run() {
    try {
        let parms: string =
            'swagger2csclient '+
            '/input:'+tl.getInput('input',true)+
            ' /classname:'+tl.getInput('classname',true)+
            ' /output:'+tl.getInput('output',true);

        let namespace: string = tl.getInput('namespace',false);
        if(namespace != null)
        {
            parms += ' /namespace:'+namespace;
        }

        let additionalParams: string = tl.getInput('additionalparams',false);
        if(additionalParams != null)
        {
            parms += " "+additionalParams;
        }

        let exe: string = pathLib.join(__dirname, 'node_modules','.bin', 'nswag.cmd');

        tl.execSync(exe, parms )        
    }
    catch (err) 
    {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();