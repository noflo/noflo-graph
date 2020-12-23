/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function () {
  const c = new noflo.Component();
  c.description = 'Convert a Graph JSON structure into a NoFlo Graph';
  c.inPorts.add('in',
    { datatype: 'object' });
  c.outPorts.add('out',
    { datatype: 'object' });
  c.outPorts.add('error',
    { datatype: 'object' });
  return c.process((input, output) => {
    if (!input.hasData('in')) { return; }
    const source = input.getData('in');
    noflo.graph.loadJSON(source, (err, graph) => {
      if (err) { return output.done(err); }

      if ((source.id && (graph.properties.id !== source.id)) || (source.project && (graph.properties.project !== source.project))) {
        graph.setProperties({
          id: source.id,
          project: source.project,
        });
      }

      return output.sendDone({ out: graph });
    });
  });
};
