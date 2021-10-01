import Graph, {Attributes, GraphConstructor} from 'graphology-types';

export default function krackhardtKite<
  NodeAttributes extends Attributes = Attributes,
  EdgeAttributes extends Attributes = Attributes,
  GraphAttributes extends Attributes = Attributes
>(
  Graph: GraphConstructor<NodeAttributes, EdgeAttributes, GraphAttributes>
): Graph<NodeAttributes, EdgeAttributes, GraphAttributes>;
