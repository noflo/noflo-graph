/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function () {
  const c = new noflo.Component();
  c.description = 'Listen for finished change transctions on a graph';
  c.inPorts.add('in',
    { datatype: 'object' });
  c.outPorts.add('out',
    { datatype: 'object' });
  c.outPorts.add('error',
    { datatype: 'object' });
  c.graph = null;
  const unsubscribe = function () {
    if (!c.graph) { return; }
    c.graph.graph.removeListener('endTransaction', c.graph.listener);
    c.graph.context.deactivate();
    return c.graph = null;
  };
  c.tearDown = function (callback) {
    unsubscribe();
    return callback();
  };
  return c.process((input, output, context) => {
    if (!input.hasData('in')) { return; }
    const graph = input.getData('in');
    c.graph = {
      graph,
      listener(event) {
        return output.send({ out: c.graph.graph });
      },
      context,
    };
    return graph.on('endTransaction', c.graph.listener);
  });
};
