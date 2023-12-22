import { forEach } from 'lodash';
import { Action, InputType } from '@projectstorm/react-canvas-core';
import { DefaultLinkModel } from '@projectstorm/react-diagrams';

interface CustomDeleteItemsActionOptions {
  keyNames?: string[];
}
/**
 * Deletes all selected items, but asks for confirmation first
 */
export default class CustomDeleteItemsAction extends Action {
  constructor(options: CustomDeleteItemsActionOptions = {}) {
    options = {
      keyNames: ['Backspace', 'Delete'],
      ...options,
    };
    super({
      type: InputType.KEY_DOWN,
      fire: (event: any) => {
        if (options.keyNames?.indexOf(event.event.code) !== -1) {
          const selectedEntities = this.engine.getModel().getSelectedEntities();
          if (selectedEntities.length > 0) {
            let isDeletableItem = false;
            forEach(selectedEntities, (entitie: any) => {
              if (entitie instanceof DefaultLinkModel) {
                const { extras } = (entitie as DefaultLinkModel).getOptions();
                if (extras === undefined || (extras && !extras.isBandwidthLink)) {
                  isDeletableItem = true;
                }
              }
            });
            if (!isDeletableItem) {
              return; // as we don't need to delete node or other element.
            }
            // eslint-disable-next-line no-alert
            // const confirm = window.confirm('Are you sure you want to delete?');
            const confirm = true;
            if (confirm) {
              forEach(selectedEntities, (model: any) => {
                // only delete items which are not locked
                // onlu delete links as we don't want to make node or port gets deleted
                if (!model.isLocked() && model instanceof DefaultLinkModel) {
                  model.remove();
                }
              });
              this.engine.repaintCanvas();
            }
          }
        }
      },
    });
  }
}
