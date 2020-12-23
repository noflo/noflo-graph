const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'Listen for finished change transctions on a graph';
  c.inPorts.add('in',
    { datatype: 'object' });
  c.outPorts.add('out',
    { datatype: 'object' });
  c.outPorts.add('error',
    { datatype: 'object' });
  c.graph = null;
  const unsubscribe = () => {
    if (!c.graph) { return; }
    c.graph.graph.removeListener('endTransaction', c.graph.listener);
    c.graph.context.deactivate();
    c.graph = null;
  };
  c.tearDown = () => {
    unsubscribe();
    return Promise.resolve();
  };
  return c.process((input, output, context) => {
    if (!input.hasData('in')) { return; }
    const graph = input.getData('in');
    c.graph = {
      graph,
      listener() {
        output.send({ out: c.graph.graph });
      },
      context,
    };
    graph.on('endTransaction', c.graph.listener);
  });
};
