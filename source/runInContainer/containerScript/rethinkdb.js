"use strict";
{
  let image = 'rethinkdb:latest',
  processCommand = 'docker',
  containerCommand = ``,
  containerPrefix = 'scriptManager_rehinkdb',
  networkAlais = 'rethinkdb';

  let processArg = [
  `run`,
  `--rm`,


  `--network-alias ${networkAlais}`,
  `--network=${networkName}`,
  `-P `].


  concat([
  `--name ${containerPrefix}`,
  `${image}`]);

  console.log(
  `%s \n %s \n %s`,
  `\x1b[3m\x1b[2m > ${processCommand} ${processArg.join(' ')}\x1b[0m`,
  `\t\x1b[3m\x1b[2mimage:\x1b[0m ${image}`,
  `\t\x1b[3m\x1b[2mcommand:\x1b[0m ${containerCommand}`);


  let childProcess = spawn(processCommand, processArg, {

    detached: false, shell: true, stdio: ['ignore', 'ignore', 'ignore'],
    env: process.env });

  childProcessArray.push(childProcess);

  console.log(`\x1b[45m%s\x1b[0m`, `[NODE HOST MACHINE] PID: Child ${childProcess.pid}`);
  childProcess.on('error', function (err) {throw err;});
  childProcess.on('exit', () => {
    console.log(`\x1b[41m%s\x1b[0m`, `[NODE HOST MACHINE] PID: Child ${childProcess.pid} terminated.`);
    spawnSync('docker', [`kill ${containerPrefix}`], {
      detached: false, shell: true, stdio: 'inherit',
      env: process.env });

  });

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS9ydW5JbkNvbnRhaW5lci9jb250YWluZXJTY3JpcHQvcmV0aGlua2RiLmpzIl0sIm5hbWVzIjpbImltYWdlIiwicHJvY2Vzc0NvbW1hbmQiLCJjb250YWluZXJDb21tYW5kIiwiY29udGFpbmVyUHJlZml4IiwibmV0d29ya0FsYWlzIiwicHJvY2Vzc0FyZyIsIm5ldHdvcmtOYW1lIiwiY29uY2F0IiwiY29uc29sZSIsImxvZyIsImpvaW4iLCJjaGlsZFByb2Nlc3MiLCJzcGF3biIsImRldGFjaGVkIiwic2hlbGwiLCJzdGRpbyIsImVudiIsInByb2Nlc3MiLCJjaGlsZFByb2Nlc3NBcnJheSIsInB1c2giLCJwaWQiLCJvbiIsImVyciIsInNwYXduU3luYyJdLCJtYXBwaW5ncyI6IjtBQUNBO0FBQ0ksTUFBSUEsS0FBSyxHQUFHLGtCQUFaO0FBQ0lDLEVBQUFBLGNBQWMsR0FBRyxRQURyQjtBQUVJQyxFQUFBQSxnQkFBZ0IsR0FBSSxFQUZ4QjtBQUdJQyxFQUFBQSxlQUFlLEdBQUcsd0JBSHRCO0FBSUlDLEVBQUFBLFlBQVksR0FBRyxXQUpuQjs7QUFNQSxNQUFJQyxVQUFVLEdBQUc7QUFDUixPQURRO0FBRVIsUUFGUTs7O0FBS1IscUJBQWtCRCxZQUFhLEVBTHZCO0FBTVIsZUFBWUUsV0FBWSxFQU5oQjtBQU9SLE9BUFE7OztBQVVaQyxFQUFBQSxNQVZZLENBVUw7QUFDSCxZQUFTSixlQUFnQixFQUR0QjtBQUVILEtBQUVILEtBQU0sRUFGTCxDQVZLLENBQWpCOztBQWNBUSxFQUFBQSxPQUFPLENBQUNDLEdBQVI7QUFDSyxrQkFETDtBQUVLLHNCQUFtQlIsY0FBZSxJQUFHSSxVQUFVLENBQUNLLElBQVgsQ0FBZ0IsR0FBaEIsQ0FBcUIsU0FGL0Q7QUFHSyxtQ0FBZ0NWLEtBQU0sRUFIM0M7QUFJSyxxQ0FBa0NFLGdCQUFpQixFQUp4RDs7O0FBT0EsTUFBSVMsWUFBWSxHQUFHQyxLQUFLLENBQUNYLGNBQUQsRUFBaUJJLFVBQWpCLEVBQTZCOztBQUVqRFEsSUFBQUEsUUFBUSxFQUFFLEtBRnVDLEVBRWhDQyxLQUFLLEVBQUUsSUFGeUIsRUFFbkJDLEtBQUssRUFBRSxDQUFFLFFBQUYsRUFBWSxRQUFaLEVBQXNCLFFBQXRCLENBRlk7QUFHakRDLElBQUFBLEdBQUcsRUFBRUMsT0FBTyxDQUFDRCxHQUhvQyxFQUE3QixDQUF4Qjs7QUFLQUUsRUFBQUEsaUJBQWlCLENBQUNDLElBQWxCLENBQXVCUixZQUF2Qjs7QUFFQUgsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWEsbUJBQWIsRUFBaUMsa0NBQWlDRSxZQUFZLENBQUNTLEdBQUksRUFBbkY7QUFDQVQsRUFBQUEsWUFBWSxDQUFDVSxFQUFiLENBQWdCLE9BQWhCLEVBQXlCLFVBQVVDLEdBQVYsRUFBZSxDQUFFLE1BQU1BLEdBQU4sQ0FBVyxDQUFyRDtBQUNBWCxFQUFBQSxZQUFZLENBQUNVLEVBQWIsQ0FBZ0IsTUFBaEIsRUFBd0IsTUFBTTtBQUMxQmIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWEsbUJBQWIsRUFBaUMsa0NBQWlDRSxZQUFZLENBQUNTLEdBQUksY0FBbkY7QUFDQUcsSUFBQUEsU0FBUyxDQUFDLFFBQUQsRUFBVyxDQUFFLFFBQU9wQixlQUFnQixFQUF6QixDQUFYLEVBQXdDO0FBQzdDVSxNQUFBQSxRQUFRLEVBQUUsS0FEbUMsRUFDNUJDLEtBQUssRUFBRSxJQURxQixFQUNmQyxLQUFLLEVBQUUsU0FEUTtBQUU3Q0MsTUFBQUEsR0FBRyxFQUFFQyxPQUFPLENBQUNELEdBRmdDLEVBQXhDLENBQVQ7O0FBSUgsR0FORDs7QUFRSCIsInNvdXJjZXNDb250ZW50IjpbIi8vIFJFVEhJTktEQlxyXG57XHJcbiAgICBsZXQgaW1hZ2UgPSAncmV0aGlua2RiOmxhdGVzdCcsIC8vIHRoaXMgY29udGFpbmVyIHNob3VsZCBoYXZlIGRvY2tlciBjbGllbnQgJiBkb2NrZXItY29tcG9zZSBpbnN0YWxsZWQgaW4uXHJcbiAgICAgICAgcHJvY2Vzc0NvbW1hbmQgPSAnZG9ja2VyJyxcclxuICAgICAgICBjb250YWluZXJDb21tYW5kID0gYGAsXHJcbiAgICAgICAgY29udGFpbmVyUHJlZml4ID0gJ3NjcmlwdE1hbmFnZXJfcmVoaW5rZGInLCBcclxuICAgICAgICBuZXR3b3JrQWxhaXMgPSAncmV0aGlua2RiJ1xyXG5cclxuICAgIGxldCBwcm9jZXNzQXJnID0gW1xyXG4gICAgICAgICAgICBgcnVuYCxcclxuICAgICAgICAgICAgYC0tcm1gLCAvLyBhdXRvbWF0aWNhbGx5IHJlbW92ZSBhZnRlciBjb250YWluZXIgZXhpc3RzLlxyXG4gICAgICAgICAgICAvLyBgLS1pbnRlcmFjdGl2ZSAtLXR0eWAsIC8vIGFsbG9jYXRlIGEgdGVybWluYWwgLSB0aGlzIGFsbG93cyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgY29udGFpbmVyIHByb2Nlc3MuXHJcbiAgICAgICAgICAgIC8vIGAtLXZvbHVtZSAke2FwcGxpY2F0aW9uLmhvc3RQYXRofToke2FwcGxpY2F0aW9uLnBhdGhJbkNvbnRhaW5lcn1gLFxyXG4gICAgICAgICAgICBgLS1uZXR3b3JrLWFsaWFzICR7bmV0d29ya0FsYWlzfWAsXHJcbiAgICAgICAgICAgIGAtLW5ldHdvcms9JHtuZXR3b3JrTmFtZX1gLFxyXG4gICAgICAgICAgICBgLVAgYFxyXG4gICAgICAgICAgICAvLyBgLVBgXHJcbiAgICAgICAgXVxyXG4gICAgICAgIC5jb25jYXQoW1xyXG4gICAgICAgICAgICBgLS1uYW1lICR7Y29udGFpbmVyUHJlZml4fWAsXHJcbiAgICAgICAgICAgIGAke2ltYWdlfWBcclxuICAgICAgICBdKVxyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgYCVzIFxcbiAlcyBcXG4gJXNgLFxyXG4gICAgICAgIGBcXHgxYlszbVxceDFiWzJtID4gJHtwcm9jZXNzQ29tbWFuZH0gJHtwcm9jZXNzQXJnLmpvaW4oJyAnKX1cXHgxYlswbWAsXHJcbiAgICAgICAgYFxcdFxceDFiWzNtXFx4MWJbMm1pbWFnZTpcXHgxYlswbSAke2ltYWdlfWAsXHJcbiAgICAgICAgYFxcdFxceDFiWzNtXFx4MWJbMm1jb21tYW5kOlxceDFiWzBtICR7Y29udGFpbmVyQ29tbWFuZH1gXHJcbiAgICApICAgIFxyXG4gICAgXHJcbiAgICBsZXQgY2hpbGRQcm9jZXNzID0gc3Bhd24ocHJvY2Vzc0NvbW1hbmQsIHByb2Nlc3NBcmcsIHsgXHJcbiAgICAgICAgLy8gZGV0YWNoZWQ6IGZhbHNlLCBzaGVsbDogdHJ1ZSwgc3RkaW86IFsgJ2luaGVyaXQnLCAnaW5oZXJpdCcsICdpbmhlcml0JywgJ2lwYycgXSxcclxuICAgICAgICBkZXRhY2hlZDogZmFsc2UsIHNoZWxsOiB0cnVlLCBzdGRpbzogWyAnaWdub3JlJywgJ2lnbm9yZScsICdpZ25vcmUnIF0sXHJcbiAgICAgICAgZW52OiBwcm9jZXNzLmVudiAvLyBwYXNzIGVudmlyb25tZW50IHZhcmlhYmxlcyBsaWtlIHByb2Nlc3MuZW52LlBXRCB0byBzcGF3biBwcm9jZXNzXHJcbiAgICB9KVxyXG4gICAgY2hpbGRQcm9jZXNzQXJyYXkucHVzaChjaGlsZFByb2Nlc3MpXHJcbiAgICAvLyBjaGlsZFByb2Nlc3MudW5yZWYoKSAvLyBwcmV2ZW50IHBhcmVudCBmcm9tIHdhaXRpbmcgdG8gY2hpbGQgcHJvY2VzcyBhbmQgdW4gcmVmZXJlbmNlIGNoaWxkIGZyb20gcGFyZW50J3MgZXZlbnQgbG9vcC5cclxuICAgIGNvbnNvbGUubG9nKGBcXHgxYls0NW0lc1xceDFiWzBtYCxgW05PREUgSE9TVCBNQUNISU5FXSBQSUQ6IENoaWxkICR7Y2hpbGRQcm9jZXNzLnBpZH1gKVxyXG4gICAgY2hpbGRQcm9jZXNzLm9uKCdlcnJvcicsIGZ1bmN0aW9uKCBlcnIgKXsgdGhyb3cgZXJyIH0pXHJcbiAgICBjaGlsZFByb2Nlc3Mub24oJ2V4aXQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFxceDFiWzQxbSVzXFx4MWJbMG1gLGBbTk9ERSBIT1NUIE1BQ0hJTkVdIFBJRDogQ2hpbGQgJHtjaGlsZFByb2Nlc3MucGlkfSB0ZXJtaW5hdGVkLmApXHJcbiAgICAgICAgc3Bhd25TeW5jKCdkb2NrZXInLCBbYGtpbGwgJHtjb250YWluZXJQcmVmaXh9YF0sIHsgXHJcbiAgICAgICAgICAgIGRldGFjaGVkOiBmYWxzZSwgc2hlbGw6IHRydWUsIHN0ZGlvOiAnaW5oZXJpdCcsXHJcbiAgICAgICAgICAgIGVudjogcHJvY2Vzcy5lbnYgLy8gcGFzcyBlbnZpcm9ubWVudCB2YXJpYWJsZXMgbGlrZSBwcm9jZXNzLmVudi5QV0QgdG8gc3Bhd24gcHJvY2Vzc1xyXG4gICAgICAgIH0pICAgIFxyXG4gICAgfSlcclxuXHJcbn1cclxuIl19