import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { AppMeta } from "../type";
import registry from "./prepare";
import { FormDesignerState, Action, ContextType } from "./types";

const initialState: FormDesignerState = {
  registry,
  formLayout: [],
  fields: {},
  fieldsMeta: [],
  appMeta: {} as AppMeta,
  anchorFieldId: undefined,
};

const FormDesignerContext = createContext<ContextType | null>(null);

export const FormDesignerProvider: React.FC<{
  children: ReactNode;
  appMeta: AppMeta;
}> = (props) => {
  const [formDesignerState, dispatch] = useReducer(
    (state: FormDesignerState, action: Action) => {
      switch (action.type) {
        case "SET_FORM_LAYOUT":
          return { ...state, formLayout: action.payload };
        case "SET_FIELDS":
          return { ...state, fields: action.payload };
        case "SET_APP_META":
          return { ...state, appMeta: action.payload };
        case "ADD_FIELD":
          return {
            ...state,
            formLayout: [
              ...state.formLayout,
              [{ flex: 1, fieldId: action.payload.id }],
            ],
            anchorFieldId: action.payload.id,
            fields: { ...state.fields, [action.payload.id]: action.payload },
          };
        case "SET_FIELD_META":
          return {
            ...state,
            fieldsMeta: action.payload,
          };
        case "SUBMIT":
          // 模拟提交
          console.log("提交数据： ", state.formLayout, state.fields);
          return { ...state };
        case "COMMON":
          return {
            ...state,
            ...action.payload,
          };
        default:
          return state;
      }
    },
    { ...initialState, appMeta: props.appMeta }
  );

  return (
    <FormDesignerContext.Provider
      value={{ state: formDesignerState, dispatch }}
    >
      {props.children}
    </FormDesignerContext.Provider>
  );
};

export const useFormDesignerStore = () => {
  const context = useContext(FormDesignerContext);
  if (!context) {
    throw new Error(
      "useFormDesignerStore must be used within a FormDesignerProvider"
    );
  }

  return [context.state, context.dispatch] as const;
};
