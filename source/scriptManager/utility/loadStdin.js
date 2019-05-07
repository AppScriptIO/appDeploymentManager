"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.loadStdin = loadStdin;



function loadStdin({ asBuffer = false } = {}) {
  const accumulator = [];
  let len = 0;

  return new Promise(resolve => {
    if (process.stdin.isTTY) {
      let result = asBuffer ? Buffer.concat([]) : accumulator.join('');
      resolve(result);
      return;
    }
    debugger;
    process.stdin.on('readable', () => {
      let chunk;
      while (chunk = process.stdin.read()) {
        accumulator.push(chunk);
        len += chunk.length;
      }
    });

    process.stdin.on('end', () => {
      let result = asBuffer ? Buffer.concat(accumulator, len) : accumulator.join('');
      resolve(result);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS9zY3JpcHRNYW5hZ2VyL3V0aWxpdHkvbG9hZFN0ZGluLmpzIl0sIm5hbWVzIjpbImxvYWRTdGRpbiIsImFzQnVmZmVyIiwiYWNjdW11bGF0b3IiLCJsZW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInByb2Nlc3MiLCJzdGRpbiIsImlzVFRZIiwicmVzdWx0IiwiQnVmZmVyIiwiY29uY2F0Iiwiam9pbiIsIm9uIiwiY2h1bmsiLCJyZWFkIiwicHVzaCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7OztBQUlPLFNBQVNBLFNBQVQsQ0FBbUIsRUFBRUMsUUFBUSxHQUFHLEtBQWIsS0FBdUIsRUFBMUMsRUFBOEM7QUFDbkQsUUFBTUMsV0FBVyxHQUFHLEVBQXBCO0FBQ0EsTUFBSUMsR0FBRyxHQUFHLENBQVY7O0FBRUEsU0FBTyxJQUFJQyxPQUFKLENBQVlDLE9BQU8sSUFBSTtBQUM1QixRQUFJQyxPQUFPLENBQUNDLEtBQVIsQ0FBY0MsS0FBbEIsRUFBeUI7QUFDdkIsVUFBSUMsTUFBTSxHQUFHUixRQUFRLEdBQUdTLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsQ0FBSCxHQUF1QlQsV0FBVyxDQUFDVSxJQUFaLENBQWlCLEVBQWpCLENBQTVDO0FBQ0FQLE1BQUFBLE9BQU8sQ0FBQ0ksTUFBRCxDQUFQO0FBQ0E7QUFDRDtBQUNEO0FBQ0FILElBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjTSxFQUFkLENBQWlCLFVBQWpCLEVBQTZCLE1BQU07QUFDakMsVUFBSUMsS0FBSjtBQUNBLGFBQVFBLEtBQUssR0FBR1IsT0FBTyxDQUFDQyxLQUFSLENBQWNRLElBQWQsRUFBaEIsRUFBdUM7QUFDckNiLFFBQUFBLFdBQVcsQ0FBQ2MsSUFBWixDQUFpQkYsS0FBakI7QUFDQVgsUUFBQUEsR0FBRyxJQUFJVyxLQUFLLENBQUNHLE1BQWI7QUFDRDtBQUNGLEtBTkQ7O0FBUUFYLElBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjTSxFQUFkLENBQWlCLEtBQWpCLEVBQXdCLE1BQU07QUFDNUIsVUFBSUosTUFBTSxHQUFHUixRQUFRLEdBQUdTLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjVCxXQUFkLEVBQTJCQyxHQUEzQixDQUFILEdBQXFDRCxXQUFXLENBQUNVLElBQVosQ0FBaUIsRUFBakIsQ0FBMUQ7QUFDQVAsTUFBQUEsT0FBTyxDQUFDSSxNQUFELENBQVA7QUFDRCxLQUhEO0FBSUQsR0FuQk0sQ0FBUDtBQW9CRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBIYW5kbGUgc3RkaW4gaW5wdXQgdXNpbmcgYnVmZmVycyByYXRoZXIgdGhhbiB0aGUgZXZlbnQgZW1pdHRlciBvZiBwcm9jZXNzLnN0ZGluLCB3aGljaCB3aWxsIG5vdCBrZWVwIHdhaXRpbmcgaW4gYW4gaWRsZSBzdGF0ZSBpZiBubyBwaXBlZCB2YWx1ZXMgYXJlIHBhc3NlZCAoaW4gdGhlIHByb2dyYW0gd2FzIHJ1biB3aXRob3V0IHNoZWxsIHBpcGVsaW5lKS5cclxuICogaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9nZXQtc3RkaW5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkU3RkaW4oeyBhc0J1ZmZlciA9IGZhbHNlIH0gPSB7fSkge1xyXG4gIGNvbnN0IGFjY3VtdWxhdG9yID0gW11cclxuICBsZXQgbGVuID0gMFxyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICBpZiAocHJvY2Vzcy5zdGRpbi5pc1RUWSkge1xyXG4gICAgICBsZXQgcmVzdWx0ID0gYXNCdWZmZXIgPyBCdWZmZXIuY29uY2F0KFtdKSA6IGFjY3VtdWxhdG9yLmpvaW4oJycpXHJcbiAgICAgIHJlc29sdmUocmVzdWx0KVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGRlYnVnZ2VyXHJcbiAgICBwcm9jZXNzLnN0ZGluLm9uKCdyZWFkYWJsZScsICgpID0+IHtcclxuICAgICAgbGV0IGNodW5rXHJcbiAgICAgIHdoaWxlICgoY2h1bmsgPSBwcm9jZXNzLnN0ZGluLnJlYWQoKSkpIHtcclxuICAgICAgICBhY2N1bXVsYXRvci5wdXNoKGNodW5rKVxyXG4gICAgICAgIGxlbiArPSBjaHVuay5sZW5ndGhcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBwcm9jZXNzLnN0ZGluLm9uKCdlbmQnLCAoKSA9PiB7XHJcbiAgICAgIGxldCByZXN1bHQgPSBhc0J1ZmZlciA/IEJ1ZmZlci5jb25jYXQoYWNjdW11bGF0b3IsIGxlbikgOiBhY2N1bXVsYXRvci5qb2luKCcnKVxyXG4gICAgICByZXNvbHZlKHJlc3VsdClcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG4iXX0=