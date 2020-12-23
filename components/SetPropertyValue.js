const noflo = require('noflo');

exports.getComponent = () => {
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
    const [property, value, graph] = input.getData('property', 'value', 'in');

    if (typeof graph.setProperties !== 'function') {
      output.done(new Error('Provided graph is not a Graph object'));
      return;
    }

    const props = {};
    props[property] = value;
    graph.setProperties(props);

    output.sendDone({ out: graph });
  });
};
