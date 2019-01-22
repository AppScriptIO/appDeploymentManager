import { spawn, spawnSync } from 'child_process'
import operatingSystem from 'os'
import path from 'path'
import slash from 'slash' // convert backward Windows slash to Unix/Windows supported forward slash.
import { setInterval } from 'timers';
const parsedArg = require('yargs').argv
import { convertObjectToDockerEnvFlag } from './utility/convertObjectToDockerEnvFlag.js'
const containerPath = { // defined paths of volumes inside container.
    application: '/project/application'
}

parsedArg.env = (!Array.isArray(parsedArg.env)) ? [parsedArg.env] : parsedArg.env // transform `--env` value flags to array even when only one value present
let exportEnvironmentArg = parsedArg.env.reduce((accumulator, currentValue) => {
    if(process.env[currentValue]) // only keys that passed through environment variables
        accumulator[currentValue] = process.env[currentValue] 
    return accumulator
}, {}) // get environment values and match them to keys in an object.


// NOTE: A way to remove commandline argument after usage.
// process.argv = process.argv.filter(value => value !== `configuration=${namedArgs.configuration}`) // remove configuration paramter


/**
 * Spins a container and passes entrypoint node script the relevant parameters used as: 
 *  - Application root path
 *  - Manager path in container
 */
export function runManagerAppInContainerWithClientApp(input) {

    console.log(process.argv)
    // use nested objects as function parameters - an implementation of destructuring that preserves nested structure of parameters and default values. // ISSUE: doesn't throw if parameters not passed.
    let application = {}, managerApp = {}, invokedDirectly, configurationAbsoluteHostPath;
    ({
        configurationAbsoluteHostPath,
        application: {
            hostPath: application.hostPath, // the Windows host application path
            configuration: application.configuration,
            pathInContainer: application.pathInContainer = application.configuration.directory.application.containerAbsolutePath || containerPath.application
        },
        // as default the managerApp should be installed (i.e. expected to be a dependency) as a dependency in a nested folder to the application.
        managerApp: {
            hostRelativePath: managerApp.hostRelativePath,
            commandArgument: managerApp.commandArgument = process.argv,
        },
        invokedDirectly = false
    } = input) // destructure nested objects to the object properties themselves.

    managerApp.commandArgument = (invokedDirectly) ? 
        managerApp.commandArgument.slice(2) : // remove first 2 commands only - "<binPath>/node", "<path>/containerManager.js".
        managerApp.commandArgument.slice(3), // remove first 2 commands - "<binPath>/node", "<path>/entrypoint.js" and the third host machine script name "containerManager"

    managerApp.relativePathFromApplication = path.relative(application.hostPath, managerApp.hostRelativePath)
    managerApp.relativePathFromApplication = slash(managerApp.relativePathFromApplication) // convert to Unix path from Windows path (change \ slash to /)
    // NOTE: creating an absolute path for managerApp assumes that the module exist under the application directory (/project/application).
    managerApp.absolutePathInContainer = slash(path.join(application.pathInContainer, managerApp.relativePathFromApplication)) // create an absolute path for managerApp which should be nested to application path.

    let configurationAbsoluteContainerPath;
    {
        let relativePathFromApplication = path.relative(application.hostPath, configurationAbsoluteHostPath)
        relativePathFromApplication = slash(relativePathFromApplication) // convert to Unix path from Windows path (change \ slash to /)
        configurationAbsoluteContainerPath = slash(path.join(application.pathInContainer, relativePathFromApplication)) // create an absolute path which should be nested to application path.
    }

    // resolve working directory path from host path to container path.
    let hostWorkingDirectory_PWD = process.env.PWD,
        workingDirectoryRelativeToApp_PWD = slash(path.relative(application.hostPath, hostWorkingDirectory_PWD)),
        workingDirectoryInContainer_PWD = slash(path.join(application.pathInContainer, workingDirectoryRelativeToApp_PWD)) // absolute container path of working directory 
    let hostWorkingDirectory_CWD = process.cwd(),
        workingDirectoryRelativeToApp_CWD = slash(path.relative(application.hostPath, hostWorkingDirectory_CWD)),
        workingDirectoryInContainer_CWD = slash(path.join(application.pathInContainer, workingDirectoryRelativeToApp_CWD)) // absolute container path of working directory 

    let childProcessArray = [];
    function killChildProcess({childProcesses = childProcessArray} = {}) {
        childProcesses.forEach((childProcess, index) => {
            childProcess.kill('SIGINT')
            childProcess.kill('SIGTERM')
            childProcesses.splice(index, 1) // remove item from array
        })
        // process.exit()
    }

    // create container
    console.log('creating containers !!!!!')
    
    process.on('SIGINT', () => { // when docker is using `-it` option this event won't be fired in this process, as the SIGINT signal is passed directly to the docker container.
        console.log("• [NODE HOST MACHINE] Caught interrupt signal - host machine level")
        killChildProcess()
    })

    console.groupEnd()
}
