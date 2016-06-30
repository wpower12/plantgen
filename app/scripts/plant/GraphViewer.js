function GraphViewer(){
  this.chart_config = {};
}
GraphViewer.prototype = {
  show: function( plant ){
    var config = {
    	container: '#graph'
    };
    var root_node = {
      text: {
        name: plant.root.title1,
        title: plant.root.title2
      }
    };

    this.chart_config = [
      config, root_node
    ];
 
    for( var i = 0; i < plant.root.children.length > 0; i++ ){
      this.addNode( root_node, plant.root.children[i] );
    }
    this.t = new Treant( this.chart_config );
  },
  clearGraph: function(){
    // this.t.destroy();
    // $('#graph').empty();
  },
  addNode: function( parent_graph_node, child_proc_node ){
    var node = {
      parent: parent_graph_node,
      text: {
        name: child_proc_node.title1,
        title: child_proc_node.title2
      }
    };
    this.chart_config.push( node );
    for( var i = 0; i < child_proc_node.children.length; i++ ){
      this.addNode( node, child_proc_node.children[i] );
    }
  }
}
module.exports = GraphViewer;

