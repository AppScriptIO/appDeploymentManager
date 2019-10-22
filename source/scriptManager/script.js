"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.scriptManager = scriptManager;

var _scriptExecution = require("@dependency/scriptExecution");
var _ProjectClass = require("./Project.class.js");
var _javascriptTranspilation = require("@dependency/javascriptTranspilation");

process.on('SIGINT', () => {
  console.log('Caught interrupt signal - scriptManager container level');
  process.exit(0);
});

async function scriptManager({
  targetProjectConfigPath,
  scriptKeyToInvoke,
  jsCodeToEvaluate,
  shouldCompileScript = false })
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

  if (shouldCompileScript) {
    let compiler = new _javascriptTranspilation.Compiler({
      babelTransformConfig: project.configuration.configuration.transpilation.babelConfig });

    compiler.requireHook({ restrictToTargetProject: false });




  }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9zY3JpcHRNYW5hZ2VyL3NjcmlwdC5qcyJdLCJuYW1lcyI6WyJwcm9jZXNzIiwib24iLCJjb25zb2xlIiwibG9nIiwiZXhpdCIsInNjcmlwdE1hbmFnZXIiLCJ0YXJnZXRQcm9qZWN0Q29uZmlnUGF0aCIsInNjcmlwdEtleVRvSW52b2tlIiwianNDb2RlVG9FdmFsdWF0ZSIsInNob3VsZENvbXBpbGVTY3JpcHQiLCJhc3NlcnQiLCJwcm9qZWN0IiwiUHJvamVjdCIsImNvbmZpZ3VyYXRpb25QYXRoIiwic2NyaXB0Q29uZmlnQXJyYXkiLCJjb25maWd1cmF0aW9uIiwic2NyaXB0Q29uZmlndXJhdGlvbiIsInNjcmlwdCIsInByb2plY3RSb290UGF0aCIsInJvb3RQYXRoIiwiY2F0Y2giLCJlcnJvciIsImNvbXBpbGVyIiwiQ29tcGlsZXIiLCJiYWJlbFRyYW5zZm9ybUNvbmZpZyIsInRyYW5zcGlsYXRpb24iLCJiYWJlbENvbmZpZyIsInJlcXVpcmVIb29rIiwicmVzdHJpY3RUb1RhcmdldFByb2plY3QiLCJzY3JpcHRDb25maWciLCJwYXJhbWV0ZXIiLCJhcGkiXSwibWFwcGluZ3MiOiI7O0FBRUE7QUFDQTtBQUNBOztBQUVBQSxPQUFPLENBQUNDLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLE1BQU07QUFDekJDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHlEQUFaO0FBQ0FILEVBQUFBLE9BQU8sQ0FBQ0ksSUFBUixDQUFhLENBQWI7QUFDRCxDQUhEOztBQUtPLGVBQWVDLGFBQWYsQ0FBNkI7QUFDbENDLEVBQUFBLHVCQURrQztBQUVsQ0MsRUFBQUEsaUJBRmtDO0FBR2xDQyxFQUFBQSxnQkFIa0M7QUFJbENDLEVBQUFBLG1CQUFtQixHQUFHLEtBSlksRUFBN0I7QUFLSjtBQUNEUCxFQUFBQSxPQUFPLENBQUNRLE1BQVIsQ0FBZUgsaUJBQWYsRUFBa0MsbUJBQWxDLEVBQXVELDhDQUF2RDs7QUFFQSxNQUFJSSxPQUFPLEdBQUcsSUFBSUMscUJBQUosQ0FBWSxFQUFFQyxpQkFBaUIsRUFBRVAsdUJBQXJCLEVBQVosQ0FBZDs7O0FBR0EsTUFBSVEsaUJBQWlCLEdBQUdILE9BQU8sQ0FBQ0ksYUFBUixDQUFzQixRQUF0QixDQUF4QjtBQUNBYixFQUFBQSxPQUFPLENBQUNRLE1BQVIsQ0FBZUksaUJBQWYsRUFBa0MsbUJBQWxDLEVBQXdELHNFQUF4RDs7QUFFQSxNQUFJRSxtQkFBbUIsR0FBRyxNQUFNLDZCQUFPO0FBQ3JDQyxJQUFBQSxNQUFNLEVBQUVILGlCQUQ2QjtBQUVyQ0ksSUFBQUEsZUFBZSxFQUFFUCxPQUFPLENBQUNJLGFBQVIsQ0FBc0JJLFFBRkY7QUFHckNaLElBQUFBLGlCQUhxQyxFQUFQO0FBSTdCYSxFQUFBQSxLQUo2QixDQUl2QkMsS0FBSyxJQUFJO0FBQ2hCLFVBQU1BLEtBQU47QUFDRCxHQU4rQixDQUFoQzs7QUFRQSxNQUFJWixtQkFBSixFQUF5QjtBQUN2QixRQUFJYSxRQUFRLEdBQUcsSUFBSUMsaUNBQUosQ0FBYTtBQUMxQkMsTUFBQUEsb0JBQW9CLEVBQUViLE9BQU8sQ0FBQ0ksYUFBUixDQUFzQkEsYUFBdEIsQ0FBb0NVLGFBQXBDLENBQWtEQyxXQUQ5QyxFQUFiLENBQWY7O0FBR0FKLElBQUFBLFFBQVEsQ0FBQ0ssV0FBVCxDQUFxQixFQUFFQyx1QkFBdUIsRUFBRSxLQUEzQixFQUFyQjs7Ozs7QUFLRDs7QUFFRCxRQUFNLDhCQUFROztBQUVaQyxJQUFBQSxZQUFZLEVBQUViLG1CQUZGO0FBR1pSLElBQUFBLGdCQUhZO0FBSVpzQixJQUFBQSxTQUFTLEVBQUU7QUFDVEMsTUFBQUEsR0FBRyxFQUFFO0FBQ0hwQixRQUFBQSxPQUFPLEVBQUVBLE9BRE4sRUFESSxFQUpDLEVBQVI7OztBQVNIUyxFQUFBQSxLQVRHLENBU0dDLEtBQUssSUFBSTtBQUNoQm5CLElBQUFBLE9BQU8sQ0FBQ21CLEtBQVIsQ0FBY0EsS0FBZDtBQUNELEdBWEssQ0FBTjtBQVlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpbGVzeXN0ZW0gZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZXhlY3V0ZSwgbG9va3VwIH0gZnJvbSAnQGRlcGVuZGVuY3kvc2NyaXB0RXhlY3V0aW9uJ1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vUHJvamVjdC5jbGFzcy5qcydcbmltcG9ydCB7IENvbXBpbGVyIH0gZnJvbSAnQGRlcGVuZGVuY3kvamF2YXNjcmlwdFRyYW5zcGlsYXRpb24nXG5cbnByb2Nlc3Mub24oJ1NJR0lOVCcsICgpID0+IHtcbiAgY29uc29sZS5sb2coJ0NhdWdodCBpbnRlcnJ1cHQgc2lnbmFsIC0gc2NyaXB0TWFuYWdlciBjb250YWluZXIgbGV2ZWwnKVxuICBwcm9jZXNzLmV4aXQoMClcbn0pXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzY3JpcHRNYW5hZ2VyKHtcbiAgdGFyZ2V0UHJvamVjdENvbmZpZ1BhdGgsIC8vIGNvbmZpZ3VyYXRpb24gb2JqZWN0IG9mIHRoZSB0YXJnZXQgcHJvamVjdC5cbiAgc2NyaXB0S2V5VG9JbnZva2UsIC8vIHRoZSBrZXkgbmFtZSBmb3IgdGhlIHNjcmlwdCB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCAoY29tcGFyZWQgd2l0aCB0aGUga2V5IGluIHRoZSBjb25maWd1cmF0aW9uIGZpbGUuKVxuICBqc0NvZGVUb0V2YWx1YXRlLCAvLyBqcyB0byBldmFsdWF0ZSBvbiB0aGUgcmVxdWlyZWQgc2NyaXB0ID0+ICdyZXF1aXJlKDxzY3JpcHRQYXRoPik8ZXZhbHVhdGUganM+J1xuICBzaG91bGRDb21waWxlU2NyaXB0ID0gZmFsc2UsIC8vIGNvbXBpbGUgdXNpbmcgdGhlIHRhcmdldCBwcm9qZWN0cydzIGNvbmZpZ3VyYXRpb24gZmlsZXMuXG59KSB7XG4gIGNvbnNvbGUuYXNzZXJ0KHNjcmlwdEtleVRvSW52b2tlLCAnXFx4MWJbNDFtJXNcXHgxYlswbScsICfinYwgYHNjcmlwdEtleVRvSW52b2tlYCBwYXJhbWV0ZXIgbXVzdCBiZSBzZXQuJylcblxuICBsZXQgcHJvamVjdCA9IG5ldyBQcm9qZWN0KHsgY29uZmlndXJhdGlvblBhdGg6IHRhcmdldFByb2plY3RDb25maWdQYXRoIH0pXG5cbiAgLy8gbG9hZCBlbnRyeXBvaW50IGNvbmZpZ3VyYXRpb24gYW5kIGNoZWNrIGZvciAnZW50cnlwb2ludCcga2V5IChlbnRyeXBvaW50IGtleSBob2xkcyBvYmplY3Qgd2l0aCBlbnRyeXBvaW50IGluZm9ybWF0aW9uIGxpa2UgZmlsZSBwYXRoIG1hcHBpbmcpXG4gIGxldCBzY3JpcHRDb25maWdBcnJheSA9IHByb2plY3QuY29uZmlndXJhdGlvblsnc2NyaXB0J11cbiAgY29uc29sZS5hc3NlcnQoc2NyaXB0Q29uZmlnQXJyYXksICdcXHgxYls0MW0lc1xceDFiWzBtJywgYOKdjCBjb25maWdbJ3NjcmlwdCddIG9wdGlvbiBpbiB0YXJnZXRQcm9qZWN0IGNvbmZpZ3VyYXRpb24gbXVzdCBleGlzdC5gKVxuXG4gIGxldCBzY3JpcHRDb25maWd1cmF0aW9uID0gYXdhaXQgbG9va3VwKHtcbiAgICBzY3JpcHQ6IHNjcmlwdENvbmZpZ0FycmF5LFxuICAgIHByb2plY3RSb290UGF0aDogcHJvamVjdC5jb25maWd1cmF0aW9uLnJvb3RQYXRoLFxuICAgIHNjcmlwdEtleVRvSW52b2tlLFxuICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgdGhyb3cgZXJyb3JcbiAgfSlcblxuICBpZiAoc2hvdWxkQ29tcGlsZVNjcmlwdCkge1xuICAgIGxldCBjb21waWxlciA9IG5ldyBDb21waWxlcih7XG4gICAgICBiYWJlbFRyYW5zZm9ybUNvbmZpZzogcHJvamVjdC5jb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24udHJhbnNwaWxhdGlvbi5iYWJlbENvbmZpZyAvKiogU2VhcmNoIGZvciBjb25maWd1cmF0aW9uIGZpbGVzIGZyb20gdGFyZ2V0IHByb2plY3QgKi8sXG4gICAgfSlcbiAgICBjb21waWxlci5yZXF1aXJlSG9vayh7IHJlc3RyaWN0VG9UYXJnZXRQcm9qZWN0OiBmYWxzZSAvKiBUcmFuc3BpbGUgZmlsZXMgb2YgdGhlIHRhcmdldCBwcm9qZWN0ICovIH0pXG4gICAgLy8gcHJvY2Vzcy5vbignZXhpdCcsICgpID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKGNvbXBpbGVyLmxvYWRlZEZpbGVzLm1hcCh2YWx1ZSA9PiB2YWx1ZS5maWxlbmFtZSkpXG4gICAgLy8gICBjb25zb2xlLmxvZyhjb21waWxlci5iYWJlbFJlZ2lzdGVyQ29uZmlnLmlnbm9yZSlcbiAgICAvLyB9KVxuICB9XG5cbiAgYXdhaXQgZXhlY3V0ZSh7XG4gICAgLy8gQXNzdW1pbmcgc2NyaXB0IGlzIHN5bmNocm9ub3VzXG4gICAgc2NyaXB0Q29uZmlnOiBzY3JpcHRDb25maWd1cmF0aW9uLFxuICAgIGpzQ29kZVRvRXZhbHVhdGUsXG4gICAgcGFyYW1ldGVyOiB7XG4gICAgICBhcGk6IHtcbiAgICAgICAgcHJvamVjdDogcHJvamVjdCwgLy8gcGFzc2VkIHRvIHRoZSBleGVjdXRlZCB0YXJnZXQgc2NyaXB0LlxuICAgICAgfSwgLy8gcGFzcyBwcm9qZWN0IGFwaVxuICAgIH0sXG4gIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICB9KVxufVxuIl19