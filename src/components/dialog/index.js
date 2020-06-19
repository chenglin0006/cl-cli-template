import Dialog from './src/dialog';

// 默认值
let defaults = {
    message: '',
    dialogButton: [
        {
            text: '取消'
        },
        {
          text: '确认',
          type: 'primary'  
        }
    ]
};

let dialogInstance = 0;

let initOptions = (options) => {
    let args = Object.assign({}, defaults, options);
    return args;
};

let getDialogInstance = (options) => {
    let args = initOptions(options);
    dialogInstance = dialogInstance || Dialog.initInstance({
        ...args
    });
    return dialogInstance;
};

export default {
    open(options = {}) {
        getDialogInstance(options);
    },
    close() {
        if (dialogInstance) {
            dialogInstance.destroy();
            dialogInstance = null;
        }
    },
};