import { describe, test } from '@jest/globals';
import {
  render, fireEvent,
} from '@testing-library/react';
import CollapsibleNE from '../../../components/ManagePorts/Collapsible';
import { SortOrder } from '../../../enums';

describe('<CollapsibleNE />', () => {
  test('Should render Collapse NE properly', async () => {
    const props = {
      id: '1',
      text: 'string',
      open: true,
      ports: [],
      groups: [],
      loading: true,
      order: SortOrder as any,
      orderBy: 'asc',
      selected: [],
      unGroupedSelected: [],
      selectedUnGroupId: '1',
      expandedGroupIds: [],
      removeLoadingId: '1',
      cancelSubLoading: '11',
      onSelectRow: jest.fn() as any,
      onGroupRowSelect: jest.fn() as any,
      onRequestSort: jest.fn() as any,
      onCollapsibleNEOpen: jest.fn() as any,
      onCollapsibleNEClose: jest.fn() as any,
      onCollapsibleGroupOpen: jest.fn() as any,
      onCollapsibleGroupClose: jest.fn() as any,
      onEditGroupClick: jest.fn() as any,
      onSaleClick: jest.fn() as any,
      onSaleEdit: jest.fn() as any,
      onRemoveClick: jest.fn() as any,
      onCancelSubscription: jest.fn() as any,
    };

    const { container } = render(<CollapsibleNE {...props} />);

    expect(container.firstChild).toHaveClass('Collapsible');
  });

  test('Should render Collapse NE properly with open as false', async () => {
    const props = {
      id: '1',
      text: 'string',
      open: false,
      ports: [],
      groups: [],
      loading: true,
      order: SortOrder as any,
      orderBy: 'asc',
      selected: [],
      unGroupedSelected: [],
      selectedUnGroupId: '1',
      expandedGroupIds: [],
      removeLoadingId: '1',
      cancelSubLoading: '11',
      onSelectRow: jest.fn() as any,
      onGroupRowSelect: jest.fn() as any,
      onRequestSort: jest.fn() as any,
      onCollapsibleNEOpen: jest.fn() as any,
      onCollapsibleNEClose: jest.fn() as any,
      onCollapsibleGroupOpen: jest.fn() as any,
      onCollapsibleGroupClose: jest.fn() as any,
      onEditGroupClick: jest.fn() as any,
      onSaleClick: jest.fn() as any,
      onSaleEdit: jest.fn() as any,
      onRemoveClick: jest.fn() as any,
      onCancelSubscription: jest.fn() as any,
    };

    const { container } = render(<CollapsibleNE {...props} />);

    expect(container.firstChild).toHaveClass('Collapsible');
  });
});
