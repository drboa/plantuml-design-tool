'use babel';

import PlantumlDesignToolView from './plantuml-design-tool-view';
import { CompositeDisposable } from 'atom';

export default {

  plantumlDesignToolView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.plantumlDesignToolView = new PlantumlDesignToolView(state.plantumlDesignToolViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.plantumlDesignToolView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'plantuml-design-tool:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.plantumlDesignToolView.destroy();
  },

  serialize() {
    return {
      plantumlDesignToolViewState: this.plantumlDesignToolView.serialize()
    };
  },

  toggle() {
    console.log('PlantumlDesignTool was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
