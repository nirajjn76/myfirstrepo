import { Action, InputType } from '@projectstorm/react-canvas-core';
import { NENodeModel } from './NENodeModel';

export default class CustomDragEndAction extends Action {
  constructor() {
    super({
      type: InputType.MOUSE_UP,
      fire: (event: any) => {
        const item = this.engine.getMouseElement(event.event);
        // check for that mouse_up element is node and not other than that like link or anything
        if (item instanceof NENodeModel) {
          const classList = ['operations', 'un-hovered-root', 'should-dragable', 'td-bg', 'ports-root'];
          // checking if mouse_up event is on desired element and not button click of adding port or adding bandwidth
          const classStr = event.event.target.className || '';
          const found = classStr.split(' ').some((r: any) => classList.indexOf(r) >= 0);
          if (found) {
            this.engine.fireEvent(event, 'onNodeDragEvent');
          }
        }
      },
    });
  }
}
