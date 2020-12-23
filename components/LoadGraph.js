/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function () {
  const c = new noflo.Component();
  c.description = 'Load a JSON or FBP string into a NoFlo graph';
  c.inPorts.add('in',
    { datatype: 'string' });
  c.outPorts.add('out',
    { datatype: 'object' });
  c.outPorts.add('error',
    { datatype: 'object' });
  return c.process((input, output) => {
    if (!input.hasData('in')) { return; }
    const source = input.getData('in');
    if (source.indexOf('->') !== -1) {
      // FBP file
      noflo.graph.loadFBP(source, (err, graph) => {
        if (err) { return output.done(err); }
        return output.sendDone({ out: graph });
      });
      return;
    }
    return noflo.graph.loadJSON(source, (err, graph) => {
      if (err) { return output.done(err); }
      return output.sendDone({ out: graph });
    });
  });
};
