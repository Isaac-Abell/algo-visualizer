import { ParameterInput } from './ParameterInput';
import type { Algorithm, ProcessedParams } from './Algorithms';

interface ConfigPanelProps {
    algorithm: Algorithm;
    params: Record<string, string | number>;
    onParamChange: (paramName: string, value: string) => void;
    onVisualize: (algorithmId: string, processedParams: ProcessedParams) => void;
}

export function ConfigPanel({ algorithm, params, onParamChange, onVisualize }: ConfigPanelProps) {
    const handleVisualize = (): void => {
        // Validate required parameters
        const missingParams = algorithm.params.filter(param =>
            param.required && (!params[param.name] || params[param.name].toString().trim() === '')
        );

        if (missingParams.length > 0) {
            alert(`Please fill in all required parameters: ${missingParams.map(p => p.label).join(', ')}`);
            return;
        }

        // Process parameters based on algorithm
        const processedParams: ProcessedParams = { ...params };

        console.log(processedParams);

        if (algorithm.id === 'binary-search' || algorithm.id === 'heap-sort' || algorithm.id === 'quick-sort') {
            // Convert array string to numbers
            try {
                const arrayStr = params.array as string;
                if (!arrayStr) {
                    alert('Array parameter is required');
                    return;
                }

                processedParams.array = arrayStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
                if ((processedParams.array as number[]).length === 0) {
                    alert('Please enter a valid array of numbers separated by commas');
                    return;
                }
                if (algorithm.id === 'binary-search') {
                    processedParams.array.sort((a, b) => a - b);
                }
            } catch (e) {
                alert('Invalid array format. Please use comma-separated numbers.');
                return;
            }
        }
        else if (algorithm.id === 'dfs' || algorithm.id === 'bfs') {
            const adjacencyList: Record<string, string[]> = {};

            const edgesStr: string = processedParams.edges as string;
            edgesStr.split("\n").forEach((edge: string): void => {
                const [u, v] = edge.split(",").map(x => x.trim());

                if (!adjacencyList[u]) adjacencyList[u] = [];
                if (!adjacencyList[v]) adjacencyList[v] = [];

                adjacencyList[u].push(v);
            });

            processedParams.adjacencyList = adjacencyList;
        }
        console.log(processedParams);

        onVisualize(algorithm.id, processedParams);
    };

    return (
        <div className="config-panel">
            <h2 className="config-header">
                <div className="config-icon">
                    {algorithm.icon}
                </div>
                Configure {algorithm.name}
            </h2>

            <div>
                {algorithm.params.map((param) => (
                    <ParameterInput
                        key={param.name}
                        param={param}
                        value={params[param.name]}
                        onChange={onParamChange}
                    />
                ))}

                <button
                    onClick={handleVisualize}
                    className="visualize-button"
                >
                    Start Visualization
                </button>
            </div>
        </div>
    );
}