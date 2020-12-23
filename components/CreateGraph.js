/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function () {
  const c = new noflo.Component();
  c.description = 'Create a NoFlo Graph instance';
  c.inPorts.add('details',
    { datatype: 'object' });
  c.outPorts.add('out',
    { datatype: 'object' });
  return c.process((input, output) => {
    if (!input.hasData('details')) { return; }
    const details = input.getData('details');
    if (details.type) {
      details.environment = { type: details.type };
      delete details.type;
    }
    const graph = new noflo.Graph(details.name);
    graph.setProperties(details);
    return output.sendDone({ out: graph });
  });
};
