/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function () {
  const c = new noflo.Component();
  c.inPorts.add('property',
    { datatype: 'string' });
  c.inPorts.add('value',
    { datatype: 'all' });
  c.inPorts.add('in',
    { datatype: 'object' });
  c.outPorts.add('out',
    { datatype: 'object' });
  c.outPorts.add('error',
    { datatype: 'object' });
  return c.process((input, output) => {
    if (!input.hasData('property', 'value', 'in')) { return; }
    const [property, value, graph] = Array.from(input.getData('property', 'value', 'in'));

    if (typeof graph.setProperties !== 'function') {
      output.done(new Error('Provided graph is not a Graph object'));
      return;
    }

    const props = {};
    props[property] = value;
    graph.setProperties(props);

    return output.sendDone({ out: graph });
  });
};
