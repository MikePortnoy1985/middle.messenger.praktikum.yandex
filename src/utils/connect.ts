import { TAppPages, TTypeOfAppPages, TView } from './Router';
import Store, { TState, TUnionState } from './Store';

export function connect (Component: TTypeOfAppPages) {
  return class extends Component {
    constructor (args: TState) {
      super(args);

      Store.on(Store.STORE_EVENTS.Updated, () => {
        if (Store.getState()) {
          (this as unknown as TAppPages).setProps({ ...(Store.getState() as TUnionState) });
        }
      });
    }
  } as TView;
}
