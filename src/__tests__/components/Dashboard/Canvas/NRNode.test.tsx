import { describe, test, jest } from '@jest/globals';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NRNode from '../../../../components/Dashboard/Canvas/NRNode';

describe('<NRNode />', () => {
  test('Should render NR Node properly', () => {
    const onAddNROpen = jest.fn();
    const onRefetch = jest.fn();
    const reSizeNode = jest.fn();
    const onGroupExpandCollapse = jest.fn();
    const node: any = {
      portsList: [],
      groups: [],
      selectedNe: [{ id: 1, name: 'Ashuburn' }],
      portsUsed: [],
      groupsUsed: [],
      bandwidths: [],
      nodeDataCanvas: [],
    };
    const { getByTestId } = render(
      <MemoryRouter>
        <NRNode node={node} engine={new DiagramEngine()} onGroupExpandCollapse={onGroupExpandCollapse} onAddNROpen={onAddNROpen} onRefetch={onRefetch} reSizeNode={reSizeNode} />
      </MemoryRouter>,
    );

    expect(getByTestId('nr-node-root')).toBeInTheDocument();
  });

  test.skip('Should call add nr open function on no ports div click', () => {
    const onAddNROpen = jest.fn();
    const onRefetch = jest.fn();
    const reSizeNode = jest.fn();
    const onGroupExpandCollapse = jest.fn();
    const node: any = {
      portsList: [],
      groups: [],
      selectedNe: [{ id: 1, name: 'Ashuburn' }],
      portsUsed: [],
      groupsUsed: [],
      bandwidths: [],
      nodeDataCanvas: [],
    };

    const { getByTestId } = render(
      <MemoryRouter>
        <NRNode node={node} engine={new DiagramEngine()} onGroupExpandCollapse={onGroupExpandCollapse} onAddNROpen={onAddNROpen} onRefetch={onRefetch} reSizeNode={reSizeNode} />
      </MemoryRouter>,
    );

    const noPortsDiv = getByTestId('no-ports');

    fireEvent.click(noPortsDiv);

    expect(onAddNROpen).toHaveBeenCalled();
  });
});
