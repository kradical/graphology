import Graph from 'graphology-types';

type WeightedDegreeOptions = {
  attributes?: {
    weight?: string;
    weightedDegree?: string;
  };
};

type WeightedDegreeMapping = {[key: string]: number};

interface IWeightedDegreeBase {
  (graph: Graph, options?: WeightedDegreeOptions): WeightedDegreeMapping;
  (graph: Graph, node: unknown, options?: WeightedDegreeOptions): number;

  assign(graph: Graph, options?: WeightedDegreeOptions): void;
  assign(graph: Graph, node: unknown, options?: WeightedDegreeOptions): void;
}

interface IWeightedDegree extends IWeightedDegreeBase {
  weightedDegree: IWeightedDegreeBase;
  weightedInDegree: IWeightedDegreeBase;
  weightedOutDegree: IWeightedDegreeBase;
}

declare const weightedDegree: IWeightedDegreeBase;
declare const weightedInDegree: IWeightedDegreeBase;
declare const weightedOutDegree: IWeightedDegreeBase;

declare const defaultWeightedDegree: IWeightedDegree;

export {weightedDegree, weightedInDegree, weightedOutDegree};
export default defaultWeightedDegree;