"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));
var _slash = _interopRequireDefault(require("slash"));

const parsedArg = require('yargs').argv;

const containerPath = {
  application: '/project/application' };


parsedArg.env = !Array.isArray(parsedArg.env) ? [parsedArg.env] : parsedArg.env;
let exportEnvironmentArg = parsedArg.env.reduce((accumulator, currentValue) => {
  if (process.env[currentValue])
    accumulator[currentValue] = process.env[currentValue];
  return accumulator;
}, {});












module.exports = function runInContainer(input) {

  console.log(process.argv);

  let application = {},scriptManager = {},invokedDirectly,configurationAbsoluteHostPath;
  ({
    configurationAbsoluteHostPath,
    application: {
      hostPath: application.hostPath,
      configuration: application.configuration,
      pathInContainer: application.pathInContainer = application.configuration.directory.application.containerAbsolutePath || containerPath.application },


    scriptManager: {
      hostRelativePath: scriptManager.hostRelativePath,
      commandArgument: scriptManager.commandArgument = process.argv },

    invokedDirectly = false } =
  input);

  scriptManager.commandArgument = invokedDirectly ?
  scriptManager.commandArgument.slice(2) :
  scriptManager.commandArgument.slice(3),

  scriptManager.relativePathFromProject = _path.default.relative(application.hostPath, scriptManager.hostRelativePath);
  scriptManager.relativePathFromProject = (0, _slash.default)(scriptManager.relativePathFromProject);

  scriptManager.absolutePathInContainer = (0, _slash.default)(_path.default.join(application.pathInContainer, scriptManager.relativePathFromProject));

  let configurationAbsoluteContainerPath;
  {
    let relativePathFromProject = _path.default.relative(application.hostPath, configurationAbsoluteHostPath);
    relativePathFromProject = (0, _slash.default)(relativePathFromProject);
    configurationAbsoluteContainerPath = (0, _slash.default)(_path.default.join(application.pathInContainer, relativePathFromProject));
  }


  let hostWorkingDirectory_PWD = process.env.PWD,
  workingDirectoryRelativeToApp_PWD = (0, _slash.default)(_path.default.relative(application.hostPath, hostWorkingDirectory_PWD)),
  workingDirectoryInContainer_PWD = (0, _slash.default)(_path.default.join(application.pathInContainer, workingDirectoryRelativeToApp_PWD));
  let hostWorkingDirectory_CWD = process.cwd(),
  workingDirectoryRelativeToApp_CWD = (0, _slash.default)(_path.default.relative(application.hostPath, hostWorkingDirectory_CWD)),
  workingDirectoryInContainer_CWD = (0, _slash.default)(_path.default.join(application.pathInContainer, workingDirectoryRelativeToApp_CWD));

  let childProcessArray = [];
  function killChildProcess({ childProcesses = childProcessArray } = {}) {
    childProcesses.forEach((childProcess, index) => {
      childProcess.kill('SIGINT');
      childProcess.kill('SIGTERM');
      childProcesses.splice(index, 1);
    });

  }


  console.log('creating containers !!!!!');


  process.on('SIGINT', () => {
    console.log("• [NODE HOST MACHINE] Caught interrupt signal - host machine level");
    killChildProcess();
  });

  console.groupEnd();
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9ydW5JbkNvbnRhaW5lci9zY3JpcHQuanMiXSwibmFtZXMiOlsicGFyc2VkQXJnIiwicmVxdWlyZSIsImFyZ3YiLCJjb250YWluZXJQYXRoIiwiYXBwbGljYXRpb24iLCJlbnYiLCJBcnJheSIsImlzQXJyYXkiLCJleHBvcnRFbnZpcm9ubWVudEFyZyIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiY3VycmVudFZhbHVlIiwicHJvY2VzcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJydW5JbkNvbnRhaW5lciIsImlucHV0IiwiY29uc29sZSIsImxvZyIsInNjcmlwdE1hbmFnZXIiLCJpbnZva2VkRGlyZWN0bHkiLCJjb25maWd1cmF0aW9uQWJzb2x1dGVIb3N0UGF0aCIsImhvc3RQYXRoIiwiY29uZmlndXJhdGlvbiIsInBhdGhJbkNvbnRhaW5lciIsImRpcmVjdG9yeSIsImNvbnRhaW5lckFic29sdXRlUGF0aCIsImhvc3RSZWxhdGl2ZVBhdGgiLCJjb21tYW5kQXJndW1lbnQiLCJzbGljZSIsInJlbGF0aXZlUGF0aEZyb21Qcm9qZWN0IiwicGF0aCIsInJlbGF0aXZlIiwiYWJzb2x1dGVQYXRoSW5Db250YWluZXIiLCJqb2luIiwiY29uZmlndXJhdGlvbkFic29sdXRlQ29udGFpbmVyUGF0aCIsImhvc3RXb3JraW5nRGlyZWN0b3J5X1BXRCIsIlBXRCIsIndvcmtpbmdEaXJlY3RvcnlSZWxhdGl2ZVRvQXBwX1BXRCIsIndvcmtpbmdEaXJlY3RvcnlJbkNvbnRhaW5lcl9QV0QiLCJob3N0V29ya2luZ0RpcmVjdG9yeV9DV0QiLCJjd2QiLCJ3b3JraW5nRGlyZWN0b3J5UmVsYXRpdmVUb0FwcF9DV0QiLCJ3b3JraW5nRGlyZWN0b3J5SW5Db250YWluZXJfQ1dEIiwiY2hpbGRQcm9jZXNzQXJyYXkiLCJraWxsQ2hpbGRQcm9jZXNzIiwiY2hpbGRQcm9jZXNzZXMiLCJmb3JFYWNoIiwiY2hpbGRQcm9jZXNzIiwiaW5kZXgiLCJraWxsIiwi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Q0MsR0FBUixDQUFZLDJCQUFaOzs7QUFHQU4sRUFBQUEsT0FBTyxDQUFDd0MsRUFBUixDQUFXLFFBQVgsRUFBcUIsTUFBTTtBQUN2Qm5DLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9FQUFaO0FBQ0EyQixJQUFBQSxnQkFBZ0I7QUFDbkIsR0FIRDs7QUFLQTVCLEVBQUFBLE9BQU8sQ0FBQ29DLFFBQVI7QUFDSCxDQWhFRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNwYXduLCBzcGF3blN5bmMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJ1xyXG5pbXBvcnQgb3BlcmF0aW5nU3lzdGVtIGZyb20gJ29zJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgc2xhc2ggZnJvbSAnc2xhc2gnIC8vIGNvbnZlcnQgYmFja3dhcmQgV2luZG93cyBzbGFzaCB0byBVbml4L1dpbmRvd3Mgc3VwcG9ydGVkIGZvcndhcmQgc2xhc2guXHJcbmltcG9ydCB7IHNldEludGVydmFsIH0gZnJvbSAndGltZXJzJztcclxuY29uc3QgcGFyc2VkQXJnID0gcmVxdWlyZSgneWFyZ3MnKS5hcmd2XHJcbmltcG9ydCB7IGNvbnZlcnRPYmplY3RUb0RvY2tlckVudkZsYWcgfSBmcm9tICcuL3V0aWxpdHkvY29udmVydE9iamVjdFRvRG9ja2VyRW52RmxhZy5qcydcclxuY29uc3QgY29udGFpbmVyUGF0aCA9IHsgLy8gZGVmaW5lZCBwYXRocyBvZiB2b2x1bWVzIGluc2lkZSBjb250YWluZXIuXHJcbiAgICBhcHBsaWNhdGlvbjogJy9wcm9qZWN0L2FwcGxpY2F0aW9uJ1xyXG59XHJcblxyXG5wYXJzZWRBcmcuZW52ID0gKCFBcnJheS5pc0FycmF5KHBhcnNlZEFyZy5lbnYpKSA/IFtwYXJzZWRBcmcuZW52XSA6IHBhcnNlZEFyZy5lbnYgLy8gdHJhbnNmb3JtIGAtLWVudmAgdmFsdWUgZmxhZ3MgdG8gYXJyYXkgZXZlbiB3aGVuIG9ubHkgb25lIHZhbHVlIHByZXNlbnRcclxubGV0IGV4cG9ydEVudmlyb25tZW50QXJnID0gcGFyc2VkQXJnLmVudi5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+IHtcclxuICAgIGlmKHByb2Nlc3MuZW52W2N1cnJlbnRWYWx1ZV0pIC8vIG9ubHkga2V5cyB0aGF0IHBhc3NlZCB0aHJvdWdoIGVudmlyb25tZW50IHZhcmlhYmxlc1xyXG4gICAgICAgIGFjY3VtdWxhdG9yW2N1cnJlbnRWYWx1ZV0gPSBwcm9jZXNzLmVudltjdXJyZW50VmFsdWVdIFxyXG4gICAgcmV0dXJuIGFjY3VtdWxhdG9yXHJcbn0sIHt9KSAvLyBnZXQgZW52aXJvbm1lbnQgdmFsdWVzIGFuZCBtYXRjaCB0aGVtIHRvIGtleXMgaW4gYW4gb2JqZWN0LlxyXG5cclxuXHJcbi8vIE5PVEU6IEEgd2F5IHRvIHJlbW92ZSBjb21tYW5kbGluZSBhcmd1bWVudCBhZnRlciB1c2FnZS5cclxuLy8gcHJvY2Vzcy5hcmd2ID0gcHJvY2Vzcy5hcmd2LmZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPT0gYGNvbmZpZ3VyYXRpb249JHtuYW1lZEFyZ3MuY29uZmlndXJhdGlvbn1gKSAvLyByZW1vdmUgY29uZmlndXJhdGlvbiBwYXJhbXRlclxyXG5cclxuXHJcbi8qKlxyXG4gKiBSdW5zIHNjcmlwdE1hbmFnZXIgaW4gY29udGFpbmVyIHdpdGggdGhlIHRhcmdldCBhcHAgYXMgdm9sdW1lLlxyXG4gKiBTcGlucyBhIGNvbnRhaW5lciBhbmQgcGFzc2VzIGVudHJ5cG9pbnQgbm9kZSBzY3JpcHQgdGhlIHJlbGV2YW50IHBhcmFtZXRlcnMgdXNlZCBhczogXHJcbiAqICAtIFByb2plY3Qgcm9vdCBwYXRoXHJcbiAqICAtIE1hbmFnZXIgcGF0aCBpbiBjb250YWluZXJcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcnVuSW5Db250YWluZXIoaW5wdXQpIHtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzLmFyZ3YpXHJcbiAgICAvLyB1c2UgbmVzdGVkIG9iamVjdHMgYXMgZnVuY3Rpb24gcGFyYW1ldGVycyAtIGFuIGltcGxlbWVudGF0aW9uIG9mIGRlc3RydWN0dXJpbmcgdGhhdCBwcmVzZXJ2ZXMgbmVzdGVkIHN0cnVjdHVyZSBvZiBwYXJhbWV0ZXJzIGFuZCBkZWZhdWx0IHZhbHVlcy4gLy8gSVNTVUU6IGRvZXNuJ3QgdGhyb3cgaWYgcGFyYW1ldGVycyBub3QgcGFzc2VkLlxyXG4gICAgbGV0IGFwcGxpY2F0aW9uID0ge30sIHNjcmlwdE1hbmFnZXIgPSB7fSwgaW52b2tlZERpcmVjdGx5LCBjb25maWd1cmF0aW9uQWJzb2x1dGVIb3N0UGF0aDtcclxuICAgICh7XHJcbiAgICAgICAgY29uZmlndXJhdGlvbkFic29sdXRlSG9zdFBhdGgsXHJcbiAgICAgICAgYXBwbGljYXRpb246IHtcclxuICAgICAgICAgICAgaG9zdFBhdGg6IGFwcGxpY2F0aW9uLmhvc3RQYXRoLCAvLyB0aGUgV2luZG93cyBob3N0IGFwcGxpY2F0aW9uIHBhdGhcclxuICAgICAgICAgICAgY29uZmlndXJhdGlvbjogYXBwbGljYXRpb24uY29uZmlndXJhdGlvbixcclxuICAgICAgICAgICAgcGF0aEluQ29udGFpbmVyOiBhcHBsaWNhdGlvbi5wYXRoSW5Db250YWluZXIgPSBhcHBsaWNhdGlvbi5jb25maWd1cmF0aW9uLmRpcmVjdG9yeS5hcHBsaWNhdGlvbi5jb250YWluZXJBYnNvbHV0ZVBhdGggfHwgY29udGFpbmVyUGF0aC5hcHBsaWNhdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gYXMgZGVmYXVsdCB0aGUgc2NyaXB0TWFuYWdlciBzaG91bGQgYmUgaW5zdGFsbGVkIChpLmUuIGV4cGVjdGVkIHRvIGJlIGEgZGVwZW5kZW5jeSkgYXMgYSBkZXBlbmRlbmN5IGluIGEgbmVzdGVkIGZvbGRlciB0byB0aGUgYXBwbGljYXRpb24uXHJcbiAgICAgICAgc2NyaXB0TWFuYWdlcjoge1xyXG4gICAgICAgICAgICBob3N0UmVsYXRpdmVQYXRoOiBzY3JpcHRNYW5hZ2VyLmhvc3RSZWxhdGl2ZVBhdGgsXHJcbiAgICAgICAgICAgIGNvbW1hbmRBcmd1bWVudDogc2NyaXB0TWFuYWdlci5jb21tYW5kQXJndW1lbnQgPSBwcm9jZXNzLmFyZ3YsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnZva2VkRGlyZWN0bHkgPSBmYWxzZVxyXG4gICAgfSA9IGlucHV0KSAvLyBkZXN0cnVjdHVyZSBuZXN0ZWQgb2JqZWN0cyB0byB0aGUgb2JqZWN0IHByb3BlcnRpZXMgdGhlbXNlbHZlcy5cclxuXHJcbiAgICBzY3JpcHRNYW5hZ2VyLmNvbW1hbmRBcmd1bWVudCA9IChpbnZva2VkRGlyZWN0bHkpID8gXHJcbiAgICAgICAgc2NyaXB0TWFuYWdlci5jb21tYW5kQXJndW1lbnQuc2xpY2UoMikgOiAvLyByZW1vdmUgZmlyc3QgMiBjb21tYW5kcyBvbmx5IC0gXCI8YmluUGF0aD4vbm9kZVwiLCBcIjxwYXRoPi9jb250YWluZXJNYW5hZ2VyLmpzXCIuXHJcbiAgICAgICAgc2NyaXB0TWFuYWdlci5jb21tYW5kQXJndW1lbnQuc2xpY2UoMyksIC8vIHJlbW92ZSBmaXJzdCAyIGNvbW1hbmRzIC0gXCI8YmluUGF0aD4vbm9kZVwiLCBcIjxwYXRoPi9lbnRyeXBvaW50LmpzXCIgYW5kIHRoZSB0aGlyZCBob3N0IG1hY2hpbmUgc2NyaXB0IG5hbWUgXCJjb250YWluZXJNYW5hZ2VyXCJcclxuXHJcbiAgICBzY3JpcHRNYW5hZ2VyLnJlbGF0aXZlUGF0aEZyb21Qcm9qZWN0ID0gcGF0aC5yZWxhdGl2ZShhcHBsaWNhdGlvbi5ob3N0UGF0aCwgc2NyaXB0TWFuYWdlci5ob3N0UmVsYXRpdmVQYXRoKVxyXG4gICAgc2NyaXB0TWFuYWdlci5yZWxhdGl2ZVBhdGhGcm9tUHJvamVjdCA9IHNsYXNoKHNjcmlwdE1hbmFnZXIucmVsYXRpdmVQYXRoRnJvbVByb2plY3QpIC8vIGNvbnZlcnQgdG8gVW5peCBwYXRoIGZyb20gV2luZG93cyBwYXRoIChjaGFuZ2UgXFwgc2xhc2ggdG8gLylcclxuICAgIC8vIE5PVEU6IGNyZWF0aW5nIGFuIGFic29sdXRlIHBhdGggZm9yIHNjcmlwdE1hbmFnZXIgYXNzdW1lcyB0aGF0IHRoZSBtb2R1bGUgZXhpc3QgdW5kZXIgdGhlIGFwcGxpY2F0aW9uIGRpcmVjdG9yeSAoL3Byb2plY3QvYXBwbGljYXRpb24pLlxyXG4gICAgc2NyaXB0TWFuYWdlci5hYnNvbHV0ZVBhdGhJbkNvbnRhaW5lciA9IHNsYXNoKHBhdGguam9pbihhcHBsaWNhdGlvbi5wYXRoSW5Db250YWluZXIsIHNjcmlwdE1hbmFnZXIucmVsYXRpdmVQYXRoRnJvbVByb2plY3QpKSAvLyBjcmVhdGUgYW4gYWJzb2x1dGUgcGF0aCBmb3Igc2NyaXB0TWFuYWdlciB3aGljaCBzaG91bGQgYmUgbmVzdGVkIHRvIGFwcGxpY2F0aW9uIHBhdGguXHJcblxyXG4gICAgbGV0IGNvbmZpZ3VyYXRpb25BYnNvbHV0ZUNvbnRhaW5lclBhdGg7XHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHJlbGF0aXZlUGF0aEZyb21Qcm9qZWN0ID0gcGF0aC5yZWxhdGl2ZShhcHBsaWNhdGlvbi5ob3N0UGF0aCwgY29uZmlndXJhdGlvbkFic29sdXRlSG9zdFBhdGgpXHJcbiAgICAgICAgcmVsYXRpdmVQYXRoRnJvbVByb2plY3QgPSBzbGFzaChyZWxhdGl2ZVBhdGhGcm9tUHJvamVjdCkgLy8gY29udmVydCB0byBVbml4IHBhdGggZnJvbSBXaW5kb3dzIHBhdGggKGNoYW5nZSBcXCBzbGFzaCB0byAvKVxyXG4gICAgICAgIGNvbmZpZ3VyYXRpb25BYnNvbHV0ZUNvbnRhaW5lclBhdGggPSBzbGFzaChwYXRoLmpvaW4oYXBwbGljYXRpb24ucGF0aEluQ29udGFpbmVyLCByZWxhdGl2ZVBhdGhGcm9tUHJvamVjdCkpIC8vIGNyZWF0ZSBhbiBhYnNvbHV0ZSBwYXRoIHdoaWNoIHNob3VsZCBiZSBuZXN0ZWQgdG8gYXBwbGljYXRpb24gcGF0aC5cclxuICAgIH1cclxuXHJcbiAgICAvLyByZXNvbHZlIHdvcmtpbmcgZGlyZWN0b3J5IHBhdGggZnJvbSBob3N0IHBhdGggdG8gY29udGFpbmVyIHBhdGguXHJcbiAgICBsZXQgaG9zdFdvcmtpbmdEaXJlY3RvcnlfUFdEID0gcHJvY2Vzcy5lbnYuUFdELFxyXG4gICAgICAgIHdvcmtpbmdEaXJlY3RvcnlSZWxhdGl2ZVRvQXBwX1BXRCA9IHNsYXNoKHBhdGgucmVsYXRpdmUoYXBwbGljYXRpb24uaG9zdFBhdGgsIGhvc3RXb3JraW5nRGlyZWN0b3J5X1BXRCkpLFxyXG4gICAgICAgIHdvcmtpbmdEaXJlY3RvcnlJbkNvbnRhaW5lcl9QV0QgPSBzbGFzaChwYXRoLmpvaW4oYXBwbGljYXRpb24ucGF0aEluQ29udGFpbmVyLCB3b3JraW5nRGlyZWN0b3J5UmVsYXRpdmVUb0FwcF9QV0QpKSAvLyBhYnNvbHV0ZSBjb250YWluZXIgcGF0aCBvZiB3b3JraW5nIGRpcmVjdG9yeSBcclxuICAgIGxldCBob3N0V29ya2luZ0RpcmVjdG9yeV9DV0QgPSBwcm9jZXNzLmN3ZCgpLFxyXG4gICAgICAgIHdvcmtpbmdEaXJlY3RvcnlSZWxhdGl2ZVRvQXBwX0NXRCA9IHNsYXNoKHBhdGgucmVsYXRpdmUoYXBwbGljYXRpb24uaG9zdFBhdGgsIGhvc3RXb3JraW5nRGlyZWN0b3J5X0NXRCkpLFxyXG4gICAgICAgIHdvcmtpbmdEaXJlY3RvcnlJbkNvbnRhaW5lcl9DV0QgPSBzbGFzaChwYXRoLmpvaW4oYXBwbGljYXRpb24ucGF0aEluQ29udGFpbmVyLCB3b3JraW5nRGlyZWN0b3J5UmVsYXRpdmVUb0FwcF9DV0QpKSAvLyBhYnNvbHV0ZSBjb250YWluZXIgcGF0aCBvZiB3b3JraW5nIGRpcmVjdG9yeSBcclxuXHJcbiAgICBsZXQgY2hpbGRQcm9jZXNzQXJyYXkgPSBbXTtcclxuICAgIGZ1bmN0aW9uIGtpbGxDaGlsZFByb2Nlc3Moe2NoaWxkUHJvY2Vzc2VzID0gY2hpbGRQcm9jZXNzQXJyYXl9ID0ge30pIHtcclxuICAgICAgICBjaGlsZFByb2Nlc3Nlcy5mb3JFYWNoKChjaGlsZFByb2Nlc3MsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNoaWxkUHJvY2Vzcy5raWxsKCdTSUdJTlQnKVxyXG4gICAgICAgICAgICBjaGlsZFByb2Nlc3Mua2lsbCgnU0lHVEVSTScpXHJcbiAgICAgICAgICAgIGNoaWxkUHJvY2Vzc2VzLnNwbGljZShpbmRleCwgMSkgLy8gcmVtb3ZlIGl0ZW0gZnJvbSBhcnJheVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gcHJvY2Vzcy5leGl0KClcclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdGUgY29udGFpbmVyXHJcbiAgICBjb25zb2xlLmxvZygnY3JlYXRpbmcgY29udGFpbmVycyAhISEhIScpXHJcbiAgICAvLyBUT0RPOiBBZGQgcmVxdWlyZSBzdGF0ZW1lbnRzIGZyb20gZGlyZWN0b3J5IGAuL2NvbnRhaW5lclNjcmlwdGBcclxuXHJcbiAgICBwcm9jZXNzLm9uKCdTSUdJTlQnLCAoKSA9PiB7IC8vIHdoZW4gZG9ja2VyIGlzIHVzaW5nIGAtaXRgIG9wdGlvbiB0aGlzIGV2ZW50IHdvbid0IGJlIGZpcmVkIGluIHRoaXMgcHJvY2VzcywgYXMgdGhlIFNJR0lOVCBzaWduYWwgaXMgcGFzc2VkIGRpcmVjdGx5IHRvIHRoZSBkb2NrZXIgY29udGFpbmVyLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi4oCiIFtOT0RFIEhPU1QgTUFDSElORV0gQ2F1Z2h0IGludGVycnVwdCBzaWduYWwgLSBob3N0IG1hY2hpbmUgbGV2ZWxcIilcclxuICAgICAgICBraWxsQ2hpbGRQcm9jZXNzKClcclxuICAgIH0pXHJcblxyXG4gICAgY29uc29sZS5ncm91cEVuZCgpXHJcbn1cclxuIl19