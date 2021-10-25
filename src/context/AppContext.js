import React from "react"

const AppContext = React.createContext({
    isLoading: false,
    openLoadingHandler: () => {},
    closeLoadingHandler: () => {},
    messageDialogIsOpen: false,
    messageDialogType: '',
    messageDialogText: '',
    openMessageDialogHandler: () => {},
    closeMessageDialogHandler: () => {},
    messageSnackbarIsOpen: false,
    messageSnackbarType: '',
    messageSnackbarText: '',
    openMessageSnackbarHandler: () => {},
    closeMessageSnackbarHandler: () => {},
})


export const AppContextProvider = AppContext.Provider
export const AppContextConsumer = AppContext.Consumer
export default AppContext