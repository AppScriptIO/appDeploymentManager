"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.scriptManager = scriptManager;



var _scriptExecution = require("@dependency/scriptExecution");
var _ProjectClass = require("./Project.class.js");

process.on('SIGINT', () => {
  console.log("Caught interrupt signal - scriptManager container level");
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
  catch(error => {throw error;});

  await (0, _scriptExecution.execute)({
    scriptConfig: scriptConfiguration,
    jsCodeToEvaluate,
    parameter: {
      api: {
        project: project } } }).


  catch(error => {console.error(error);});
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9zY3JpcHRNYW5hZ2VyL3NjcmlwdC5qcyJdLCJuYW1lcyI6WyJwcm9jZXNzIiwib24iLCJjb25zb2xlIiwibG9nIiwiZXhpdCIsInNjcmlwdE1hbmFnZXIiLCJ0YXJnZXRQcm9qZWN0Q29uZmlnUGF0aCIsInNjcmlwdEtleVRvSW52b2tlIiwianNDb2RlVG9FdmFsdWF0ZSIsImFzc2VydCIsInByb2plY3QiLCJQcm9qZWN0IiwiY29uZmlndXJhdGlvblBhdGgiLCJzY3JpcHRDb25maWdBcnJheSIsImNvbmZpZ3VyYXRpb24iLCJzY3JpcHRDb25maWd1cmF0aW9uIiwic2NyaXB0IiwicHJvamVjdFJvb3RQYXRoIiwicm9vdFBhdGgiLCJjYXRjaCIsImVycm9yIiwic2NyaXB0Q29uZmlnIiwicGFyYW1ldGVyIiwiYXBpIl0sIm1hcHBpbmdzIjoiOzs7O0FBSUE7QUFDQTs7QUFFQUEsT0FBTyxDQUFDQyxFQUFSLENBQVcsUUFBWCxFQUFxQixNQUFNO0FBQ3ZCQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx5REFBWjtBQUNBSCxFQUFBQSxPQUFPLENBQUNJLElBQVIsQ0FBYSxDQUFiO0FBQ0gsQ0FIRDs7OztBQU9PLGVBQWVDLGFBQWYsQ0FBNkI7QUFDaENDLEVBQUFBLHVCQURnQztBQUVoQ0MsRUFBQUEsaUJBRmdDO0FBR2hDQyxFQUFBQSxnQkFIZ0MsRUFBN0I7QUFJSjtBQUNDTixFQUFBQSxPQUFPLENBQUNPLE1BQVIsQ0FBZUYsaUJBQWYsRUFBa0MsbUJBQWxDLEVBQXVELDhDQUF2RDs7QUFFQSxNQUFJRyxPQUFPLEdBQUcsSUFBSUMscUJBQUosQ0FBWSxFQUFFQyxpQkFBaUIsRUFBRU4sdUJBQXJCLEVBQVosQ0FBZDs7O0FBR0EsTUFBSU8saUJBQWlCLEdBQUdILE9BQU8sQ0FBQ0ksYUFBUixDQUFzQixRQUF0QixDQUF4QjtBQUNBWixFQUFBQSxPQUFPLENBQUNPLE1BQVIsQ0FBZUksaUJBQWYsRUFBa0MsbUJBQWxDLEVBQXdELHNFQUF4RDs7QUFFQSxNQUFJRSxtQkFBbUIsR0FBRyxNQUFNLDZCQUFPO0FBQ25DQyxJQUFBQSxNQUFNLEVBQUVILGlCQUQyQjtBQUVuQ0ksSUFBQUEsZUFBZSxFQUFFUCxPQUFPLENBQUNJLGFBQVIsQ0FBc0JJLFFBRko7QUFHbkNYLElBQUFBLGlCQUhtQyxFQUFQO0FBSTdCWSxFQUFBQSxLQUo2QixDQUl2QkMsS0FBSyxJQUFJLENBQUUsTUFBTUEsS0FBTixDQUFhLENBSkQsQ0FBaEM7O0FBTUEsUUFBTSw4QkFBUTtBQUNWQyxJQUFBQSxZQUFZLEVBQUVOLG1CQURKO0FBRVZQLElBQUFBLGdCQUZVO0FBR1ZjLElBQUFBLFNBQVMsRUFBRTtBQUNQQyxNQUFBQSxHQUFHLEVBQUU7QUFDRGIsUUFBQUEsT0FBTyxFQUFFQSxPQURSLEVBREUsRUFIRCxFQUFSOzs7QUFRSFMsRUFBQUEsS0FSRyxDQVFHQyxLQUFLLElBQUksQ0FBRWxCLE9BQU8sQ0FBQ2tCLEtBQVIsQ0FBY0EsS0FBZCxFQUFzQixDQVJwQyxDQUFOO0FBU0giLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IGZpbGVzeXN0ZW0gZnJvbSAnZnMnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCBvd25Db25maWd1cmF0aW9uIGZyb20gJy4uLy4uL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5qcydcclxuaW1wb3J0IHsgZXhlY3V0ZSwgbG9va3VwIH0gZnJvbSAnQGRlcGVuZGVuY3kvc2NyaXB0RXhlY3V0aW9uJ1xyXG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9Qcm9qZWN0LmNsYXNzLmpzJ1xyXG5cclxucHJvY2Vzcy5vbignU0lHSU5UJywgKCkgPT4geyBcclxuICAgIGNvbnNvbGUubG9nKFwiQ2F1Z2h0IGludGVycnVwdCBzaWduYWwgLSBzY3JpcHRNYW5hZ2VyIGNvbnRhaW5lciBsZXZlbFwiKVxyXG4gICAgcHJvY2Vzcy5leGl0KDApXHJcbn0pXHJcbiAgXHJcbi8vIFRPRE86IEFkZCBzdXBwb3J0IGZvciBtdWx0aXBsZSBwcm9qZWN0IHRvIGJlIG1hbmFnZWQgYW5kIG11bHRpcGxlIHNjcmlwdHMgdG8gYmUgcnVuIGFuZCB0cmFja2VkLlxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNjcmlwdE1hbmFnZXIoe1xyXG4gICAgdGFyZ2V0UHJvamVjdENvbmZpZ1BhdGgsIC8vIGNvbmZpZ3VyYXRpb24gb2JqZWN0IG9mIHRoZSB0YXJnZXQgcHJvamVjdC5cclxuICAgIHNjcmlwdEtleVRvSW52b2tlLCAvLyB0aGUga2V5IG5hbWUgZm9yIHRoZSBzY3JpcHQgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgKGNvbXBhcmVkIHdpdGggdGhlIGtleSBpbiB0aGUgY29uZmlndXJhdGlvbiBmaWxlLilcclxuICAgIGpzQ29kZVRvRXZhbHVhdGUgLy8ganMgdG8gZXZhbHVhdGUgb24gdGhlIHJlcXVpcmVkIHNjcmlwdCA9PiAncmVxdWlyZSg8c2NyaXB0UGF0aD4pPGV2YWx1YXRlIGpzPidcclxufSkge1xyXG4gICAgY29uc29sZS5hc3NlcnQoc2NyaXB0S2V5VG9JbnZva2UsICdcXHgxYls0MW0lc1xceDFiWzBtJywgJ+KdjCBgc2NyaXB0S2V5VG9JbnZva2VgIHBhcmFtZXRlciBtdXN0IGJlIHNldC4nKVxyXG4gICAgXHJcbiAgICBsZXQgcHJvamVjdCA9IG5ldyBQcm9qZWN0KHsgY29uZmlndXJhdGlvblBhdGg6IHRhcmdldFByb2plY3RDb25maWdQYXRoIH0pXHJcblxyXG4gICAgLy8gbG9hZCBlbnRyeXBvaW50IGNvbmZpZ3VyYXRpb24gYW5kIGNoZWNrIGZvciAnZW50cnlwb2ludCcga2V5IChlbnRyeXBvaW50IGtleSBob2xkcyBvYmplY3Qgd2l0aCBlbnRyeXBvaW50IGluZm9ybWF0aW9uIGxpa2UgZmlsZSBwYXRoIG1hcHBpbmcpXHJcbiAgICBsZXQgc2NyaXB0Q29uZmlnQXJyYXkgPSBwcm9qZWN0LmNvbmZpZ3VyYXRpb25bJ3NjcmlwdCddXHJcbiAgICBjb25zb2xlLmFzc2VydChzY3JpcHRDb25maWdBcnJheSwgJ1xceDFiWzQxbSVzXFx4MWJbMG0nLCBg4p2MIGNvbmZpZ1snc2NyaXB0J10gb3B0aW9uIGluIHRhcmdldFByb2plY3QgY29uZmlndXJhdGlvbiBtdXN0IGV4aXN0LmApXHJcblxyXG4gICAgbGV0IHNjcmlwdENvbmZpZ3VyYXRpb24gPSBhd2FpdCBsb29rdXAoe1xyXG4gICAgICAgIHNjcmlwdDogc2NyaXB0Q29uZmlnQXJyYXksIFxyXG4gICAgICAgIHByb2plY3RSb290UGF0aDogcHJvamVjdC5jb25maWd1cmF0aW9uLnJvb3RQYXRoLCBcclxuICAgICAgICBzY3JpcHRLZXlUb0ludm9rZSwgIFxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4geyB0aHJvdyBlcnJvciB9KVxyXG5cclxuICAgIGF3YWl0IGV4ZWN1dGUoeyAvLyBBc3N1bWluZyBzY3JpcHQgaXMgc3luY2hyb25vdXMgXHJcbiAgICAgICAgc2NyaXB0Q29uZmlnOiBzY3JpcHRDb25maWd1cmF0aW9uLCBcclxuICAgICAgICBqc0NvZGVUb0V2YWx1YXRlLCBcclxuICAgICAgICBwYXJhbWV0ZXI6IHsgXHJcbiAgICAgICAgICAgIGFwaToge1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdDogcHJvamVjdCBcclxuICAgICAgICAgICAgfSAvLyBwYXNzIHByb2plY3QgYXBpXHJcbiAgICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4geyBjb25zb2xlLmVycm9yKGVycm9yKSB9KVxyXG59XHJcblxyXG4iXX0=