import React from "react";
import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import * as Style from "./style";
import {Flex, FlexItem} from "../Flex";

const AlertContext = createContext();

const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error(
      "useAlertContext must be used within a AlertContextProvider",
    );
  }
  return context;
}

const Alert = (
  {
    color = 'gray',
    className ,
    children
  }
) => {
  const context = { color };
  return (
    <AlertContext.Provider value={context}>
      <Flex
        className={ Style.Alert(color)  + " flex-col " + className }
        role="alert">
        { children }
      </Flex>
    </AlertContext.Provider>
  )
}

const AlertTitle = ({children}) => {
  return (
    <FlexItem className="flex-grow font-medium">
      { children }
    </FlexItem>
  )
}


const AlertDescription = ({children}) => {
  return (
      <FlexItem className="flex-grow">
        { children }
      </FlexItem>
  )
}

const AlertDismiss = () => {
  return (
    <button className="absolute top-0 bottom-0 right-0 px-4 py-3" aria-label="Close alert">
      <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
    </button>
  )
}

const AlertLink = ({link, title}) => {
  const { color } = useAlertContext();
  return (
    <span className="absolute top-0 bottom-0 right-0 px-4 py-3 font-bold">
      <a href={link} className={`text-${color}-700`}>{title} &#8594;</a>
    </span>
  )
}

Alert.propTypes = {
  color: PropTypes.string
};

export {Alert, AlertTitle, AlertDescription, AlertDismiss, AlertLink};
