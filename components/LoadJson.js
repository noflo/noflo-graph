const noflo = require('noflo');

exports.getComponent = () => {
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
    noflo.graph.loadJSON(source)
      .then((graph) => {
        if ((source.id && (graph.properties.id !== source.id))
          || (source.project && (graph.properties.project !== source.project))) {
          graph.setProperties({
            id: source.id,
            project: source.project,
          });
        }
        output.sendDone({ out: graph });
      }, output.done);
  });
};
