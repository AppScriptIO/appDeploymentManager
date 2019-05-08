"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.scriptManager = scriptManager;

var _scriptExecution = require("@dependency/scriptExecution");
var _ProjectClass = require("./Project.class.js");

process.on('SIGINT', () => {
  console.log('Caught interrupt signal - scriptManager container level');
  process.exit(0);
});



async function scriptManager({
  targetProjectConfigPath,
  scriptKeyToInvoke,
  jsCodeToEvaluate })
{
  console.assert(scriptKeyToInvoke, '\x1b[41m%s\x1b[0m', '❌ `scriptKeyToInvoke` parameter must be set.');

  let project = new _ProjectClass.Project({ configurationPath: targetProjectConfigPath });


  let scriptConfigArray = project.configuration['script'];
  console.assert(scriptConfigArray, '\x1b[41m%s\x1b[0m', `❌ config['script'] option in targetProject configuration must exist.`);

  let scriptConfiguration = await (0, _scriptExecution.lookup)({
    script: scriptConfigArray,
    projectRootPath: project.configuration.rootPath,
    scriptKeyToInvoke }).
  catch(error => {
    throw error;
  });

  await (0, _scriptExecution.execute)({

    scriptConfig: scriptConfiguration,
    jsCodeToEvaluate,
    parameter: {
      api: {
        project: project } } }).


  catch(error => {
    console.error(error);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9zY3JpcHRNYW5hZ2VyL3NjcmlwdC5qcyJdLCJuYW1lcyI6WyJwcm9jZXNzIiwib24iLCJjb25zb2xlIiwibG9nIiwiZXhpdCIsInNjcmlwdE1hbmFnZXIiLCJ0YXJnZXRQcm9qZWN0Q29uZmlnUGF0aCIsInNjcmlwdEtleVRvSW52b2tlIiwianNDb2RlVG9FdmFsdWF0ZSIsImFzc2VydCIsInByb2plY3QiLCJQcm9qZWN0IiwiY29uZmlndXJhdGlvblBhdGgiLCJzY3JpcHRDb25maWdBcnJheSIsImNvbmZpZ3VyYXRpb24iLCJzY3JpcHRDb25maWd1cmF0aW9uIiwic2NyaXB0IiwicHJvamVjdFJvb3RQYXRoIiwicm9vdFBhdGgiLCJjYXRjaCIsImVycm9yIiwic2NyaXB0Q29uZmlnIiwicGFyYW1ldGVyIiwiYXBpIl0sIm1hcHBpbmdzIjoiOztBQUVBO0FBQ0E7O0FBRUFBLE9BQU8sQ0FBQ0MsRUFBUixDQUFXLFFBQVgsRUFBcUIsTUFBTTtBQUN6QkMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkseURBQVo7QUFDQUgsRUFBQUEsT0FBTyxDQUFDSSxJQUFSLENBQWEsQ0FBYjtBQUNELENBSEQ7Ozs7QUFPTyxlQUFlQyxhQUFmLENBQTZCO0FBQ2xDQyxFQUFBQSx1QkFEa0M7QUFFbENDLEVBQUFBLGlCQUZrQztBQUdsQ0MsRUFBQUEsZ0JBSGtDLEVBQTdCO0FBSUo7QUFDRE4sRUFBQUEsT0FBTyxDQUFDTyxNQUFSLENBQWVGLGlCQUFmLEVBQWtDLG1CQUFsQyxFQUF1RCw4Q0FBdkQ7O0FBRUEsTUFBSUcsT0FBTyxHQUFHLElBQUlDLHFCQUFKLENBQVksRUFBRUMsaUJBQWlCLEVBQUVOLHVCQUFyQixFQUFaLENBQWQ7OztBQUdBLE1BQUlPLGlCQUFpQixHQUFHSCxPQUFPLENBQUNJLGFBQVIsQ0FBc0IsUUFBdEIsQ0FBeEI7QUFDQVosRUFBQUEsT0FBTyxDQUFDTyxNQUFSLENBQWVJLGlCQUFmLEVBQWtDLG1CQUFsQyxFQUF3RCxzRUFBeEQ7O0FBRUEsTUFBSUUsbUJBQW1CLEdBQUcsTUFBTSw2QkFBTztBQUNyQ0MsSUFBQUEsTUFBTSxFQUFFSCxpQkFENkI7QUFFckNJLElBQUFBLGVBQWUsRUFBRVAsT0FBTyxDQUFDSSxhQUFSLENBQXNCSSxRQUZGO0FBR3JDWCxJQUFBQSxpQkFIcUMsRUFBUDtBQUk3QlksRUFBQUEsS0FKNkIsQ0FJdkJDLEtBQUssSUFBSTtBQUNoQixVQUFNQSxLQUFOO0FBQ0QsR0FOK0IsQ0FBaEM7O0FBUUEsUUFBTSw4QkFBUTs7QUFFWkMsSUFBQUEsWUFBWSxFQUFFTixtQkFGRjtBQUdaUCxJQUFBQSxnQkFIWTtBQUlaYyxJQUFBQSxTQUFTLEVBQUU7QUFDVEMsTUFBQUEsR0FBRyxFQUFFO0FBQ0hiLFFBQUFBLE9BQU8sRUFBRUEsT0FETixFQURJLEVBSkMsRUFBUjs7O0FBU0hTLEVBQUFBLEtBVEcsQ0FTR0MsS0FBSyxJQUFJO0FBQ2hCbEIsSUFBQUEsT0FBTyxDQUFDa0IsS0FBUixDQUFjQSxLQUFkO0FBQ0QsR0FYSyxDQUFOO0FBWUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmlsZXN5c3RlbSBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBleGVjdXRlLCBsb29rdXAgfSBmcm9tICdAZGVwZW5kZW5jeS9zY3JpcHRFeGVjdXRpb24nXG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9Qcm9qZWN0LmNsYXNzLmpzJ1xuXG5wcm9jZXNzLm9uKCdTSUdJTlQnLCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdDYXVnaHQgaW50ZXJydXB0IHNpZ25hbCAtIHNjcmlwdE1hbmFnZXIgY29udGFpbmVyIGxldmVsJylcbiAgcHJvY2Vzcy5leGl0KDApXG59KVxuXG4vLyBUT0RPOiBBZGQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgcHJvamVjdCB0byBiZSBtYW5hZ2VkIGFuZCBtdWx0aXBsZSBzY3JpcHRzIHRvIGJlIHJ1biBhbmQgdHJhY2tlZC5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNjcmlwdE1hbmFnZXIoe1xuICB0YXJnZXRQcm9qZWN0Q29uZmlnUGF0aCwgLy8gY29uZmlndXJhdGlvbiBvYmplY3Qgb2YgdGhlIHRhcmdldCBwcm9qZWN0LlxuICBzY3JpcHRLZXlUb0ludm9rZSwgLy8gdGhlIGtleSBuYW1lIGZvciB0aGUgc2NyaXB0IHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIChjb21wYXJlZCB3aXRoIHRoZSBrZXkgaW4gdGhlIGNvbmZpZ3VyYXRpb24gZmlsZS4pXG4gIGpzQ29kZVRvRXZhbHVhdGUsIC8vIGpzIHRvIGV2YWx1YXRlIG9uIHRoZSByZXF1aXJlZCBzY3JpcHQgPT4gJ3JlcXVpcmUoPHNjcmlwdFBhdGg+KTxldmFsdWF0ZSBqcz4nXG59KSB7XG4gIGNvbnNvbGUuYXNzZXJ0KHNjcmlwdEtleVRvSW52b2tlLCAnXFx4MWJbNDFtJXNcXHgxYlswbScsICfinYwgYHNjcmlwdEtleVRvSW52b2tlYCBwYXJhbWV0ZXIgbXVzdCBiZSBzZXQuJylcblxuICBsZXQgcHJvamVjdCA9IG5ldyBQcm9qZWN0KHsgY29uZmlndXJhdGlvblBhdGg6IHRhcmdldFByb2plY3RDb25maWdQYXRoIH0pXG5cbiAgLy8gbG9hZCBlbnRyeXBvaW50IGNvbmZpZ3VyYXRpb24gYW5kIGNoZWNrIGZvciAnZW50cnlwb2ludCcga2V5IChlbnRyeXBvaW50IGtleSBob2xkcyBvYmplY3Qgd2l0aCBlbnRyeXBvaW50IGluZm9ybWF0aW9uIGxpa2UgZmlsZSBwYXRoIG1hcHBpbmcpXG4gIGxldCBzY3JpcHRDb25maWdBcnJheSA9IHByb2plY3QuY29uZmlndXJhdGlvblsnc2NyaXB0J11cbiAgY29uc29sZS5hc3NlcnQoc2NyaXB0Q29uZmlnQXJyYXksICdcXHgxYls0MW0lc1xceDFiWzBtJywgYOKdjCBjb25maWdbJ3NjcmlwdCddIG9wdGlvbiBpbiB0YXJnZXRQcm9qZWN0IGNvbmZpZ3VyYXRpb24gbXVzdCBleGlzdC5gKVxuXG4gIGxldCBzY3JpcHRDb25maWd1cmF0aW9uID0gYXdhaXQgbG9va3VwKHtcbiAgICBzY3JpcHQ6IHNjcmlwdENvbmZpZ0FycmF5LFxuICAgIHByb2plY3RSb290UGF0aDogcHJvamVjdC5jb25maWd1cmF0aW9uLnJvb3RQYXRoLFxuICAgIHNjcmlwdEtleVRvSW52b2tlLFxuICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgdGhyb3cgZXJyb3JcbiAgfSlcblxuICBhd2FpdCBleGVjdXRlKHtcbiAgICAvLyBBc3N1bWluZyBzY3JpcHQgaXMgc3luY2hyb25vdXNcbiAgICBzY3JpcHRDb25maWc6IHNjcmlwdENvbmZpZ3VyYXRpb24sXG4gICAganNDb2RlVG9FdmFsdWF0ZSxcbiAgICBwYXJhbWV0ZXI6IHtcbiAgICAgIGFwaToge1xuICAgICAgICBwcm9qZWN0OiBwcm9qZWN0LFxuICAgICAgfSwgLy8gcGFzcyBwcm9qZWN0IGFwaVxuICAgIH0sXG4gIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICB9KVxufVxuIl19