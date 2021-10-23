import React from "react"

const HomeContext = React.createContext({
    drawerIsopen: false,
    openDrawerHandler: () => {},
    closeDrawerInfoHandler: () => {},
})

export default HomeContext